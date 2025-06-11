

const checkIncomingTodo = (req,res,next) => {
    const allowedKeys = ["id","name","status"];
    const keys = Object.keys(req.body);

    const hasOnlyAllowedKeys = keys.every(key => allowedKeys.includes(key));
    const hasRequiredKeys = allowedKeys.every(key => key in req.body);

    if(!hasOnlyAllowedKeys || !hasRequiredKeys){
        res.status(400).send("invalid todo format");
    }else{
        next();
    }
}

module.exports = checkIncomingTodo;