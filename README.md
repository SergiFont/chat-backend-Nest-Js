<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Chat

# Pre setup:
1. Use postman (opcional) to test the RESTFUL API endpoints: https://www.postman.com/
2. Docker desktop: https://www.docker.com/products/docker-desktop/
 
- If you don't have the docker image for postgres, you need to download it in order to build the database:
- Execute command: 
```
docker pull postgres:14.3
```


1. Clone project or download the zip.
2. Execute the command npm install on the project root directory.
```
npm install
``` 

3. Copy file ```.env.template``` and rename the copy to ```.env```.
- Change the environment variables inside ```.env``` adapting values to adjust your own.
5. Run the database executing on the root project:
```
docker-compose up -d
```
6. Run the server: 
- Develop mode: 
```
npm start:dev
```
- Production: 
```
npm start:prod
```

7. Execute seed (opctional) this will allow you to fill the DB with preset data.
```
http://localhost:3000/api/seed
```


Documentation url: http://localhost:3000/api

Postman:
- In order to trye the endpoints in postman, you will need to use the collection facilitated in this repository. Also, many of the endpoints require a Bearer token to be facilitated.

External libraries:
- bcrypt:             
https://www.npmjs.com/package/bcrypt
- passport:           
https://www.npmjs.com/package/passport
- class-transformer:  
https://www.npmjs.com/package/class-transformer (not really needed on the project, just for educational purposes)
- class-validator:    
https://www.npmjs.com/package/class-validator
- socket-io:          
https://www.npmjs.com/package/socket.io
- typeorm:            
https://www.npmjs.com/package/typeorm
- uuid:               
https://www.npmjs.com/package/uuid