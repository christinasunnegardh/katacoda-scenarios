- Clone repo
- Test that it works with npm??

In the `client` directory create a file called .dockerignore, `touch .dockerignore`{{execute}}. This file will include everything we want to exclude when building the image, to make the build lighter and faster.

Include the following in the .dockerignore file: 
`node_modules 
.git
.gitignore`{{copy}}

While still in the `client` folder, create the Dockerfile: `touch Dockerfile`{{execute}}.

First, add a line to the Dockerfile that defines the parent image `FROM node:12-alpine`{{copy}}. Here we use the official Docker image for Node.js, which creates a base for our image (?). There are a number of versions we can choose from, and here we use one of the alpine versions as that results in a small image. 