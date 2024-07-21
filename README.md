## Prerequisites
- Node.js 
- npm 

## How to run the app

First ofcourse, you have to clone the app:
```bash
git clone https://github.com/HasanDiab03/DreamDwell.git
```
Next step is to cd into the the app after cloning it:
```bash
cd DreamDwell
```
after that before going any further, please create an ENV file to store the following:
- CONNECTION_STRING = "your mongodb connection string"
- JWT_SECRET = "your jwt secret string"
- NODE_ENV = "development"

## Scripts and Docker
next step is to run the build.sh file that is used to build the frontend app:
```bash
./build.sh
```
after that, you can easily run the app by using:
```bash
npm start
```
or if you have docker, you can skip the last 2 steps and do these instead (make sure you are in the directory that has the dockerfile):
- Build an image using the dockerfile:
```bash
docker build -t <imageName> .
```
- Run a container from the image you built:
```bash
docker container run -it --name <containerName> -p 5000:5000 <imageName>
``` 
