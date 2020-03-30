
<!-- Test that it works with npm before getting into Docker? -->
Let's start by dockerizing the React application in the client folder, which is the frontend of our application. We will thereby need to create a Docker image for it.

### Creating a Dockerfile
To create a Docker image, we must start by creating a Dockerfile in the `client` folder. 

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

### Build Docker image
In this step we will build the image based on the Dockerfile we just created, and run the container for the client.

**Exclude files during build**

Before we build the image, we want to exclude some files from the build to make the build lighter and faster. We will specify these folders and files in a file called `.dockerignore` in the client folder.

*create the file (make sure you are still in the **client** folder)*
`touch .dockerignore`{{execute}} 

Open the `.dockerignore` file in the editor and paste the following:

<pre class="file" data-filename=".dockerignore" data-target="replace">
node_modules 
.git
.gitignore
</pre>

The node_modules folder can be ignored, as they will be installed on build. We are also ignoring files that are related to Git.


**Run build command**

Make sure you're still in the `client` folder, and run the following command to build an image in the current directory:

`docker image build --tag react-test-app:1.0 .`{{execute}}

*This might take some time! Especially in step 5.*

The `--tag` option let's you state the name of the image and the tag/version, on the format `name:tag`. When the build has finished you should see:

`Successfully built [Image ID]
Successfully tagged react-test-app:1.0`

To see all available images, run `docker images`{{execute}}.

### Run container

Time to run a container based of our image. 

`docker container run --detach --tty --publish 3000:3000 --name client react-test-app:1.0`{{execute}}

The base command to run a container from an image is `docker container run [image_name:tag]`. We add the `--detach` flag to the docker run command, in order to run the container in the background. We also use the `--publish` flag that makes the container accessable from outside the container. To the left of the `:` is the port on the host machine that will be mapped to the port in the container (to the right of the `:`). The `--tty` flag allocates a psuedo-terminal so that our client can keep the connection open. The `--name` option lets us name our container, here to `client`.

**Congratulations!** You now have a running container. You can view all running containers with `docker ps`{{execute}}.

Go and view the React page served from Docker at https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/.

After you have had a look at the page, let's stop the container with `docker stop client`{{execute}}. 
