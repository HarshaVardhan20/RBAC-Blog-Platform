const express = require('express');

const router = express.Router();

const pool = require('../db/db');
const {z} = require('zod');

const {getIO} = require('../io.js');

const postCreateSchema = z.object({
    title: z.string(),
    content: z.string()
})

const getAllPosts = async (req,res)=>{
    try{
        const userId = req.user.id;
        const posts = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
        console.log(posts);
        return res.status(200).json({   
            message: 'Posts received successfully',
            posts: posts.rows
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Unable to fetch posts'
        })
    }
}

const createPost= async (req,res)=>{

    const validateData = postCreateSchema.safeParse(req.body);

    if(req.user.role !=='admin'){
        return res.status(401).json({
            message: 'Only admins are allowed to create posts'
        })
    }

    if(!validateData.success){
        return res.status(401).json({
            message: 'Enter inputs correctly'
        })
    }
    const {title,content} = req.body;
    const user = req.user;
    try{
        const result = await pool.query(
            'INSERT INTO posts (title,content,author) values ($1,$2,$3) RETURNING *',[title,content,user.id]
        )

        const newPost = result.rows[0];
        
        getIO().emit('postCreated',newPost);
        console.log(newPost);
        return res.status(200).json({
            message: 'Post created successfully',
            post: newPost
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}


const deletePost = async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(401).json({
            message: "Only admins are allowed to delete posts",
        });
    }

    const { postId } = req.body;

    if (!postId) {
        return res.status(400).json({
            message: "Post id is not given",
        });
    }

    try {
        const postFound = await pool.query("SELECT * FROM posts WHERE id = $1", [
          postId,
        ]);
        if (postFound.rows.length === 0) {
            return res.status(404).json({
                    message: "No post found with this postId.",
            });
        }
        await pool.query("DELETE FROM posts WHERE id = $1", [postId]);

        getIO().emit("postDeleted", { postId });

        return res.status(200).json({
            message: "Post deleted successfully",
            postId,
        });
    }   
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


const updatePost = async (req, res) => {
    console.log(req.body);
    if (req.user.role !== 'admin') {
        return res.status(401).json({
            message: 'Only admins can update the posts'
      } );
    }

    const { postId, title, content } = req.body;

    if (!postId) {
        return res.status(400).json({
            message: 'postId is not received/Incorrect postId'
        });
    }

    try {
        const postFound = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);

        if (postFound.rows.length === 0) {
            return res.status(404).json({
              message: 'Post not found/Incorrect postId'
            });
        }

        const result = await pool.query(
          'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
          [title, content, postId]
        );

        const updatedPost = result.rows[0];

        getIO().emit('postUpdated', updatedPost);

        return res.status(200).json({
          message: 'Post updated successfully.',
          updatedPost
        });
    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Internal server error'
        });
    }
};


module.exports={
    createPost,deletePost,updatePost,getAllPosts
}
