FROM node:16
WORKDIR /app
COPY wait-for-it.sh /wait-for-it.sh
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/app.js"]
