# Travel Itinerary App

## Video
[![Video Title](https://img.youtube.com/vi/gXgfhjLOjI0/maxresdefault.jpg)](https://www.youtube.com/watch?v=gXgfhjLOjI0)

## Skill
- Front-end: Next.js / React.js
- Css library: Mui
- Back-end: Laravel
- DB: MySQL
- Container Application: Docker

## About
This is the travel itinerary app helps users plan and organize their trips with simple UI and google map interface. It allows users to create detailed day-by-day itineraries, manage bookings(developing), explore destinations that other users shared. With features image update , map integration, and personalized recommendations(developing), the app ensures a smooth and enjoyable travel experience.

## Why Travel Itinerary App
I love traveling and exploring the world, and I often use third-party itinerary apps. However, when I shared a 14-day Europe itinerary with a friend, they found it difficult to read. I realized the app cluttered too much information on one page, making it hard to find key details like destinations and times. This experience inspired me to create an app with a simpler, more intuitive UI/UX, allowing users to navigate their itineraries more smoothly and efficiently.


## Project Enviromnet
### Overview
![environment image](https://user-images.githubusercontent.com/27280734/110324057-d1301a00-8058-11eb-81aa-97d3b0f775c2.png)
### Nginx
A reverse proxy server
If you access into 80 port, the nginx connects to a node server that serves a next.js application.
And, if you access into 3000 port, the nginx connects to a php-fpm server that serves a laravel application.
### node
**React.js Next.js**  
A node.js server
It works to serve a next.js application and manage npm package modules.
If you want to deploy a next.js application or install required npm modules, you should enter this container to do those.
### php-fpm
**Laravel**  
A php fastcgi server
It works to serve a laravel application and composer modules.
If you want to do anything for laravel or install composer modules, you should enter this container to do those.
### mysql
A mysql server
It is connected from php-fpm container to manage application data.
It is mounted on mysql-data volumes not to be destory application data along with this container.
Of course, you can view application data from mysql client throw the port opended for local access.
## How to Install
### Create .env file
Before you create this docker environment, you should .env file.
The .env file defines deploying settings such as local ports, database setting,,etc.
#### Run this command
```bash
$ sh generate_env.sh
```
#### Confirm .env
```bash
$ cat .env
ENV=local
TZ=Asia/Tokyo
NGINX_FRONT_PORT=10088
NGINX_SERVER_PORT=13000
MYSQL_PORT=13306
MYSQL_DATABASE=db
MYSQL_USER=db
MYSQL_PASSWORD=password
MYSQL_ROOT_PASSWORD=root
```
### Install the docker environment
#### Run this command
You just run under this command.
```bash
$ docker-compose build
$ docker-compose up
```
#### Confirm the docker environment
```bash
$ docker-compose ps

NAME                     IMAGE                   COMMAND                  SERVICE      CREATED        STATUS         PORTS
------------------------------------------------------------------------------------------------------------------------------------
mysql_host               mysql:8.0               "docker-entrypoint.s…"   mysql        2 months ago   Up 2 minutes   33060/tcp, 0.0.0.0:13306->3306/tcp
travelapp-nginx-1        nginx:latest            "/docker-entrypoint.…"   nginx        2 months ago   Up 2 minutes   0.0.0.0:10088->80/tcp, 0.0.0.0:13000->3000/tcp
travelapp-node-1         travelapp-node          "docker-entrypoint.s…"   node         2 months ago   Up 2 minutes   0.0.0.0:33000->3000/tcp
travelapp-php-1          travelapp-php           "docker-php-entrypoi…"   php          2 months ago   Up 2 minutes   9000/tcp
travelapp-phpmyadmin-1   phpmyadmin/phpmyadmin   "/docker-entrypoint.…"   phpmyadmin   2 months ago   Up 2 minutes   0.0.0.0:18080->80/tcp
```
### Clean install Laravel and Next.js application
If your src/server or src/front directory is empty except for .gitkeep file, you can install laravel or next.js application.
Notice that you have already set up those application which is managed by another repository, you should not do this opparation because this destroys existing project settings.
