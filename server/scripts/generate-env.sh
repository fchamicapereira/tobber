#!/bin/bash

append () {
	echo $1 >> variables.env
}

> variables.env
append MONGO_DB_TEST=tobber-test
append MONGO_DB=tobber
append MONGO_DB=tobber
append MONGO_PORT=27017
append MONGO_HOST=host.docker.internal
append HOST=0.0.0.0
append PORT=8000
append CRYPT_SALT_ROUNDS=80000
append JWT_SECRET="$(openssl rand 1024 | openssl base64 -A)"