FROM node:22.8.0-alpine3.19 AS build
WORKDIR /usr/src/app
COPY . .
RUN npm config set registry https://registry.npmjs.org
RUN npm config set proxy https://191.252.214.118
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
