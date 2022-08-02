FROM node:16-bullseye-slim AS base

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH

ENV NODE_ENV=development

COPY package*.json ./

EXPOSE 5000

RUN npm ci && npm cache clean --force


## DEVELOPMENT

FROM base AS development
RUN npm install --development
CMD prisma generate && \
  prisma db push && \
  nodemon src/index.js
