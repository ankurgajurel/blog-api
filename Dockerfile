FROM --platform=linux/amd64 node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml /app/
RUN npm install pnpm -g && pnpm install
COPY . /app
CMD ["pnpm", "start"]