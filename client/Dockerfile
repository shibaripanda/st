FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

ARG VITE_SERVER_LINK
ENV VITE_SERVER_LINK=$VITE_SERVER_LINK

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]