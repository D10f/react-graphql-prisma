FROM node:16-bullseye-slim AS development
WORKDIR /usr/share/app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install
EXPOSE 3000
COPY . .
CMD ["npm", "start"]

# Intermediate container for production build
FROM development AS build
ENV NODE_ENV=production
RUN npm run build

FROM nginx:1.21 AS production
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/share/app/build .
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
