import dotenv from "dotenv";
import express, { Router } from "express";
import {connectDatabase} from "./config/connectDb.js"
import userRouter from './routes/user.routes.js';
import cors from 'cors'
import {User} from './models/user.models.js'
import imageRouter from "./routes/image.routes.js";
import errrMiddleware from "./middleware/errorMiddleware.js";
import { sendMail } from "./config/email.js";

const app = express();

dotenv.config();
connectDatabase();
sendMail()

app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 8000


// app.get("/api/jokes",async (req, res) => {
//     const jokes = [
//         {
//             "setup": "Why don't scientists trust atoms?",
//             "punchline": "Because they make up everything!"
//         },
//         {
//             "setup": "Why did the scarecrow win an award?",
//             "punchline": "Because he was outstanding in his field!"
//         },
//         {
//             "setup": "What do you call fake spaghetti?",
//             "punchline": "An impasta!"
//         },
//         {
//             "setup": "Why did the math book look sad?",
//             "punchline": "Because it had too many problems."
//         },
//         {
//             "setup": "Why can't your nose be 12 inches long?",
//             "punchline": "Because then it would be a foot."
//         }
//     ];
//     res.send(jokes);
//     await jokes.save()

// })
// app.post("/api/signup",(req ,res)=>{
//     console.log(req.body);
//     res.json({message:"got the feedback"})

//     const newUser = new User({
//         name:"rahul",
//         email:"rahul@gmail.com",
//         password:1234
//     });
//     newUser.save();
// })

app.use("/user" , userRouter)
app.use("/image",imageRouter)

app.use("/", (req, res) => {
    res.send("API is running...");
});


app.use(errrMiddleware)

app.listen(port, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});