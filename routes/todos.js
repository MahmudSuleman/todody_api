import express from 'express';
import TodoModel from "../schemas/todo_schema.js";

const router = express.Router();

// get all todos
router.get("/", async (req, res) => {

    try {
        const todoModel = await TodoModel.find({});
        if(todoModel){
            return res.status(200).json({
                message:'Todos fetched',
                status: true,
                data: todoModel
            })
        }else{
            return res.status(404).json({
                message: 'No todos found',
                status: false,
                data: todoModel
            })
        }
    }catch(err){
        console.log(err);
    }


});


router.get('/completed', (async(req, res) =>  {
    const todos = await TodoModel.find({}).where({status:true});

    if(todos){
        return res.status(200).json({
            message: "Completed todos",
            status: true,
            data: todos
        });
    }
    return res.status(404).json({
        message: "Failed to get Completed todos",
        status: false,
        data: todos
    });
}));

///update a todo
router.patch("/:id", async(req, res) => {
    const {id} = req.params;
    const {status}  = req.body;

    const todoModel = await TodoModel.findOneAndUpdate({_id:id},{status: status});


    if(todoModel){
        return res.status(200).json({
            message: "Todo updated",
            status: true,
            data: todoModel
        });
    }
    return res.status(404).json({
        message: "Failed to updated Todo",
        status: false,
        data: todoModel
    });
});

export default router;
