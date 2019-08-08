import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as awsx from '@pulumi/awsx';
import {resolve, join} from 'path';
import {readdirSync} from 'fs';
import * as mime from 'mime';
    
// ------------ RDS ------------
let vpc = awsx.ec2.Vpc.getDefault();
let cluster = new awsx.ecs.Cluster('monorepo', { vpc });
let securityGroupIds = cluster.securityGroups.map(g => g.id);

let dbSubnets = new aws.rds.SubnetGroup('monorepo-subnet', {
    subnetIds: vpc.publicSubnetIds,
});

let db = new aws.rds.Instance('postgresdb', {
    engine: 'postgres',

    instanceClass: 'db.t2.micro',
    allocatedStorage: 20,

    dbSubnetGroupName: dbSubnets.id,
    vpcSecurityGroupIds: securityGroupIds,

    // TODO from .env
    name: 'monorepopostgis',
    username: 'monorepopostgis',
    password: 'monorepopostgis',

    // TODO dev only to run migrations
    publiclyAccessible: true,

    skipFinalSnapshot: true
});

const dbhost = db.endpoint.apply(e => e.split(":")[0]);

// ------------- ECS ----------------
// TODO SSL
const listener = new awsx.elasticloadbalancingv2.ApplicationLoadBalancer('net-lb', 
                        { external: true, securityGroups: cluster.securityGroups })
                            .createTargetGroup('target', { port: 3000, protocol: 'HTTP' })
                            .createListener('web', { port: 80, external: true });

const fargateService = new awsx.ecs.FargateService('monorepo-api', {
    cluster,
    desiredCount: 2,
    taskDefinitionArgs: {
        containers: {
            api: {
                image: awsx.ecs.Image.fromPath('monorepo-api-image', resolve(`${__dirname}/../api`)),
                memory: 128,
                portMappings: [listener],
                environment: [
                    // TODO from .env
                    { name: 'DB', value: 'monorepopostgis' },
                    { name: 'DB_USER', value: 'monorepopostgis' },
                    { name: 'DB_PASS', value: 'monorepopostgis' },
                    { name: 'DB_HOST', value: dbhost }
                ]
            }
        }
    }
});

// ------- S3 Frontend Hosting --------
// TODO update the frontend API_ENDPOINT and rebuild first

// Create an S3 bucket
const siteBucket = new aws.s3.Bucket(`monorepo-frontend`, {
    website: {
        indexDocument: 'index.html',
    },
});
const siteDir = resolve(`${__dirname}/../frontend/build`);

// For each file in the directory, create an S3 object stored in `siteBucket`
// TODO more than one dir depth (recursive)
for (const item of readdirSync(siteDir)) {
  const filePath = join(siteDir, item);
  const mimeType = mime.getType(filePath);
  
  if (mimeType) {
    // create file
    const object = new aws.s3.BucketObject(item, { 
        bucket: siteBucket,
        source: new pulumi.asset.FileAsset(filePath), // use FileAsset to point to a file
        contentType: mimeType || undefined, // set the MIME type of the file
    });
  } else {
    for (const i of readdirSync(filePath)) {
        const file = join(filePath, i);
        const mimeType = mime.getType(file);
        const object = new aws.s3.BucketObject(`${item}/${i}`, { 
            bucket: siteBucket,
            source: new pulumi.asset.FileAsset(file), // directory archive
            contentType: mimeType || undefined, // set the MIME type of the file 
        });
    }
  }
  
}

// Create an S3 Bucket Policy to allow public read of all objects in bucket
// Set the access policy for the bucket so all objects are readable
const bucketPolicy = new aws.s3.BucketPolicy(`monorepo-bucket-policy`, {
    bucket: siteBucket.bucket, // refer to the bucket created earlier
    policy: siteBucket.bucket.apply(bucketName => JSON.stringify({
        Version: '2012-10-17',
        Statement: [{
            Effect: 'Allow',
            Principal: '*',
            Action: [
                's3:GetObject'
            ],
            Resource: [
                `arn:aws:s3:::${bucketName}/*` // policy refers to bucket name explicitly
            ]
        }]
    }))
});

// DB / ELB hostname
export const results = {
    dbhost,
    api: listener.endpoint.hostname,
    app: siteBucket.websiteEndpoint
};
