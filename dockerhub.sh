#!/usr/bin/env bash

repoName() {
	local DOCKERHUB_REPO_NAME=$TRAVIS_BRANCH
	if [ "$TRAVIS_BRANCH" == "master" ]; then
		local DOCKERHUB_REPO_NAME="stable"
  elif [ "$TRAVIS_BRANCH" == "development" ]; then
  	local DOCKERHUB_REPO_NAME="devel"
  fi;
  echo ${DOCKERHUB_REPO_NAME}
}

pushRepoDockerhub() {
	if [ "$TRAVIS_BRANCH" == "master" -o "$TRAVIS_BRANCH" == "development" ]; then
		docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";
    docker push $DOCKER_USERNAME/arq-inscription-backend-nodejs-$(repoName);
  fi
}