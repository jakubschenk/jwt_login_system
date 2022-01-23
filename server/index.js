console.log('Started');
var appServer = "";
var db;
const SALT = 12
var jwt;


{
	var app = "";
	var express = "";
	var mysql = "";
	var bcrypt = "";

	try{
		express = require('express');
		app = express();
		mysql = require('mysql');
		bcrypt = require('bcrypt');
		appServer = require('http').Server(app);
		jwt = require('jsonwebtoken');
		const dotenv = require('dotenv').config({ path: "./server/.env"});
		const cors = require('cors');
		const bodyParser = require('body-parser');
		const cookieParser = require('cookie-parser');
		const session = require('express-session');

		app.use(express.json());
		app.use(express.static(__dirname + '../public/build'));
		app.use(cors({
		    origin: ["http://localhost:3000"],
		    methods: ["GET", "POST"],
				credentials: true
			})
		);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({
        key: "userId",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          expires: 60 * 60 * 24}
    }));
	} catch(err){
		if (err) throw err;
		console.log('1 or more dependecies didn\'t run properly');
	}

  try{
    appServer.listen(process.env.PORT || 8001, function (){
			console.log(`Server runing without problem - Running on port: >>>${appServer.address().port}<<<`);
			recreateConnection();  // Start session
		});
  } catch{
    console.log('Problem with connection');}


	function recreateConnection() {
		/*
		db = mysql.createConnection({
		  user: process.env.DB_USER,
		  host: process.env.DB_HOST,
			port: '/tmp/mysql.sock',
		  password: process.env.DB_PASSWORD,
		  database: process.env.DB_DTBS
		});*/
		db = mysql.createConnection(CLEARDB_DATABASE_URL);
		db.connect(function onConnect(err){
			if(err){
				console.log('Connection with database was not established: ', err);
				setTimeout(recreateConnection, 7000);
			} else
				console.log('Connection with database established');
		});
		db.on('error', function onError(err) {
			console.log('Database error', err);
			if(err.code == 'PROTOCOL_CONNECTION_LOST'){
				console.log('Connection with database was lost');
				recreateConnection();
			} else
				throw err;
		});
	}
}


app.post("/register", (req, res) => {
  const loginName = req.body.loginName;
  const password = req.body.password;

  let existence = "SELECT * FROM Users WHERE login_name = ?";
	db.query(existence, loginName, async function(err, result){
		if(err) console.log(err);
		else if(result.length === 0){
      bcrypt.hash(password, SALT, (err, hashedPassword) => {
        if(err) console.log(err);

        let insertation = "INSERT INTO users(login_name, password) VALUES (?, ?)";
        db.query(insertation, [loginName, hashedPassword], (err, result2) => {
            if(err) console.log(err);
						res.send({error: false, message: "Successfuly registered!!!"});
        });
      });
    } else {
			res.send({error: true, message: "Username is already used"});}
  });
});


app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });}
});

const verifyJWT = (req, res, next) => {
	const token = req.headers['x-access-token'];

	if(token){
		jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
			if(err){
				res.json({isAuthorized: false, message: "Editing token is not allowed" });
			} else {
				req.userId = decoded.id;
				next();
			}
		});
	}
}

app.get("/isAuthenticated", verifyJWT, (req, res) => {
	res.send("You are Authenticated")
});


app.post("/login", (req, res) => {
  const loginName = req.body.loginName;
  const password = req.body.password;

  let existence = "SELECT * FROM Users WHERE login_name = ?";
	db.query(existence, loginName, (err, result) => {
    if(err) console.log(err);

    if(result.length === 1){
			const id = result[0].id_u;
      bcrypt.compare(password, result[0].password, (error, isMatching) => {
        if(isMatching){
					 const token = jwt.sign({id}, process.env.TOKEN_SECRET, {
						 expiresIn: 300
					 });
          req.session.user = id;
					res.json({isAuthorized: true, token: token, userId: id})
          //res.send({userId: id});
        } else {
          res.json({isAuthorized: false, message: "Wrong password" });}
      });
    } else {
      res.json({isAuthorized: false, message: "Username does not match any account" });}
  });
});
