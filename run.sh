#!/bin/bash

set -e

cd backend
yarn && yarn build
cd ..

cp backend/.env ./.env
docker-compose build
docker-compose up -d --force-recreate
