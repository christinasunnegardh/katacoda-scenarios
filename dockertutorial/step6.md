Dockerizing the backend, follows the same steps as for the frontend with some slight changes in the Dockerfile.

### Creating a Dockerfile

*enter the server folder*
`cd my-application/server/`{{execute}}

*create the Dockerfile*
`touch Dockerfile`{{execute}}

Navigate to your newly created Dockerfile **(in the `server` folder this time!)** in the editor to the top left and copy the following to the file:

<pre class="file" data-filename="Dockerfile" data-target="replace">
FROM node:12
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 9000
CMD [ "npm", "start" ]`{{copy}}
</pre>

Our Dockerfile will look very similar to that of the client, except for the port. In `app.js` we can see that our server listens to port 9000, so we should expose this.

### Build Docker image

**Exclude files during build**

.dockerignore should ignore the same files as on the client.

*create the file (make sure you are still in the **server** folder)*
`touch .dockerignore`{{execute}} 

Open the `.dockerignore` file in the editor and paste the following:

<pre class="file" data-filename=".dockerignore" data-target="replace">
node_modules 
.git
.gitignore
</pre>

**Run build command**

Next, build the image.

`docker image build --tag node-test-app:1.0 .`{{execute}}

### Run container

Run a container based on the image.

`docker run --publish 12345:9000 test-node-app:1.0`{{execute}}

If we want to, we can add the `--detach` option to the docker run command, in order to run the container in the background. Only the id of the container will be printed in the terminal. In this case, we need to stop the container afterwards with `docker stop [container ID]`. Run `docker ps`{{execute}} to view all running containers.

While the server container is running, you can access it at https://[[HOST_SUBDOMAIN]]-12345-[[KATACODA_HOST]].environments.katacoda.com/.