# 爬虫系统
### 数据库
    数据库选用 mongodb，因为以后数据库肯定需要变所以选择mongodb，打算以后引入 redis。还有写 node 当然用mongodb。
### 图片存储
    开始打算用 axios 请求图片数据存进七牛云，可是一直 403 拒绝我访问，只能换个方案了。
### 登录使用 token验证
    使用 jsonwebtoken 来生成 token。在基于 token 的认证里，不再使用 cookie 和session。token 可被用于在每次向服务器请求时认证用户。我们使用基于         token 的认证来重新设计刚才的设想。

    将会用到下面的控制流程：

    用户在登录表单中输入 用户名 和 密码 ，然后点击 登录 ；

    请求发送之后，通过在后端查询数据库验证用户的合法性。如果请求有效，使用在数据库得到的信息创建一个 token，然后在响应头信息中返回这个的信息，目的是把     这个 token 存储到浏览器的本地存储中；
    
    在每次发送访问应用中受限制的后端服务器的请求时提供 token 信息；
    
    如果从请求头信息中拿到的 token 有效，允许用户访问受限制的后端服务器，并且返回 JSON 或者 XML。
    
    在这个例子中，我们没有返回的 session 或者 cookie，并且我们没有返回任何 HTML 内容。那意味着我们可以把这个架构应用
    于特定应用的所有客户端中。你可以看一下面的架构体系：
   ![参考](https://pic3.zhimg.com/80/0d018270d567ae23a87c3c33b12ea43e_hd.jpg)
