const User = require("../model/User/user");
const { appErr } = require("../utilis/appError");
const generateFromHeader = require("../utilis/generateTokenFromHeader")
const verifyToken = require("../utilis/verifyToken")





const isAdmin = async(req, res, next) => {
    // Get token from header
    const token = generateFromHeader(req);
    // console.log(token)

    // verify Token
    const decodedUser = verifyToken(token)
    // Save token to obj
    req.userAuth = decodedUser.id
    // console.log("isAmin", decodedUser.id);
        //  find the user in DB
    const user = await User.findById(decodedUser.id);
        // check if is admin
    if(user.isAdmin){
        return next()
    }
        
    else{
        return next(appErr("Access denied, admin Only"))
    }
    // if (!decodedUser) {
    //     return next(appErr("Invalid/Expired Token, please login again"));
    // }
    // else{
    //     next()
    // }

};

module.exports = isAdmin