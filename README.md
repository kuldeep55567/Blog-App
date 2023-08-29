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

```sh
docker run -p 4500:4500 -d kuldeep55567/blog-app-backend:latest
This will start the blog backend application on port 3000.
   
