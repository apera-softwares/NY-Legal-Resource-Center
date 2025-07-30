FROM node:18-alpine

RUN apk add --no-cache openssl

WORKDIR /usr/src/app

ENV OPENAI_API_KEY ""

ENV JWT_SECRET ""

ENV SMTP_EMAIL ""

ENV SMTP_PASSWORD ""

ENV CALENDLY_URL ""

COPY package*.json ./

RUN npm install -f

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
