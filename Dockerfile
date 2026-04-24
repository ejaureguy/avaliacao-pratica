# Estágio 1 faz build do projeto
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Estágio 2 serve com o nginx
FROM nginx:alpine

COPY --from=build /app/dist/*/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80