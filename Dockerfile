FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22 AS runtime
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

EXPOSE 3030
CMD ["node", "build/server.js"]
