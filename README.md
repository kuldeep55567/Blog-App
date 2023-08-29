# Blog App Backend

This repository contains the backend application for a blog website. Users can perform actions such as login, register, create, edit, delete blogs, and comment on blogs. The application has three levels of authorization: reader, author, and admin.

## Docker Image

The Docker image for the backend application is hosted on Docker Hub. You can pull and run the image using the following steps:

1. **Pull the Docker Image**:

   To pull the Docker image, use the following command:

   ```sh
   docker pull kuldeep55567/blog-app-backend:latest
## Run the Docker Container

After pulling the image, you can run a Docker container using the following command:

   docker run -p 4500:4500 -d kuldeep55567/blog-app-backend:latest

   
## Features

1. **User Authentication with RBAC:** Only logged-in users and those having specific roles have the ability to create and publish their own blogs.

2. **JWT Authentication:** User authentication is handled using JSON Web Tokens (JWT) for secure and stateless communication.

3. **Commenting System:** Users can engage in discussions by commenting on blog posts.

4. **Search Functionality:** Users can easily search for their favorite topics or specific blog posts.

5. **Editing your Blogs:** Users can now update their older blogs with new content and add-ons.

6. **Deleting your Blogs:** Users can remove unwanted blogs from the app
## Routes

### User Routes

- `POST /signup`: Register a new user.
- `POST /login`: Log in an existing user.

### Blog Post Routes

- `GET /blogs/:id?`: Retrieve all blog posts or specific posts by ID. Supports searching by a query parameter.
- `GET /blog/:blogId/comments`: Get all comments for a specific blog post.
- `POST /blogs`: Create a new blog post. Requires user authentication.
- `POST /blog/:blogtId/comment`: Add a comment to a specific blog post. Requires user authentication.
- `PUT /blogs/:id`: Edit  a specific blog post. Requires user authentication.
- `DELETE /blogs/:id`: Delete  a specific blog post. Requires user authentication.

### User-Specific Routes

- `GET /myblogs`: Retrieve all blog posts created by the logged-in user. Requires user authentication
   
