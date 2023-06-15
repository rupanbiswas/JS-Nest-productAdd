#!/bin/bash

aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 039005549928.dkr.ecr.us-west-2.amazonaws.com
docker build -t rr-usw2-shopify-prod .
docker tag rr-usw2-shopify-prod:latest 039005549928.dkr.ecr.us-west-2.amazonaws.com/rr-usw2-shopify-prod:latest
docker push 039005549928.dkr.ecr.us-west-2.amazonaws.com/rr-usw2-shopify-prod:latest
