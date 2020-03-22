var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var expressHbs=require('express-handlebars');
var hb=require('handlebars');

const bodyParser=require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var adminRouter=require('./routes/admin');
var articleRouter=require('./routes/article');
var bookRouter=require('./routes/book');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var mongoose=require('mongoose');
var app = express();


app.engine('.hbs',expressHbs({defaultLayout:'layout',extname:'.hbs'}));
app.set('view engine','.hbs');

mongoose.connect('mongodb://localhost:27017/book-store',{useNewUrlParser:true});


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');
app.use(session({
    secret:'mysupersecret',
    resave:false,
    saveUninitialized:true,
    cookie :{ maxAge:180*60*1000 },
    store:new MongoStore({mongooseConnection:mongoose.connection})
}))



hb.registerHelper("counter",function (index) {
    return index+1;

});
hb.registerHelper("dateformate",require('handlebars-dateformat'));

hb.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/article',articleRouter);
app.use('/admin',adminRouter);
app.use('/book',bookRouter);
//routes.initialize(app);
app.use(function(req,res,next){
    res.locals.login=req.session;
    console.log("Seesssisioioidodi"+req.session.email);
    next();
});

/*app.get('/nosession', function(req, res) {
    req.session.destroy();
    console.log("Session not ava");
    res.status(200).send('ok');
});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



app.use((req, res, next  ) => {
  /*  res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Request-With,Content-Type,Access,Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELET,GET');
        return res.status(200).json({})

    }
    next();*/
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'DELETE, PUT','POST');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if ('OPTIONS' == req.method) {
            res.sendStatus(200);
        }
        else {
            next();
        }
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
