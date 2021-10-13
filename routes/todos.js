import express from 'express';

const router = express.Router();

router.get('/new-todo', (req, res)=>{
    res.status(200).json({
        message: 'new todo'
    });
})

export default router;
