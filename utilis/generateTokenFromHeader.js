const generateFromHeader = (req) =>{
    const headerObj = req.headers; 
    // console.log("head",headerObj)
        
     const token = headerObj["authorization"].split(" ")[1]
    
    if(token !== undefined){
        return token
    }
    // if (!token) {
    //     return token;
    //   }
    else{
        return false
    }
};

module.exports = generateFromHeader;