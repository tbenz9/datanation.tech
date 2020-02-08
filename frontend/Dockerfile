# build web app
FROM node:12 AS buildnode

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production
FROM n8maninger/vue-router

COPY --from=buildnode /app/dist /usr/share/nginx/html