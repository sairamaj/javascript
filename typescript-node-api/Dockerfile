FROM node:9-alpine

COPY ./ /api/   
RUN cd /api 
RUN npm install
EXPOSE 80
CMD ["npm", "start"]
