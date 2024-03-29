const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const commentRouter = require("./routes/comment/commentRoutes");
const categoryRouter = require("./routes/categories/categoryRoutes");
const config = require("./config1/dbConnect.js");
const globalErrorhandler = require("./middlewares/globalErrorHandler");
const isAdmin = require("./middlewares/isAdmin");
const Post = require("./model/Post/post");
const User = require("./model/User/user");
const Category = require("./model/Category/category");
const Comment = require("./model/Comment/comment");



const app = express();
// Posts
app.get("/", async(req, res) => {
    const posts = await Post.find()
    try{
        res.json({
            status: "Success",
            data: posts
        })
    }
    catch (error) {
        res.json(error)
    }
})

// Users
app.get("/users", async(req, res) => {
    const users = await User.find()
    try{
        res.json({
            status: "Success",
            data: users
        })
    }
    catch (error) {
        res.json(error)
    }
})

// Categories
app.get("/categories", async(req, res) => {
    const categories = await Category.find()
    try{
        res.json({
            status: "Success",
            data: categories
        })
    }
    catch (error) {
        res.json(error)
    }
});

// Comment
app.get("/comments", async(req, res) => {
    const comments = await Comment.find()
    try{
        res.json({
            status: "Success",
            data: comments
        })
    }
    catch (error) {
        res.json(error)
    }
})



// middlewears
app.use(express.json()); // pass incoming payload

const userAuth = {
    isLogin: true,
    isAdmin: false,
}
app.use((req, res, next) => { 
    if (userAuth.isLogin) {
        next()
    }
    else{
        res.json({
            msg: "Invalid login credentials"
        })
    }
})
//routes
//  app.use(isAdmin);

//users routes
app.use("/api/v1/users/", userRouter);

//posts routes
app.use("/api/v1/posts/", postRouter);

//comments routes
app.use("/api/v1/comments", commentRouter);

//categories routes
app.use("/api/v1/categories", categoryRouter);

//profile-photo-upload routes
// app.use("/api/v1/profile-photo-upload", categoryRouter);

// error handlers middlewear
app.use(globalErrorhandler)

// 404
app.use('*',(req, res) => {
 console.log();
    res.status(404).json({
      message:` ${req.originalUrl} - Route Not Found`,
    })
})
// Listen to server

const PORT = process.env.PORT || 9000
app.listen(PORT, console.log(`Server is up and running on ${PORT}`))