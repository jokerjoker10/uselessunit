FROM node:13-alpine AS BUILDER
WORKDIR /app
COPY package*.json /app/
RUN npm install -g ionic
RUN npm install
COPY ./ /app/
RUN npm run-script build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=BUILDER /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
