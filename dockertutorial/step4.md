# Hands-on: Separate a React/Node.js application into frontend/backend containers


As we now have some background on Docker and why separating an application into containers for frontend/backend is useful, you will now get the chance to test this out on a small React/Node.js application. The application is written by the same authors as this tutorial (Christina Sunnegårdh and Klara Eserstam). This information can be found in in the README: `cat my-application/README.md`{{execute}}.

In your editor to the top right, you can see the application source code. It should have the same structure as on the picture below:

![Docker4](https://github.com/christinasunnegardh/katacoda-scenarios/blob/master/dockertutorial/assets/4.png?raw=true)

The **client** folder contains the frontend, and the **server** folder contains the backend of the application. When running, the server is continuously listening for a connection on port 9000. The frontend simply makes an API call to localhost:9000 and displays the response on the start page. *What the frontend recieves from the server is a surprise that will be uncovered as you follow this tutorial.*

We will now:
- Containerize frontend
- Containerize backend
- Use Docker Compose to start them simultaneously with one single command
