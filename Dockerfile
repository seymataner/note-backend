FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json package.json 
RUN npm install -g
COPY . .
EXPOSE 3000
CMD npm start
