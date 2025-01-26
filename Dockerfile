FROM node:10

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm install 

# To fix "exceeded heap" error in low memory vm.
ENV NODE_OPTIONS="--max-old-space-size=2048"

COPY . ./

RUN npm run build

ENV PORT $PORT
EXPOSE $PORT

CMD ["./docker/start.sh"]

