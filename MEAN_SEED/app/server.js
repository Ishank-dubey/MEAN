var express = require("express"),
app = express(),
path = require("path"),
adminRouter = express.Router(),
apiRouter = express.Router(),
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




/*var Schema = mongoose.Schema;
var UserSchema = new Schema({
	name:String
});
var Model = mongoose.model("UserSchema",UserSchema);

UserSchema.post('save',function(document){
	Model.find(function (err, kittens) {
		  if (err) return console.error(err);
		  console.log(kittens);
		});	
});

var aModel = new Model({name:'ishank'});
aModel.save();
var aPet = new Model({name:'3bannu'});
aPet.save();

*/
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(request, response, next){
	response.setHeader('Access-Control-Allow-Origin','*');
	response.setHeader('Access-Control-Allow-Methods','GET','POST');
	response.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type,\Authorization');
	next();
});

app.get('/',function(request, response){
	response.sendFile(path.join(__dirname+'/index.html'));
});

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

apiRouter.use(function(request, response, next){
	var aToken = request.body.token || request.param('token') || request.headers['x-access-token'];
	
	if(aToken){
		jwt.verify(aToken, aSec, function(err, decoded) {
			if(err){
				response.status(403).send({
					message:'not authenticated'
				});
			}else{
				request.decoded = decoded;
				next();
			}
		});
	}else{
		response.status(403).send({
			message:'provide authentication'
		})
	}
});

apiRouter.get('/me',function(request, response){
	response.send(request.decoded);
});

apiRouter.post('/authenticate',function(request,response){
	User.findOne({
		username:request.body.username
	}).select('name username password').exec(function(error, doc){
	if(error){
		response.send(error);
	}else if(!doc){
		response.json({message:'User not found'});
	}else if(doc){
		var validPassword = doc.comparePassword(request.body.password);
		if(!validPassword){
			response.json({message:'Wrong Passcode'});
		}else{
			var token = jwt.sign({
				name: doc.name,
				username: doc.username
			},aSec,{ expiresIn: '24h' });
			response.json({token:token});
		}
	}	
	});
});	
apiRouter.get('/',function(req, res){
	res.json({message:'this is API!'});
});

apiRouter.get('/users',function(req, res){
	/*res.json({message:'this is API for the Users!'});*/
	User.find(function(error,users){
		if(error)res.send(error);
		res.json(users);
	});
});

apiRouter.get('/users/:user_name',function(request, response){
	User.find({username:request.params.user_name},function(error, doc){
		response.json(doc);
	});
});

apiRouter.delete('/users/:user_name',function(request, response){
	User.remove({username:request.params.user_name},function(error, doc){
		if(error)response.send(error);
		
		response.json({message:'deleted'});
	});
});

apiRouter.put('/users/:user_name',function(request, response){
	
	//User.findById could also be used if id is known
	User.find({username:request.params.user_name},function(error, doc){
		if(request.body.name) doc[0].name = request.body.name;
		if(request.body.username) doc[0].username = request.body.username;
		if(request.body.password) doc[0].password = request.body.password;
		
		doc[0].save(function(error){
			if(error)response.send(error);
			
			response.json({message:'Updated'});
		});
		
	});
});

apiRouter.post('/users',function(req, res){
	var aUser = new User();
	aUser.username = req.body.username;
	aUser.password = req.body.password;
	aUser.name = req.body.name;
	console.log(aUser.name);
	aUser.save('save',function(error){
		if(error){
			if(error.code==11000){
				return res.json({message:"User Exists"});
			}else{
				return res.send(error);
			}
		}
		res.json({message:'Created'});
	})
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
app.listen(port);