import React, { useEffect } from 'react';
import { usePost } from '../contexts/PostContext.jsx'; 
import BlogPost from '../components/BlogPost.jsx'; 
import { io } from 'socket.io-client';

// Create socket instance outside the component (singleton-style)
const socket = io('http://localhost:5001');


const Blogs = () => {
  const { fetchPosts, posts,setPosts, loading } = usePost();

  useEffect(() => {
    fetchPosts();
    socket.on('postCreated', (newPost) => {
      setPosts(prev => [newPost, ...prev]);
    });

    socket.on('postUpdated', (updatedPost) => {
      setPosts(prev =>
        prev.map(p => (p.id === updatedPost.id ? updatedPost : p))
      );
    });

    socket.on('postDeleted', ({ postId }) => {
      setPosts(prev => prev.filter(p => p.id !== postId));
    });
    return () => {
      socket.off('postCreated');
      socket.off('postUpdated');
      socket.off('postDeleted');
    };
  }, []);

  return (
    <div className='min-h-screen p-6 bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>All Blogs</h1>
      
      {loading ? (
        <p className='text-gray-600'>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className='text-gray-600'>No posts available.</p>
      ) : (
        <div className='grid gap-4'>
          {posts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
