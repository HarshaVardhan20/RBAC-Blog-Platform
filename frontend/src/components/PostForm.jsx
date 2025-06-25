import React,{useState} from 'react'
import { useAuth } from '../contexts/AuthContext';
import NotAuthenticated from '../pages/NotAuthenticated';
import { usePost } from '../contexts/PostContext';

const PostForm = ({mode='create',initialData={},}) => {
    const {user} = useAuth();
    const [title,setTitle] = useState(initialData.title ||'');
    const [content,setContent] = useState(initialData.content || '');

    const {createPost,updatePost} = usePost();
    if (!user || user.role !== 'admin') {
        return <NotAuthenticated />;
    }

    const handleSubmit = (e)=>{
        try{
            e.preventDefault();
            if(!title.trim() || !content.trim()){
                return;
            }
            if(mode==='create'){
                createPost(title,content);
            }
            else{
                updatePost(title,content,initialData.id);
            }
            setTitle('');
            setContent('');
        }
        catch(err){
            console.log('Error while creating post or updating post');
        }
    }
  return (
    <div className='flex justify-center items-center h-screen'>
        <form onSubmit={(e)=>handleSubmit(e)} className='flex flex-col gap-4 p-6 bg-white rounded shadow-md w-full max-w-xl justify-center '>  
            <h2 className='text-xl font-bold text-gray-800'>{mode=='edit' ? 'Update Post': 'Create Post'}</h2>
            <input type='text' placeholder='Enter title' value={title} onChange={(e)=>setTitle(e.target.value)} className='border border-gray-300 px-3 py-2 rounded-md' required></input>
            <textarea placeholder='Write your content here...' value={content} onChange = {(e)=>setContent(e.target.value)} rows={6}
            className='border border-gray-300 px-3 py-2 rounded-md resize-none' required>
            </textarea>
            <button className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition'>
                {mode=='edit' ? 'Update Post': 'Create Post'}
            </button>
        </form>
    </div>
  )
}

export default PostForm
