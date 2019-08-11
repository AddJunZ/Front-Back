//Json Web Token
const jwt = require('jsonwebtoken')

const createToken = (user_id) => {
    //密钥
    let token = jwt.sign({ user_id: user_id }, 'AddJunZ',{
        expiresIn:'120s'
    })
    return token;
}

const checkToken = async (ctx,next) => {
    console.log(ctx.request)
    let authorization = ctx.get('Authorization');
    if(authorization == ''){
        ctx.throw(401,'no token detected in http headerAuthorization')
    }
    let token = authorization.split(' ')[1];
    let tokenContent;
    try {
        //如果token过期或验证失败，将抛出错误
        tokenContent = await jwt.verify(token, 'AddJunZ');
    } catch (err) {
        //客户端应该重新登录了
        ctx.throw(401, 'invalid token');
    }
    await next();    
}

module.exports = {
    checkToken,
    createToken
}