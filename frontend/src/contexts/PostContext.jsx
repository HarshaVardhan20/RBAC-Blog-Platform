import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/api/post/getAllPosts', {
        withCredentials: true,
      });
      setPosts(response.data.posts);
    } catch (err) {
      console.log('Error while fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (title, content) => {
    try {
      await axios.post(
        'http://localhost:5001/api/post/create',
        { title, content },
        { withCredentials: true }
      );
    } catch (err) {
      console.log('Error while creating post:', err);
    }
  };

  const deletePost = async (postId) => {
    try {
      console.log(postId);
      await axios.delete(
        'http://localhost:5001/api/post/delete',
        { data: {postId},withCredentials: true }
      );
    } catch (err) {
      console.log('Error while deleting post:', err);
    }
  };

  const updatePost = async (title, content,postId) => {
    try {
      await axios.post(
        'http://localhost:5001/api/post/update',
        { postId, title, content },
        { withCredentials: true }
      );
    } catch (err) {
      console.log('Error while updating post:', err);
    }
  };

  return (
    <PostContext.Provider
      value={{
        createPost,
        deletePost,
        updatePost, 
        fetchPosts,
        posts,
        setPosts, 
        loading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
