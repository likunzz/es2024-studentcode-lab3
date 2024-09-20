FROM node:18

ORKDIR /usr/src/app

COPY package*.json ./

UN npm install

OPY . .

EXPOSE 3000

CMD ["npm", "start"]
