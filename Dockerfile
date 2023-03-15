# build environment
#FROM node:14.21.3-alpine as build
FROM node:18.15.0-alpine3.17 as build

ARG REACT_APP_NETWORK_NAME
ENV REACT_APP_NETWORK_NAME ${REACT_APP_NETWORK_NAME:-mainnet}

ARG REACT_APP_DEPLOYMENT_ENVIRONMENT
ENV REACT_APP_DEPLOYMENT_ENVIRONMENT ${REACT_APP_DEPLOYMENT_ENVIRONMENT:-prod}

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN yarn install

COPY nginx.conf .eslintrc.json ./
COPY scripts ./scripts
COPY config ./config
COPY src ./src
COPY public ./public

RUN apk --no-cache upgrade

RUN yarn run build

# production environment
FROM nginx:1.21 as prod
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

# testing
# TODO: Add test
FROM build as test
CMD ["yarn", "test"]
