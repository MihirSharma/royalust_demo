const jwt = require("jsonwebtoken");

exports.generateAccessToken = (data)=>{
    return jwt.sign({user: data}, process.env.SECRET_KEY, {expiresIn: 15, algorithm: "HS512"})
}

exports.generateRefreshToken = (data)=>{
    return jwt.sign({user: data}, process.env.REFRESH_KEY, {expiresIn: "6h", algorithm: "HS512"})
}

exports.authenticateToken = (req,res, next) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
        if(err){

            return res.sendStatus(403);
        } 

        req.user = user.user;
        next();
    })
}

exports.authenticateRefresh = (refreshToken) =>{
    const token = refreshToken
    if(!token) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
        if(err){
            return res.sendStatus(403);
        } 
        req.user = user.user;
    })
}

exports.checkToken = (req, res, next) =>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) req.token = null;

    jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
        if(err) return res.send({renew: true});
        req.token = token

        next();
    })
}