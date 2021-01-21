#!/bin/bash -e
#
# Setup Project

pipenv install
pipenv run nodeenv -p --node=10.17.0
pipenv run npm install -g yarn
pipenv run yarn global add @vue/cli
pipenv run yarn install
