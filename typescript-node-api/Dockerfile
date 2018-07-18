FROM node:9-alpine
COPY ./ /api/   
RUN cd /api && npm install
EXPOSE 80
ENV NODE_ENV=dev
ENV PROVIDER=inmemory
ENV PORT=80
CMD ["node", "/api/dist/index.js"]
