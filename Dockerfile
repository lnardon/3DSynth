FROM node:22.8.0-alpine3.19 AS build
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
