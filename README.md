# Blog App Backend

Blog is a dynamic platform that empowers creators to share their thoughts, insights, and expertise with the world. With a user-friendly interface, it offers seamless content creation, personalized themes, and easy sharing options, making it the perfect space for connecting and engaging with readers

# Deployed URLs

Frontend: http://ae01803c38aa2480087f7f2f58a19b83-1169042174.us-east-1.elb.amazonaws.com:3000/

Backend: http://aa7af8dae4aef45a6b0552548e89c44a-1061624016.us-east-1.elb.amazonaws.com:4500/

# Docker Hub

Frontend: https://hub.docker.com/repository/docker/kuldeep55567/blog-app-frontend/

Backend: https://hub.docker.com/repository/docker/kuldeep55567/blog-app-backend/

## Features

1. **User Authentication:** Only logged-in users and specific role have the ability to create and publish their own blogs.

2. **JWT Authentication:** User authentication is handled using JSON Web Tokens (JWT) for secure and stateless communication.

3. **Commenting System:** Users can engage in discussions by commenting on blog posts.

4. **Search Functionality:** Users can easily search for their favorite topics or specific blog posts.

5. **Editing your Blogs:** Users can now update their older blogs with new content and add-ons.

6. **Deleting your Blogs:** Users can remove unwanted blogs from the app.

7. **Admin Panel:** Admin only accessible route for managing data.

## Tech Stack

- Node.js: A runtime environment for executing server-side JavaScript code.
- Express: A minimal and flexible Node.js web application framework.
- MySQL: A relational database management system for storing blog data.
- React: A popular JavaScript library for building user interfaces.
- Docker: Platform to develop, deploy, and run applications using containerization technology.
- AWS RDS: Relational Database Service offers managed database solutions.
- AWS EKS: AWS-managed container orchestration for scalable applications.
- Load Balancer: Distributing traffic across the servers to manage the load.
- JSON Web Tokens (JWT): A compact, URL-safe means of representing claims between two parties.
- Sequelize: An ORM (Object-Relational Mapping) for Node.js and MySQL.

### Running Docker images

Frontend: docker run -p 3000:3000 kuldeep55567/blog-app-frontend

Backend: docker run -p 4500:4500 kuldeep55567/blog-app-backend

---

# Steps required to set up and run the application locally

### `Backend`

1. npm install (to install dependencies)
2. npm run server (to start the server)
3. URL- http://localhost:4500/

---

### Routes:

- ### User Routes

| METHOD | ENDPOINT       | WHAT IT DOES                                                                          |
| ------ | -------------- | ------------------------------------------------------------------------------------- |
| POST   | /register | -> Registers a new User in the database                                                    |
| POST   | /login    | -> Users can log in with their email and password and by default their role is reader      |
| GET    | /users    | ->  Get all registered users from database                                                 |
| PUT    | /users/:id/change-role| -> Admins can only access this route for changing roles of registered users    |

- ### Blog Routes

| METHOD | ENDPOINT                    | WHAT IT DOES                                                                    |
| ------ | --------------------------- | ------------------------------------------------                                |
| GET    | /blogs/:id                  | -> Get all blogs or filtered blogs with category and with search functionality  |
| GET    | /myblogs                    | -> get all blogs made by logged in user                                         |
| POST   | /blogs                      | -> Logged in users can create Blogs                                             |
| PUT    | /blogs/:id                  | -> Logged in users can update their Blogs                                       |
| DELETE | /blogs/:id                  | -> Logged in users can delete their Blogs                                       |

- ### Comment Routes

| METHOD | ENDPOINT                     | WHAT IT DOES                                            |
| ------ | ---------------------------- | ------------------------------------------------------- |
| GET    | /blog/:blogId/comments       | -> Get all comments for a particular blog               |
| POST   | /blog/:blogId/comment        | -> Logged in users can comment on any blog              |

### `Frontend`

1. npm install (to install dependencies)
2. npm Start (to start the app)
3. URL- http://localhost:3000/

---

# How to deploy the application on Amazon EKS?

### `Requirements`

1. Create an account on Docker
2. Create an account on AWS
3. Install AWS CLI 
4. Install Eksctl 
5. Install kubectl

### `Steps`

1. Dockerize the Application (frontend/backend)

   - Create a Dockerfile and add the docker commands

   - Build Docker Image (docker build -t <user_name>/<image_name>)

   - Run the application as a Docker Container (docker run -p <port>:<port> <user_name>/<image_name>)

   - Push the Docker Image to Docker Hub (docker push <user_name>/<image_name>)

2. Create the Amazon EKS Cluster

   - Install the AWS CLI Tool

   - Configure the Amazon Web Service

     - run command- aws configure (provide the inputs asked)

   - Install the Eksctl tool.

     - Create the Amazon EKS Cluster using Eksctl
     - run command- eksctl create cluster --name sample-cluster

   - Write Kubernetes Deployment and Service YAML files for both frontend and backend

   - Deploy the Applications

     - kubectl apply -f <backend/frontend>-deployment.yaml
     - kubectl apply -f <backend/frontend>-service.yaml

   - kubectl get service to access the Application Container
     - Use the external ID
     - http://<YOUR_LOAD_BALANCER_ENDPOINT>:< port >/


## Contact

For any inquiries, feel free to reach out via email at [kuldeept5567@gmail.com](mailto:kuldeept5567@gmail.com).
