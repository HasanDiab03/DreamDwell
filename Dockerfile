FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install


COPY . .

ENV PORT 5000

RUN chmod +x ./build.sh
RUN ./build.sh

CMD ["npm", "start"]