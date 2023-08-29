# Blog App Backend

This repository contains the backend application for a blog website. Users can perform actions such as login, register, create, edit, delete blogs, and comment on blogs. The application has three levels of authorization: reader, author, and admin.

## Docker Image

The Docker image for the backend application is hosted on Docker Hub. You can pull and run the image using the following steps:

1. **Pull the Docker Image**:

   To pull the Docker image, use the following command:

   ```sh
   docker pull kuldeep55567/blog-app-backend:latest
Run the Docker Container:

After pulling the image, you can run a Docker container using the following command:
```sh
 docker run -p 3000:3000 -d kuldeep55567/blog-app-backend:latest

This will start the blog backend application on port 3000.

Access the Application:

Once the container is running, you can access the application by opening your web browser and navigating to http://localhost:3000. The API routes mentioned in the application will be available for testing.

API Routes
The backend application exposes several API routes for various actions:

GET /blogs/:id?: Fetches blog posts. You can provide an optional id parameter to fetch a specific blog post.

GET /myblogs: Fetches blogs belonging to the currently authenticated author.

POST /blogs: Creates a new blog post. Requires authentication as an author.

PUT /blogs/:id: Updates an existing blog post. Requires authentication as an author.

DELETE /blogs/:id: Deletes a blog post. Requires authentication as an author.

POST /blog/:blogId/comment: Adds a comment to a blog post. Requires authentication.

GET /blog/:blogId/comments: Fetches comments for a specific blog post.

Make sure you review and customize the application configuration, such as environment variables and database settings, according to your needs before deploying it in a production environment.

Authentication
The application uses JWT-based authentication. Ensure you set the appropriate environment variables for authentication to work correctly.
