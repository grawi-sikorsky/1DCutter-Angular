#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:latest
COPY --from=node /app/dist/OneDCutter-A /usr/share/nginx/html
EXPOSE 80
