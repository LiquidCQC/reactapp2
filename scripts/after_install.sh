#!/bin/bash

#_Change_Working_Directory
cd /home/ec2-user/server

#_Remove_Unused_Code
rm -rf node_modules
rm -rf build

#Install_node_modules_&_Make_React_Build
npm  install
npm run build

# move the app into nginx
mkdir /usr/share/nginx/html/react
cp -r /home/ec2-user/server/build/* /usr/share/nginx/html/react
sudo touch /etc/nginx/conf.d/react.conf
sudo echo "
server {
  listen 80;
  listen [::]:80;
  root /usr/share/nginx/html/react;
  index index.html index.htm;
  server_name www.restoproch-ecf.com;  # Replace with your domain name

  location / {
    try_files $uri $uri/ =404;
  }
}
" > /etc/nginx/conf.d/react.conf
sudo systemctl restart nginx
