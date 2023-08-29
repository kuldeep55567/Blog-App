const express = require("express")
const Blog = require('../Model/BlogModel');
const User = require("../Model/UserModel")
const Comment = require("../Model/CommentModel")
const { Op } = require('sequelize');
const { authMiddleWare } = require("../Middleware/Authentication")
const BlogRouter = express.Router()
require("dotenv").config()

BlogRouter.get('/blogs/:id?', async (req, res) => {
    const searchQuery = req.query.search;
    const categoryQuery = req.query.category
    const sortOption = req.query.sort;
    const { id } = req.params;
    try {
      if (id) {
        const post = await Blog.findByPk(id);
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
        const user = await User.findByPk(post.UserId);
        const postData = {
          ...post.toJSON(),
          userName: user ? user.name : null
        };
        return res.json(postData);
      } else {
        let posts;
        const whereCondition = {};
        if (searchQuery) {
          whereCondition.title = {
            [Op.like]: `%${searchQuery}%`,
          };
        }
  
        if (categoryQuery) {
          whereCondition.category = categoryQuery;
        }
  
        if (Object.keys(whereCondition).length > 0) {
          posts = await Blog.findAll({
            where: whereCondition,
            order: sortOption === 'oldest' ? [['createdAt', 'ASC']] : [['createdAt', 'DESC']],
          });
        } else {
          posts = await Blog.findAll({
            order: sortOption === 'oldest' ? [['createdAt', 'ASC']] : [['createdAt', 'DESC']],
          });
        }
  
        const postsData = await Promise.all(posts.map(async (post) => {
          const user = await User.findByPk(post.UserId);
  
          return {
            ...post.toJSON(),
            userName: user ? user.name : null
          };
        }));
        return res.json(postsData);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server Error' });
    }
});
BlogRouter.get('/myblogs', authMiddleWare('author'), async (req, res) => {
  const userId = req.user.id;
  try {
    const blogs = await Blog.findAll({ where: { UserId: userId } });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching blogs.' });
  }
});

BlogRouter.post("/blogs", authMiddleWare('author'), async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const userId = req.user.id;
        const userName = await User.getUserNameById(userId);
        if (!userName) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newBlog = await Blog.create({ title, content, category, UserId: userId, userName:userName});
        res.status(201).json(newBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating blog post' });
    }
})

BlogRouter.put('/blogs/:id', authMiddleWare('author'), async (req, res) => {
    const blogId = req.params.id;
    const { title, content, category } = req.body;
    try {
        const blog = await Blog.findByPk(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        await blog.update({ title, content, category });
        res.status(200).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating blog post' });
    }
});

BlogRouter.delete('/blogs/:id', authMiddleWare('author'), async (req, res) => {
    const blogId = req.params.id;
    try {
        const blog = await Blog.findByPk(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        await blog.destroy();
        res.status(204).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting blog post' });
    }
});
BlogRouter.post('/blog/:blogId/comment', authMiddleWare(), async (req, res) => {
    const postId = req.params.blogId
    const { text } = req.body;
    const userID  = req.user.id
    const userName = await User.getUserNameById(userID);
    try {
      const post = await Blog.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      const newComment = await Comment.create({
        text: text,
        blogId: postId,
        name:userName
      });
      res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  });
  BlogRouter.get('/blog/:blogId/comments', async (req, res) => {
    const postId = req.params.blogId;
    try {
      const comments = await Comment.findAll({
        where: { blogId: postId },
      });
      res.json(comments);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  });
module.exports = { BlogRouter }