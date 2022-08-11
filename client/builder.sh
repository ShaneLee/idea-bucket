#!/usr/bin/env bash

set -e

TAG=$1

docker buildx build --target deps .
docker buildx build --target builder .
docker buildx build --load --target runner -t $TAG . 
