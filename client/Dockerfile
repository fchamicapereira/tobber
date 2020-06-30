FROM node:9.11 as client-builder

WORKDIR /tobber/client

COPY . .

RUN npm i
RUN npm run build

FROM nginx:1.19.0-alpine

COPY --from=client-builder /tobber/client/dist /usr/share/nginx/html
