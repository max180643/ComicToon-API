FROM node:15.13.0-alpine

WORKDIR /app
COPY . .

RUN yarn install

EXPOSE 5555

CMD ["yarn", "production"]