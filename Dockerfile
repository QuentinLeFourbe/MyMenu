FROM node:14-alpine
WORKDIR /app
COPY . .
RUN cd /app/server && npm ci
RUN cd /app/client && npm ci && npm run build
CMD cd /app/server && npm run start