FROM node

RUN apt-get update && \
    apt-get install -y nginx supervisor && \
    rm -rf /var/lib/apt/lists/*

COPY nginx.conf /etc/nginx/nginx.conf

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR	/phonebook

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn test

RUN git submodule init && git submodule update --remote

WORKDIR pb-frontend

ARG BUILD_CONFIGURATION=production

ENV NG_BUILD_CONFIGURATION=$BUILD_CONFIGURATION

RUN yarn && yarn build

EXPOSE 80

EXPOSE 3000

CMD ["/usr/bin/supervisord"]
