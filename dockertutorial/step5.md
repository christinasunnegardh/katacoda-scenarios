
<!-- Test that it works with npm before getting into Docker? -->
# Dockerize the frontend

Let's start by dockerizing the React application in the client folder, which is the frontend of our application. We will thereby need to create a Docker image for it.

## Define parent/base image and working directory 
To create a Docker image, we must start by creating a Dockerfile in the `client` folder. 

*enter the client folder*

`cd my-application/client/`{{execute}}

*create the Dockerfile*

`touch Dockerfile`{{execute}}

New layout:

<pre class="file" data-filename="Dockerfile" data-target="replace">
FROM node:12
</pre>

END

The first thing we want to do is to define the parent/base image which our customized image will then be built upon.

`FROM node:12`{{copy}}

Here we use the official Docker image for Node.js, version 12 as the parent/base image. 

<!-- Alpine: resulting in a smaller image than a normal version would give. -->

On the next line, add `WORKDIR /usr/src/app`{{copy}}. This creates the working directory on the image where the next commands will be executed.

## Install dependencies and copy source code

To install all dependencies for our React frontend, we first need to copy `package.json` from our host to the image's filesystem, and then run npm install. Add the flag `-- silent` if you want to suppress the npm output.

`COPY package.json .
RUN npm install`{{copy}}

After this, we want to copy the rest of the source code as well.

`COPY . .`{{copy}}

## Describe how to start the client

To start the client, we first need to specify which port the continers listen to at run time (?). The default port used by React development server is 3000, so this is the port we'll expose.

`EXPOSE 3000`{{copy}}
<!-- "The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime." "If you EXPOSE a port, the service in the container is not accessible from outside Docker, but from inside other Docker containers. So this is good for inter-container communication." not sure if i understand -->

Next, we need to state which command we should execute inside a running container (?). 

`CMD ["npm", "start"]`{{copy}}
<!-- Maybe explain this more -->
