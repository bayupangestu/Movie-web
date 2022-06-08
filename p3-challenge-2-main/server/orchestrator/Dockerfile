FROM node:16.14

WORKDIR /user/local/orchestrator

ENV REDIS_PASSWORD = cyr4Gm3SSREDhKMCiqxdzYtpRruG8Sb9

COPY package.json package-lock.json /user/local/orchestrator/

RUN npm install && npm cache clean --force

COPY ./ ./

CMD ["npm", "run", "start"]
