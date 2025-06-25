import React from 'react';

const PostTable = ({ posts = [],onEdit, onDelete }) => {
  if (posts.length === 0) {
    return <p className="text-gray-500">No posts available.</p>;
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-md">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Author</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{post.title}</td>
              <td className="py-2 px-4 border-b">{post.author_name || 'Admin'}</td>
              <td className="py-2 px-4 border-b">
                {new Date(post.created_at).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b text-center space-x-2">
                <button
                  onClick={() => onEdit(post)}
                  className="text-blue-600 hover:underline"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  className="text-red-600 hover:underline"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
