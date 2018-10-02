FROM jekyll/jekyll:3.8.3

WORKDIR /srv/jekyll
COPY Gemfile ./
RUN bundle install

COPY package.json ./
RUN yarn install
