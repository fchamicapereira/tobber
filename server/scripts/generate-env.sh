#!/bin/sh

append () {
	echo $1 >> variables.env
}

> variables.env
append MONGO_DB_TEST=tobber-test
append MONGO_DB=tobber
append MONGO_PORT=27017
append MONGO_HOST=$(ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+')
append HOST=0.0.0.0
append PORT=8000
append CRYPT_SALT_ROUNDS=10
append JWT_SECRET=$(openssl rand 256 | openssl base64 -A)