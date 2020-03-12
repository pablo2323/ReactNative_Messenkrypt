FROM node:12-stretch
WORKDIR /usr/src/app

# Requirements of bcrypt
#RUN apk update
#RUN apk --no-cache add --virtual builds-deps build-base python git

#Install PM2 Global
#RUN npm install -g pm2

RUN npm set config registry http://172.42.42.42:4873

RUN npm install -g expo-cli

# Copy package.json
COPY ./package.* .

RUN expo install

# Install dep
RUN npm install -i

RUN expo login -u loiu92.com -p vZTQU9uqqVWCvzxbad2T3828T8UWrWgYRej3pQXtweQ27CyS3ce7Zn3TqTit6pzvETeivzF6WdsRkkCXWptEJknjCM2qNN63gyZ7DjUhGbHmQsychoMwfYyo2ceAXCWU

CMD ["npm", "run", "web"]
#CMD ["expo", "build:android"]

