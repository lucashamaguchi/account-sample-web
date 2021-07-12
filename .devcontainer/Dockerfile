FROM node:14

WORKDIR /tmp

RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y git build-essential wget

WORKDIR /app

COPY ./ /app
RUN yarn

EXPOSE 3100

CMD ["sh", "/app/entrypoint-dev.sh"]
