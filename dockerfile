#Set node16 with alpine linux as the base image for this docker file
FROM node:16-alpine as dep

#Create directory for app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . ./
#Set env port to 8080
ENV PORT=8080
EXPOSE 8080
CMD ["yarn" "run" "start"]
#RUN yarn build


#FROM nginx:1.20-alpine
#COPY --from=dep /usr/src/app/build /usr/share/nginx/html
#ENV PORT=8080
#Open port 8080
#EXPOSE 8080

#CMD ["nginx", "-g", "daemon off;"]
