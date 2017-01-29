var express = require("express"),
config = require('./config');
app = express(),
path = require("path"),
adminRouter = express.Router(),
loginRouter = express.Router(),
mongoose = require("mongoose")
morgan = require("morgan"),
port = process.env.PORT || 8080,
bodyParser = require("body-parser"), db = "", User = require('./models/UserModel'),
jwt = require('jsonwebtoken'), aSec='test';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ishank');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});


app.use(morgan('dev'));
app.use(express.static(__dirname+'/../public'));
var apiRouter = require('./routes/api')(app, express);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(request, response, next){
	response.setHeader('Access-Control-Allow-Origin','*');
	response.setHeader('Access-Control-Allow-Methods','GET','POST');
	response.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,\Authorization');
	next();
});

/*app.get('/',function(request, response){
	response.sendFile(path.join(__dirname+'/../index.html'));
});*/

adminRouter.use(function(request, response,next){
	console.log(request.method, request.url);
	next();
});
adminRouter.get('/users', function(request, response){
	response.send('I show all the users');
});


adminRouter.use(function(request, response,next){
	console.log(request.method, request.url);
	next();
});

adminRouter.param('name',function(request, response,next, name){
	console.log(name);
	request.name = name;
	next();
});

adminRouter.get('/:name', function(request, response){
	response.send('Hello!' + request.name);
});

adminRouter.get('/', function(request, response){
	response.send('I am dashboard');
});

adminRouter.get('/posts', function(request, response){
	response.send('I show all posts');
});





loginRouter.get('/',function(req,res){
	res.send('This is login form');
});

loginRouter.post('/',function(req,res){
	res.send('POST for Login');
});

app.use('/admin',adminRouter);
app.use('/api',apiRouter);
app.use('/login',loginRouter);
app.get('*',function(request, response){
	console.log('comesHere');
	response.sendFile('index.html', { root: __dirname + "/../public" });//
});
app.listen(config.port);