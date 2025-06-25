import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import WelcomeAdmin from '../components/WelcomeAdmin';
import PostForm from '../components/PostForm';
import PostTable from '../components/PostTable';
import { useAuth } from '../contexts/AuthContext';
import { usePost } from '../contexts/PostContext';
import { io } from 'socket.io-client';

// Create socket instance outside the component (singleton-style)
const socket = io('http://localhost:5001');

const Dashboard = () => {
  const { user } = useAuth();
  const { fetchPosts, posts, setPosts, deletePost, update } = usePost();

  const [editingPost, setEditingPost] = useState(null);

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

  const handleEdit = (post) => {
    setEditingPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdate = (data) => {
    update(data.title, data.content, data.id);
    setEditingPost(null);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center p-10 text-red-600 font-semibold">
        Access Denied – Admins only.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="max-w-6xl mx-auto p-6">
        <WelcomeAdmin name={user.name || 'Admin'} />

        <div className="my-0">
          <h2 className="text-2xl font-bold mb-4">
            {editingPost ? 'Edit Post' : 'Create New Post'}
          </h2>
          <PostForm
            mode={editingPost ? 'edit' : 'create'}
            initialData={editingPost || {}}
            onSubmit={editingPost ? handleUpdate : undefined}
          />
          {editingPost && (
            <button
              className="mt-2 text-sm text-gray-500 hover:underline"
              onClick={handleCancelEdit}
            >
              Cancel Editing
            </button>
          )}
        </div>

        <div className="my-8">
          <h2 className="text-xl font-semibold mb-4">All Posts</h2>
          <PostTable posts={posts} onEdit={handleEdit} onDelete={deletePost} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
