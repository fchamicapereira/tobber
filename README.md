# Docker

```bash

# build the server
$ docker build -t tobber-server server

# generate env variables
$ ./scripts/generate-env.h

# run the server
$ docker run --rm --name tobber-server -v ${PAHT_TO_THIS_REPO}/server/variables.env:/tobber/variables.env -p 8000:8000 tobber-server

# build the client
$ docker build -t tobber-client client

# run the client
$ docker run --rm --name tobber-client -p 8001:80 tobber-client

```
