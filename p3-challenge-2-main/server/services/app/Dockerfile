FROM node:16.14

WORKDIR /user/local/app

ENV JWTKEY = RAHASIA

COPY package.json package-lock.json /user/local/app/

RUN npm install && npm cache clean --force

RUN npm install -g nodemon

COPY ./ ./

CMD ["npm", "run", "start"]
