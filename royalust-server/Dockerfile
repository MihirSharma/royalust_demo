#  Dockerfile for Node Express Backend

FROM node:18.16.0-alpine3.18

# Create App Directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 8080

CMD ["npm","start"]