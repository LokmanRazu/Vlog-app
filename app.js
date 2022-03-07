const express = require('express');
const app = express();
const mongoose = require('mongoose')



//Import Routes
const authroutes = require('./routes/authRoute')
const dashboardRoutes = require('./routes/dashboardroute')

//Import Middleware
const setmiddleware = require('./middleware/middleware')


//Setup view Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//using Middleware From Middle Dirictory
setmiddleware(app)




//Import Routes
const setRoute = require('./routes/routes')




// Using Routes from Routes Dirictory
setRoute(app)


//404 and 500 ERROR HANDELING
app.use((req,res,next)=>{
    let error = new Error('404 page not found')
    error.status = 404
    next (error)
})

// Default Error Handler middleware
app.use((error,req,res,next)=>{
    if(error.status == 404){
        return res.render('pages/error/404')
    }
    console.log(error)
    res.render('pages/error/500')
})

const PORT = process.env.PORT ||8080;
mongoose.connect(`mongodb+srv://EagleBlog:LmBw7OxFzn7RK5Fq@cluster0.pnxzb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true })
    .then(() => {
        console.log('Database connected')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }).catch(e => {
        console.log(e)
    })
