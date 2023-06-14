#install pm2
npm install pm2 -g

# run server
pm2 start ./royalust-server/server.js --name=server

#run interface
cd royalust-interface
pm2 start "npm start" --name=interface
cd ..