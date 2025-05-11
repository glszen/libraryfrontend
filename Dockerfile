FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
ENV VITE_BACKEND_URL=https://retired-vanda-glszen-ba299dbf.koyeb.app/api/v1
CMD ["npm", "run", "dev"]