FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install 

COPY . .

CMD ["npx", "ts-node-dev", "--inspect=0.0.0.0:9229", "--transpile-only", "--respawn", "--", "src/server.ts"]
