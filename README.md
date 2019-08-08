# Roth Technologies Monorepo

I got sick of creating apps from scratch every time I had a new idea. This is a fullstack app with all the foundational goodies required to get up and running immediately.

Credits to:

- https://github.com/andregardi/jwt-express-typeorm for the API quickstart
- https://github.com/creativetimofficial/vue-argon-dashboard for the Vue Admin quickstart
- Pulumi for being so simple to use

## Stack

- Lerna Monorepo
- Automated ECS (Fargate) & Postgres RDS

**Core**

- Pulumi scripts to configure and manage multi-env ECS deployments

**API**

- Typescript
- TypeORM
- JWT

**Frontend**

- Vue
- Vuex
- ArgonDashboard (Bootstrap based)

## Getting Started

Requirements

- Node 8+
- Docker

**Local Dev**

```bash
$ yarn # install dependencies, bootstraps .env
$ yarn start-api # runs postgis, migrations, and the api server on localhost:3000
$ yarn migrate-api # run api migrations
$ yarn start-frontend # runs vue on localhost:8080
```

_NOTE: we could switch to docker-compose for local dev for simplicity but because core (Pulumi) uses the local Docker files it's not a major concern._

**Deploy To AWS**

1. Copy `.env.example` to `.env` in `api`, `core`, and `frontend` packages
2. Install Pulumi `brew install pulumi` (if on Mac)
3. Set up AWS account / Create Access Key and set env vars in `core`: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
4. Setup Pulumi account and set Pulumi Access token env var in `core`: `PULUMI_ACCESS_TOKEN`
5. Install dependencies `yarn`
6. Deploy stack to AWS: `yarn deploy`
7. Update the frontend `.env` `VUE_APP_API_ENDPOINT` with the correct `api` url from the deploy output
    * NOTE: this could be improved using a custom Pulumi resource or Route53
8. Update the api `.env` `DB_HOST` with  the correct rds db host from the deploy output
9. Migrate the AWS Postgress in the API package: `yarn migrate-api`
10. Redeploy `yarn deploy`
11. Navigate to the `app` URL (output after Pulumi deployment)
    * Username: `admin`
    * Passsword: `admin`
