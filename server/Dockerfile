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


## PRODUCTION

FROM base AS production
ENV NODE_ENV=production

RUN apt-get update && \
  apt-get install tini && \
  rm -rf /var/lib/apt/lists*

COPY . .

# ENTRYPOINT ["docker-entrypoint.sh"] 

# CMD ["/usr/bin/tini", "/usr/local/bin/node", "/app/src/index.js"]

CMD prisma generate && \
  prisma db push && \
  /usr/bin/tini /usr/local/bin/node /app/src/index.js

