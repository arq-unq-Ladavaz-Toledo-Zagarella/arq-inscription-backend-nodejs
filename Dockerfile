FROM node:latest

COPY package.json .
RUN npm install --silent

RUN npm install --global gulp-cli --silent

COPY . .

RUN gulp build

EXPOSE 3001
CMD [ "npm", "start" ]