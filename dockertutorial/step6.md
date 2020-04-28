Now that our Dockerfile is done, we can continue by building our Docker image and then run a container based on it. 

### Build Docker image

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

*This might take some time! Especially step 4, when all dependencies are installed.*

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
