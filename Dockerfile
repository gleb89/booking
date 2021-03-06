FROM node:14.8.0-alpine

# Create app directory

WORKDIR /app

# Install app dependencies
RUN apk update && apk upgrade && apk add git

COPY . /app
RUN npm install

# Build app
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "npm", "start" ]

# root
# s51t4s75pn