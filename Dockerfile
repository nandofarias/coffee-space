FROM node:alpine
ENV MONGO_URI=mongodb://mongodb:27017/coffee_space
ENV REDIS_URI=redis://redis:6379
EXPOSE 3000
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm install
CMD [ "npm", "start" ]
