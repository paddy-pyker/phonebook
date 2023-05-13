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

RUN git submodule init && git submodule update

WORKDIR pb-frontend

RUN yarn && yarn build

EXPOSE 80

CMD ["/usr/bin/supervisord"]
