import express, {json} from "express";
import mongoose from "mongoose";
import TodoModel from "./schemas/todo_schema.js";
import TodoRouter from "./routes/todos.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(json());
app.use('/todos', TodoRouter);

mongoose
    .connect(process.env.DB_URL
        ,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )


app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Welcome to todody api",
    });
});

// get a todo
app.get("/todos/:id", async (req, res) => {
    const {id} = req.params;

    const todoModel = await TodoModel.findById(id);
    if (todoModel)
        return res.status(200).json({
            message: "Get one todo",
            status: true,
            data: todoModel
        });

    return res.status(404).json({
        message: "Failed to get one todo",
        status: false
    });
});

///create a todo
app.post("/todos", async (req, res) => {

    const {title, description, date_time, status} = req.body;
    const todo = await TodoModel.create({
        title, description, date_time, status
    });

    if (todo) {
        return res.status(201).json({
            message: "Created a todo",
            status: true,
            data: todo
        });
    } else {
        return res.status(404).json({
            message: "Failed to create todo",
            status: true,
            data: todo
        });
    }


});


///delete a todo
app.delete("/todos/:id", (req, res) => {
    return res.status(200).json({
        message: "deleted a todo",
    });
});

app.listen(3000, () => {
    console.log("listening on port 4000");
});
