FROM ruby:2.7.2-alpine
RUN apk add \
  build-base \
  postgresql-dev \
  tzdata \
  nodejs
ENV RAILS_ENV production
WORKDIR /app
COPY Gemfile* .
RUN bundle install
COPY . .
EXPOSE 3000

CMD ["rails", "server"]
