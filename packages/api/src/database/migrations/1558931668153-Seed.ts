import {MigrationInterface, QueryRunner} from 'typeorm';
import {User} from '../../entity/User';
import {Resource} from '../../entity/Resource';
import * as faker from 'faker';

export class Seed1558931668153 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const manager = queryRunner.manager;
        // Create admin user
        const user = new User();
        user.email = faker.internet.email();
        user.username = 'admin';
        user.role = 'admin';
        user.password = 'admin';
        user.hashPassword();
        const u = await manager.save(User, user);
        
        // Create resources
        for(let i = 0; i<100; i++) {
            let resource = new Resource();
            const latdelta = (Math.random() * i) * (0.00001);
            const lngdelta = (Math.random() * i) * (0.00001);
            resource.position = {
                type: "Point",
                coordinates: [
                    (40.585258 + latdelta), 
                    (-105.084419 - lngdelta)
                ]
            };
            resource.name = `Test Resource ${i+1}`;
            if  (i < 10) {
                resource.user = u;
            }
            manager.save(Resource, resource);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {}

}
