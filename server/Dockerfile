FROM node:9.11 as engine-builder

WORKDIR /tobber/engine

COPY engine/ .

RUN npm i --production
RUN npm run build




FROM node:9.11 as server-builder

WORKDIR /tobber/server

COPY scripts/ scripts
COPY src/ src
COPY package.json package.json
COPY package-lock.json package-lock.json

COPY --from=engine-builder /tobber/engine engine

RUN npm i --production



FROM node:9.11

WORKDIR /tobber

COPY --from=server-builder /tobber/server .

CMD ["npm",  "start"]
