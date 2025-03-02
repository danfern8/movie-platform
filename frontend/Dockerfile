FROM node:20

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL 

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

CMD ["npm", "run", "preview"] 