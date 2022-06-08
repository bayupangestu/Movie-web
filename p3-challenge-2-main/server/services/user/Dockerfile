FROM node:16.14

WORKDIR /user/local/user

COPY package.json package-lock.json /user/local/user/

RUN npm install && npm cache clean --force

COPY ./ ./

CMD ["npm", "run", "start"]
