import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from './Modal';
import { BackendLink } from '../Link';
const BlogDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  useEffect(() => {
    fetch(`${BackendLink}/blogs/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching post details:', error);
        setLoading(false);
      });

    fetch(`${BackendLink}/blog/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [postId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    fetch(`${BackendLink}/blog/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ text: commentText }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data.comment]);
        setCommentText('');
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  if (loading) {
    return <div className='loader'>Loading...</div>;
  }

  if (!post) {
    return <div>Blog not found.</div>;
  }

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  return (
    <div id='mains'>
      <div id='details'>
        <h1>{post.title}</h1>
        <h2>Category - {post.category}</h2>
        <hr />
        <div id='flexed'>
          <h3 className='naming'>By : {post.userName}</h3>
          <h3>Published: {formatDateTime(post.createdAt)}</h3>
        </div>
        <hr />
        <p>{post.content}</p>
      </div>
      <div id='comment'>
        <h2>Comments</h2>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <div key={comment.id} className='names'>
                <p>{comment.text}</p>
                <h4 className='naming'>By: {comment.name}</h4>
                <hr className='under' />
              </div>
            ))}
          </ul>
        ) : (
          <p className='be'>Be the first to comment.</p>
        )}
        <form onSubmit={handleCommentSubmit}>
          <textarea
            placeholder='Type your comment here..'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <button type="submit"><i class="fa-solid fa-comment"></i></button>
        </form>
      </div>
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        message="You need to be logged in to comment."
      />
    </div>
  );
};
export default BlogDetails;
