#!/bin/bash -e
#
# Setup Project

pipenv install
pipenv run nodeenv -p --node=10.17.0
pipenv run npm install -g yarn@1.22.10
pipenv run yarn global add @vue/cli
pipenv run yarn install
