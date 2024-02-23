FROM node

WORKDIR /app

COPY package.json /app

RUN npm install -y

COPY . /app

EXPOSE 8081

CMD ["npm", "start"]