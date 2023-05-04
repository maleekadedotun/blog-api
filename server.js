const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const commentRouter = require("./routes/comment/commentRoutes");
const categoryRouter = require("./routes/categories/categoryRoutes");
const config = require("./config1/dbConnect.js");
const globalErrorhandler = require("./middlewares/globalErrorHandler");
const isAdmin = require("./middlewares/isAdmin");

const app = express();

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