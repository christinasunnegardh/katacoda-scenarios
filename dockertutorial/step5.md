# Build the image and run the container
In this step we will build the image based on the Dockerfile we just created, and run the container for the client.

## Exclude files during build
In the `client` directory, create a file called .dockerignore.

`touch .dockerignore`{{execute}} 
 
This file will specify everything we want to exclude when building the image, to make the build lighter and faster.

Paste the following in the .dockerignore file: 
`node_modules 
.git
.gitignore`{{copy}}

## Build image

Make sure you're still in the `client` folder, and run the following command to build an image in the current directory:

`docker image build --tag react-test-app:1.0 .`{{execute}}

The --tag option let's you state the name of the image and the tag/version, on the format `name:tag`. When the build has finished you should see 

`Successfully built [Image ID]
Successfully tagged react-test-app:1.0`

## Run container

Time to run a container based of our image. 

`docker container run --interactive --publish 3000:3000 react-test-app:1.0`{{execute}}

https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/

Congratulations! You now have a running container.