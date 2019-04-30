#!/bin/bash

set -e

cd backend
yarn && yarn build
cd ..

cp ../.env ./.env
docker-compose build
docker-compose up -d --force-recreate
