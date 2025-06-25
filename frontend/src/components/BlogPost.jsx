import React from 'react';

const BlogPost = ({ post }) => {
  if (!post || !post.title) return null;

  return (
    <div className='w-full max-w-[550px] bg-green-100 m-4 rounded-md shadow-md'>
      <div className='flex gap-2 p-3 border-b'>
        <p className='font-semibold'>Title:</p>
        <p>{post.title}</p>
      </div>
      <div className='flex gap-2 p-3'>
        <p className='font-semibold'>Content:</p>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;
