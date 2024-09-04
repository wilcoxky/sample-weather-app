FROM ruby:3.2.3

RUN apt-get update && apt-get install -y \
    curl \
    software-properties-common \
    npm
RUN npm install npm@latest -g && \
    npm install n -g && \
    n lts

WORKDIR /app

COPY Gemfile ./Gemfile
COPY Gemfile.lock ./Gemfile.lock
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN bundle install
RUN npm install

COPY . .

CMD ["bin/rails", "console"]
