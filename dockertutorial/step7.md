# Dockerize the server

We will now repeat step 4 and step 5, but for the server. Navigate to the server directory and create the Dockerfile and the .dockerignore.

`cd ../server
touch Dockerfile
touch .dockerignore`{{execute}}

Our Dockerfile will look very similar to that of the client, except for the port. In app.js we can see that our server listens to port 9000, so we should expose this.

`FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .

RUN npm install

# Copy source code
COPY . .

# Expose the port that our server is listening to
EXPOSE 9000

# Start server
CMD [ "npm", "start" ]`{{copy}}

.dockerignore should ignore the same files as on the client, those related to npm and git but not needed for install.

`node_modules 
.git
.gitignore`{{copy}}

Next, build the image and run a container based on it.

`docker image build --tag node-test-app:1.0 .`{{execute}}

`docker run --publish 12345:9000 test-node-app:1.0`{{execute}}

If we want to, we can add the `--detach` option to the docker run command, in order to run the container in the background. Only the id of the container will be printed in the terminal. In this case, we need to stop the container afterwards with `docker stop [container ID]`. Run `docker ps`{{execute}} to view all running containers.

While the server container is running, you can access it at https://[[HOST_SUBDOMAIN]]-12345-[[KATACODA_HOST]].environments.katacoda.com/.