
const Router = require("@koa/router");
const router = new Router();
const UserController = require("../controllers/userControllers");
const PostController = require('../controllers/postControllers')
const LikeController = require('../controllers/likeControllers')
const CommentController = require('../controllers/commentControllers')
const userAuthentication = require('../middleware/user');

router.post('/login',UserController.login)

router.post('/register',UserController.register)

router.get('/post/my',userAuthentication,PostController.myPosts)

router.get ('/verify/:id',userAuthentication, UserController.verify)

router.post('/post/create',userAuthentication, PostController.create)

router.patch('/post/edit/:id',userAuthentication, PostController.edit)

router.delete('/post/delete/:id',userAuthentication, PostController.delete)

router.get('/post/:id',PostController.selectPost)

router.post ('/like',userAuthentication,LikeController.likeSystem)

router.post ('/comment/create',userAuthentication, CommentController.create)

router.delete ('/comment/:id',userAuthentication, CommentController.delete)

router.get('/list',userAuthentication, UserController.testMiddleware)

router.get('/',async (ctx) => {
    console.log("test")
    ctx.body = {
        message: 'welcome'
    }
})

module.exports = router;
