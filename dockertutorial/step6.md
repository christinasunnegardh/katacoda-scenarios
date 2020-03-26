Dockerizing the backend, follows the same steps as for the frontend with some slight changes in the Dockerfile.

### Creating a Dockerfile

*enter the server folder*
`cd ../server/`{{execute}}

*create the Dockerfile*
`touch Dockerfile`{{execute}}

Navigate to your newly created Dockerfile **(in the `server` folder this time!)** in the editor to the top right and copy the following to the file:

<pre class="file" data-filename="Dockerfile" data-target="replace">
FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . /app
EXPOSE 9000
CMD [ "npm", "start" ]
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

`docker run --detach --publish 12345:9000 --name server node-test-app:1.0`{{execute}}

Run `docker ps`{{execute}} to view all running containers.

While the server container is running, you can access it at https://[[HOST_SUBDOMAIN]]-12345-[[KATACODA_HOST]].environments.katacoda.com/.

After you have had a look at the page, let's stop the containter with `docker stop server`.