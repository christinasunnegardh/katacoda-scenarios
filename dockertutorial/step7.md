Docker Compose makes it possible to configure and run containers from different images with a single command. Hence, instead of having to type in multiple commands to run containers manually, developers and testers only need to use one command. This is done by creating a Docker Compose file. 

In our case, we have created one image for the Node.js backend and one for the React frontend, Docker compose will then make it possible to run both of these with just one command.

In the root folder of the application, `my-application`, we will start off by creating the Compose file:

*Go to the root folder* `cd ../`{{execute}}

*Create the compose file* `touch docker-compose.yml`{{execute}}

![Docker5](https://github.com/christinasunnegardh/katacoda-scenarios/blob/master/dockertutorial/assets/5.png?raw=true)

Your folder structure should now look as the above image. 

In the *docker-compose.yml* file, we'll define the services that our application consists of.  

<pre class="file" data-filename="docker-compose.yml" data-target="replace">
  version: '3'
  services:
    frontend:
      build: ./client
      tty: true
      ports:
        - 3000:3000
      depends_on:
        - backend
    backend:
      build: ./server
      ports:
        - 9000:9000
</pre>

The first service we define is our frontend service, located in the `client` folder. 
- *build* specifies the directory where we want to build our service. Needs to have a Dockerfile.
- *ports* binds the container and host machine to the exposed port. The first port is the host port we want to use, and the second should be the same as the one exposed in the client’s Dockerfile.
- *depends_on* defines dependency between services. As the frontend depends on the backend, Docker will start the backend service before the frontend service.
- *tty: true* keeps the connection open, same as the `--tty` option when using the run command.

The second service is the backend service, which is located in the `server` folder. We can see that we need to specify the same attributes as for the frontend, except the “depends_on” attribute. This, as the server does not depend on any other service, and therefore will be started first when running the docker compose command.

## Katacoda: Setting endpoints
Due to that katacoda creates random addresses for the localhost, we need to set the endpoints manually. You will need to do this by following the steps below.

Go to the following file:
`client/package.json`

On line 34, replace   
`"proxy": "http://localhost:9000"`  
with  
`"https://[[HOST_SUBDOMAIN]]-9000-[[KATACODA_HOST]].environments.katacoda.com/"`

<br />
Next, go to the following file: `client/src/App.js`  

On line 22, replace   
`"http://localhost:9000/trivia"`  
with   
`"https://[[HOST_SUBDOMAIN]]-9000-[[KATACODA_HOST]].environments.katacoda.com/trivia"`

<br />
In normal cases, this is not required on your own machine when using localhost.

## Run both containers

Now that we have defined everything we need in the Compose file we can start both parts of our application with just one command: 

`docker-compose up --build`{{execute}}

Since we defined the host port for the frontend at 3000, you can access the application at https://[[HOST_SUBDOMAIN]]-3000-[[KATACODA_HOST]].environments.katacoda.com/. 

We have now used Docker compose to run the frontend and backend simultaneously in separate containers with one command! **Good job!**


*PS: Did you find the easter eggs?! If not, make sure you visited all the links when running the containers...*
