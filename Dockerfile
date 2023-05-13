FROM node

WORKDIR	/server

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN git submodule init && git submodule update

WORKDIR pb-frontend

RUN yarn && yarn build

WORKDIR /server

ENTRYPOINT ["yarn", "start"]
