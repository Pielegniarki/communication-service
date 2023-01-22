FROM node:19

WORKDIR /app
COPY . .

RUN npm i

EXPOSE 5000

CMD ["npm", "start"]