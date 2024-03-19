## This dockerfile builds the client entirely in a Docker context

FROM node:20-slim AS build

COPY package.json package-lock.json .npmrc index.html vite.config.ts tsconfig.json /app/
COPY locales /app/locales
COPY public /app/public
COPY scripts /app/scripts
COPY src /app/src
COPY types /app/types
COPY api /app/api
WORKDIR /app

# Install dependencies
RUN npm ci --no-audit --ignore-scripts

# Build client
RUN npm run build

# Deploy built distribution to nginx
FROM nginx:stable-alpine-slim

COPY --from=build /app/dist/ /usr/share/nginx/html/
COPY packaging/docker/contents/nginx.conf /etc/nginx/conf.d/default.conf
COPY packaging/docker/contents/*.sh /
COPY LICENSE /usr/share/licenses/ocial.LICENSE
RUN chmod +x /*.sh && /postunpack.sh && rm /postunpack.sh
USER nginx

EXPOSE 80

# Set labels
LABEL maintainer="Fernando Fernández - ferferga@ocial.es"
LABEL org.opencontainers.image.source="https://github.com/ispp-2324-ocial/frontend"
