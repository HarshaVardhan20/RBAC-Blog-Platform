const express = require('express');

const router  = express.Router();
const protectRoute = require('../middlewares/auth.middleware');
const {createPost,deletePost, getAllPosts,updatePost} = require('../controllers/postController');
router.post('/create',protectRoute,createPost);

router.delete('/delete',protectRoute,deletePost);
router.post('/update',protectRoute,updatePost);
router.get('/getAllPosts',protectRoute,getAllPosts)

module.exports=router;