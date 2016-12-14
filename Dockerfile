FROM node:argon

MAINTAINER TR McAlexander - tr@mcalexander.me

RUN mkdir /app
WORKDIR /app
ADD . /app
RUN npm install
CMD ["node", "app"]
