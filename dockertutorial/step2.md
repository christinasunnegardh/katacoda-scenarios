# Docker's role in DevOps

![Docker2](https://github.com/christinasunnegardh/katacoda-scenarios/blob/master/dockertutorial/assets/2.png?raw=true)

As seen in the above figure, Docker could be seen as part of the “deploy” and “operate” phases in the DevOps practice. This as Docker solves issues that can arise when running software on different environments during development, staging and production. I.e. that code that works on developers' computers could, due to environmental settings, not work on testers’ computers and in production environment. By containerizing the software, as described on the previous slide, this problem is eliminated.

![Docker1](https://github.com/christinasunnegardh/katacoda-scenarios/blob/master/dockertutorial/assets/3.png?raw=true)

As seen in the figure above, the image that is built from the Dockerfile is used both for development, staging and production. The middle step, Docker Hub, can simply be viewed as a github for Docker images. If you wish to run some existing software, such as node.js or MySQL, you can pull their images (and thereby the suitable environment) from Docker Hub to use directly. When building your own environment from a Docker file, you upload the image to Docker Hub to eliminate the need to rebuild it each time you wish to run a container upon it.
