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
COPY --from=build /app/conf ./build/conf
COPY --from=build /app/data ./build/data

EXPOSE 3030
WORKDIR /app/build

CMD ["node", "server.js"]
