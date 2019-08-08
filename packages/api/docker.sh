#!/bin/bash
# Postgis
docker run --name postgis \
    -e POSTGRES_USER=monorepopostgis \
    -e POSTGRES_PASSWORD=monorepopostgis \
    -p 5432:5432 \
    -d mdillon/postgis &

# API Container
# docker build -t monorepo-api . --no-cache
# docker run -p 3000:3000 monorepo-api