#!/bin/bash

set -e

yarn && yarn build
docker-compose build
docker-compose up -d --force-recreate
