#Set node16 with alpine linux as the base image for this docker file
FROM node:16-alpine

#Create directory for app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build

#Set env port to 8080
ENV PORT=8080

#Open port 8080
EXPOSE 8080

CMD ["yarn", "start"]