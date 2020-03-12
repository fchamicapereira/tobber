# tobber-rest
REST API for tobber

## Development

### Database

`$ docker run -d --add-host=host.docker.internal:$(ip route | grep docker0 | awk '{print $9}') --rm -p 27017-27019:27017-27019 --name mongodbv3.5 mongo:3.5`

### Server

`$ docker `

```bash
$ docker run --rm -i --add-host=host.docker.internal:$(ip route | grep docker0 | awk '{print $9}') -v ${LOCAL_PATH_TO_THIS_REPO}/server:/home/server -v ${LOCAL_PATH_TO_THIS_REPO}/engine:/home/engine -p 8000:8000 --name tobber-server -t node:9.11.1 bash

# inside the container
/> cd home/server
/home/server> npm install

# after the installation, generate the variables.env compatible with docker setup
/home/server> chmod +x ./scripts/generate-env.sh; ./scripts/generate-env

# start the server
/home/server> npm start
```

### Client

$ `docker run --rm -i --add-host=host.docker.internal:$(ip route | grep docker0 | awk '{print $9}') -v ${LOCAL_PATH_TO_THIS_REPO}/client:/home/client -p 4200:4200 --name tobber-client-build -t node:9.11.1 bash`

## Env variables

1) Rename `variables.env.example` to `variables.env`
2) Generate a secure key and replace it in the `JWT_SECRET` field:

    ``` bash
    $ openssl rand 1024 | openssl base64
    1v4ZFK/DgbrHYhTxSQ78DElGf8dCDjU4PF8GZrqk7DQ4XmTLjKhMKmblwWDVwjGE
    iE/i2XCxR4uB7UF5Jzrtq9x8rXJI5opRv9R6zXD+KL/kMcmual9yyejt3eIdXZsU
    MnfPVT3hm6yg3e1ha8W+UtQogdnjwYpk2JaN1JWAabPcfnkVU6dIxI/rtGrbaVtW
    QHmreIvr+irOVsSyZcz+JlOeIGLIUVamoUhlmAB3g7s7egnZiorVK1K0NOxkNx5j
    6vlYZedPtzPiaQi5V30fvNDPNNDsiPAjRlpi+g7ALgAz2KyNcZbwAkuGBdrvIvUy
    0auu4BQxEq5pICiZey33a8ba3nlUR0aVJiKZjta+LHbWbyfJYoMbkA8lduLIFIvQ
    QkMGwiYtB/0e8ggbDDYSodivVGYtnxVk78sVrUX7bGL5bbCwgda6V3b2ubZLHwEJ
    FjdSJbmUFgV/Sgrcwh1Z2JutSQe5vI9LS7wd4epP4rzBaMoEuAltL2IaEy+7FLIN
    f6HYhQYhe1frNm0SapQTwIgpIlbwFxrvQOUEIKqTK2ruvcqEoh5HXzILrNSaybCM
    Dm1RrK34t7rA0sKGKoKG8JtEGJPWK3q159BwjScOsEgk9J/I5+M6yVGvUunge7Q4
    IYfaB3lHmYEhnVx9pHmf5vKAwPiqrwJErAR6JjdcRkH8X/oXcqoNYMGXAZOsQaQK
    ELBSORyq/xrVvJd9zH9CxONGFEt12YEOvNLhVGjPJqwimpxeAWFSVrgGWAWNc/jr
    +0lK559ofAWo0sxqWsIPq9hKMiJWxfsb8DYk1tF7lzAPZA/fZ8VbT5VKUxk+z5pL
    7SN6XlAIh5RPGfzxc5chWRfL7tRcNaf5bIpDquPWXEAB7wtnXDsTyBuABA4QR6IO
    tWuEmYXasM0X7s7Uw5urcajAqgjV7qKWn2DkRk7S9Qhi2Ww08VQiCgHKsUfdXtSN
    p/0i6w+zCX+sI5QHlYWBDxMY8A5gvp9Hxae37mDyWHfLtVlkT+AaMrK2P1EvuAhl
    UpT7CpKdxmzXTZFJqudA9UN6MKnnlIcPd/IMpBVHtbJlOQLg2KMi9EWIdNUZlDT/
    ww/qDhCyEV3h00Tb1a/mMsZEF92Ohc9ExFNPzFQgBn0O4XS/vYOp8e7Bsx5DyL1J
    N2oZXsan8j9mRrsdulNbIj9Kyl6h+W+aE5ieyzln1L0VuFyYROaCDWU0a1surls+
    dosypxM9ytqFHXmsHo8X+iaGzHaFNaa37kI+3uJs53PbR/QCxeFKb9NqAaVBptlw
    0IDok0yWpDA8WfBKJhKcAmK8YZqi23obxjrcTY0TLp/jspjygTrp+WRyJNAY1mir
    MnYUs41Y3pqj6qD3/wU0cg==
    ```

3) Fill the others fields