# Usar la imagen base de Node.js
FROM node:16.20.2 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Usar una imagen base de Nginx para servir el contenido
FROM nginx:alpine
COPY --from=build /app/dist/cloudSystemFront /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
