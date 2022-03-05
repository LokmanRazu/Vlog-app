const authRoute = require('./authRoute')
const dashBoardRoute = require('./dashboardroute')
const uploadroute = require('./uploadRoutes')
const createPost = require('./postRoute')

const routes = [
    {
        path:'/auth',
        handler:authRoute
    },
    {
        path:'/dashboard',
        handler:dashBoardRoute
    },
    {
        path:'/uploads',
        handler:uploadroute
    },
    {
        path:'/posts',
        handler:createPost
    },
    {
        path:'/',
        handler:(req, res) => {

            res.json({
                message: 'Hello World'
            })
        }
    }
];

module.exports = app =>{
    routes.forEach(r =>{
        if(r.path == '/'){
            app.get(r.path,r.handler)
        }else{
            app.use(r.path,r.handler)
        }
    })
}