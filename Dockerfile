FROM node:14.15.4 as builder
WORKDIR /api
COPY nestjs/*.json ./
COPY nestjs/.env ./
RUN npm install
COPY nestjs .
RUN npm run build

FROM node:14.15.4
COPY --from=builder /api/node_modules ./node_modules
COPY --from=builder /api/*.json ./
COPY --from=builder /api/.env ./
COPY --from=builder /api/dist ./dist

EXPOSE 9001
CMD ["npm", "run", "start:prod"]