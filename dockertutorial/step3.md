# Separating application parts into different containers

The Docker documentation states that each container should only have one concern. By dividing an application into multiple containers, it’s easier to scale horizontally (essentially increasing the number of nodes in the cluster). Another reason for separating the application into different containers is *fault isolation*. Failure in one container does not affect others, and developers can then more easily find the source of the problem.

There are different ways one might want to separate an application into containers. One way is to containerize based on microservices. A microservice is part of a software that has a narrow scope and focuses on performing a smaller task. One of the advantages of microservices is that they can be developed without interfering with other parts of the software. This advantage can thereby be further benefited from by packaging the microservices into separated containers, as testing and deployment will thereby also be independent of the rest of the application. Another alternative can be to separate larger parts of the application, that are doing different things and essentially working as different services, in different containers. An example of this would be separating the frontend and backend of an application, discussed below.

NOTE: Worth remembering is that there are no definite rules about how an application should be containerized. What is best practice for different applications may vary and there are always ongoing discussions about this in the industry.


## Separating frontend/backend

The separation of the React/Node.js application that we will carry out, starting on the next page, is a frontend/backend separation. If an application contains an API backend and a frontend, it can be useful to be able to scale these independently as for example, the API backend may serve multiple UI applications (such as multiple frontends, mobile applications etc).