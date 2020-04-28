
<!-- Test that it works with npm before getting into Docker? -->
Let's start by dockerizing the React application in the client folder, which is the frontend of our application. We will start by creating a Dockerfile which we can later base our Docker image on.

### Creating a Dockerfile
We will create the Dockerfile for the frontend in the `client` folder. 

*You can run the commands below in the terminal below by clicking on them.*

*enter the client folder*
`cd my-application/client/`{{execute}}

*create the Dockerfile*
`touch Dockerfile`{{execute}}

Navigate to your newly created Dockerfile (in the `client` folder) in the editor to the top right and copy the following to the file:

<pre class="file" data-filename="Dockerfile" data-target="replace">
FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
</pre>

These instructions (one per line) all create a new read-only *layer* in the Docker image. So, what does all of these instructions do? Let's go through them!


- `FROM node:12`
The first thing we want to do is to define the parent/base image which our customized image will then be built upon.
Here we use the official Docker image for Node.js, version 12 as the parent/base image. 

- `WORKDIR /usr/src/app` 
This creates the working directory on the image where the rest of the commands (COPY, RUN, etc..) will be executed.

- `COPY package*.json ./`
- `COPY package.json .`
To be able to install all dependencies for our React frontend, we need to copy `package.json` and `package-lock.json` from our host's file system to the image's filesystem.

- `RUN npm install`
We then run npm install on the image. We add the flag `-- silent` to suppress the npm output. 

    NOTE: As you notice below, we copy the `package.json` file as well as run the installation before copying the rest of the source code. We do this as it creates separate layers for the installation of the dependencies, which means that it will be cached. If you wish to rebuild the image and `package.json` has not been modified, the build can skip this step.

- `COPY . .`
We want to copy the rest of the source code as well.

- `EXPOSE 3000`
We need to specify on what port we can access the container. The default port used by React development server is 3000, so this is the port we'll expose for simplicity.

- `CMD ["npm", "start"]`
Finally, we state what command we should execute when a container is run.

<!-- "The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime." "If you EXPOSE a port, the service in the container is not accessible from outside Docker, but from inside other Docker containers. So this is good for inter-container communication." not sure if i understand -->
<!-- Maybe explain this more -->

