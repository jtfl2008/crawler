module.exports = async (ctx, next) => {
    let path = ctx.path;
    if(path == '/login' || path == '/' || path == '/userin' || path == '/favicon.ico'){
        await next();
    }else if(ctx.header.authorization == undefined){
        ctx.body = {
            msg: '用户token认证失败'
        }
    }
}