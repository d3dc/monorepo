FROM node:8-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN yarn

# Bundle app source
COPY . /app
RUN yarn build

EXPOSE 3000
CMD ["node", "build/index.js"]