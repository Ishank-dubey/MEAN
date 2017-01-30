var User = require('../models/UserModel'),
jwt = require('jsonwebtoken'),
config = require('../config'),
secret = config.port;

module.exports = function(app, express){
	var apiRouter = express.Router();
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

	apiRouter.post('/authenticate',function(request,response){
		User.findOne({ 
			username:request.body.username
		}).select('name username password').exec(function(error, doc){
		if(error){
			response.status(403).send(error);
		}else if(!doc){
			response.status(403).json({message:'User not found'});
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

	apiRouter.route('/users').get(function(request, response){
		User.find(function(err, users){
			if(err)response.send(err);
			else
				response.send(users);
		});
	});

	apiRouter.get('/me',function(request, response){
		response.send(request.decoded);
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
	
	return apiRouter;
}