## Versions

MySQL 8.0.28  
Node.js 16.13.0  
NestJS 8.0.0  
TypeORM 0.2  
React 17.0.2  
yarn 1.22.18
vite 2.9.1
VSCode 1.66.1 (user setup)

## Setup

1- Make sure that MySQL server 8.0.28 is running. Make sure that yarn package manager is enabled.
2- Create a MySQL database named "ensolvers_exercise". SQL query should be like this: "create database ensolvers_exercise"
2- Go to /ensolvers_backend and open ormconfig.json
3- Change the username, password & port fields accordingly.
4- Open script.bat. This will install the required dependencies with yarn package manager and run two processes concurrently: local server in port 3001 & frontend dev server in http://localhost:3000/
