FROM node:16 as build

RUN yarn global add serve

WORKDIR /work

COPY package.json yarn.lock /work/

RUN yarn install

COPY . /work
RUN yarn build

ENTRYPOINT [ "serve", "-s", "build", "-p", "5000" ]