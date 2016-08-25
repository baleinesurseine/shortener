FROM node:6
MAINTAINER Edouard Fischer <edouard.fischer@gmail.com>

RUN groupadd -r shortener && useradd -r -g shortener shortener

# Create app directory
RUN mkdir -p /usr/src/app && chown -R shortener:shortener /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --production

# Bundle app source
COPY . /usr/src/app

USER shortener

EXPOSE 8000
CMD [ "node", "server.js" ]
