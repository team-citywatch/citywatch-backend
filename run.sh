#!/bin/bash

set -e

yarn && yarn build
docker-compose up -d
