
- Test that it works with npm??
# Dockerizing the client
In the `client` directory create a file called .dockerignore, `touch .dockerignore`{{execute}}. This file will include everything we want to exclude when building the image, to make the build lighter and faster.

Include the following in the .dockerignore file: 
`node_modules 
.git
.gitignore`{{copy}}

While still in the `client` folder, create the Dockerfile: `touch Dockerfile`{{execute}}.

First, add a line to the Dockerfile that defines the parent image `FROM node:12-alpine`{{copy}}. Here we use the official Docker image for Node.js, which creates a base for our image (?). There are a number of versions we can choose from, but we use one of the alpine versions, resulting in a smaller image than a normal version would give.

On the next line, add `WORKDIR /usr/src/app`{{copy}}. This creates the working directory for the following commands.

### Install dependencies and copy source code

To install all dependencies for our React frontend, we first need to copy `package.json` from our host to the image's filesystem, and then run npm install. 

`COPY package.json
RUN npm install`{{copy}}

After this, we want to copy the rest of the source code as well.

`COPY . .`{{copy}}

### Start the client

To start the client, we first need to specify which port the continers listen to at run time (?). The default port used by React development server is 3000, so this is the port we'll expose.

`EXPOSE 3000`{{copy}}
<!-- "The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime." "If you EXPOSE a port, the service in the container is not accessible from outside Docker, but from inside other Docker containers. So this is good for inter-container communication." not sure if i understand -->

Next, we need to state which command we should execute inside a running container (?). 

`CMD ["npm", "start"]`{{copy}}
<!-- Maybe explain this more -->


