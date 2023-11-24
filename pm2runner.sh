#!/bin/bash
if ! type pm2 > /dev/null
then
    sudo npm install -g pm2 && pm2 start ./dist/src/main.js --name apimodelo
else
    pm2 restart apimodelo
fi