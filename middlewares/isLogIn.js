const { appErr } = require("../utilis/appError");
const generateFromHeader = require("../utilis/generateTokenFromHeader")
const verifyToken = require("../utilis/verifyToken")




const isLogin = (req, res, next) => {
    // Get token from header
    const token = generateFromHeader(req);
    // console.log(token)

    // verify Token
    const decodedUser = verifyToken(token)
    // Save token to obj
    req.userAuth = decodedUser.id

    if (!decodedUser) {
        return next(appErr("Invalid/Expired Token, please login again"));
    }
    else{
        next()
    }

};

module.exports = isLogin