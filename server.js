//import All Modules
//if we Required
var express=require('express');
var http=require('http');
var mysql=require('mysql');
var app=express();
var bodyparser=require('body-parser');
var dateformat=require('dateformat');

//parse all from data
app.use(bodyparser.urlencoded({extended : true}));

//Dateformat
var now=new Date();

//ejs Engine - template Parsing

app.set('view engine','ejs');

//import js and css files

app.use('/js',express.static(__dirname+'/node_modules/bootstrap/dist/js'));
app.use('/js',express.static(__dirname+'/node_modules/jquery/dist'));
app.use('/js',express.static(__dirname+'/node_modules/tether/dist/js'));

app.use('/css',express.static(__dirname+'/node_modules/bootstrap/dist/css'));

//Admin JS and css
app.use('/js',express.static(__dirname+'/node_modules/adminlte/dist/js'));
app.use('/js',express.static(__dirname+'/node_modules/slimScroll'));
app.use('/js',express.static(__dirname+'/node_modules/fastclick'));

app.use('/css',express.static(__dirname+'/node_modules/adminlte/dist/css'));


//Database Connection string

const con=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"root",
	database:"DCargo"
});


//Global site and Base Url
const siteTitle="DCARGO";
const baseUrl="http://localhost:4000/";
const dashUrl="http://localhost:4000/Admin";

//First Page - Index Page
app.get('/',function(req,res){
	//get event list
		res.render('pages/index',{
		siteTitle:siteTitle,
		pageTitle:"Login",
		items:'result'
	});	
});

//First Page - Index Page
app.get('/Admin',function(req,res){
	//get event list
		res.render('pages/dashboard',{
			siteTitle:siteTitle,
		pageTitle:"Dashboard",
		items:'result'
	});	
});


//Login Authnetication
app.post('/admin/login',function(req,res){
	
	var qry = " select count(*) as cnt from tbl_login ";
	qry += " where username='"+req.body.luser+"' and ";
	qry +=" password='"+req.body.lpassword+"'";

	con.query(qry,function(err,result){
		console.log(result);
		if(err)		console.log(err);
	else if(result[0].cnt>0)
		res.redirect(dashUrl);		
	else
		res.redirect(baseUrl);
	});
	
});



//First Page - Index Page
/* app.get('/event/add',function(req,res){
	//get event list
		res.render('pages/add-user',{
		siteTitle:siteTitle,
		pageTitle:"Add User",
		items:'result'
	});	
});

//Add User - Post
app.post('/event/add',function(req,res){
	
	var qry = " insert into tbl_sample(sname,age,dob) values("
	qry +="'"+req.body.sname+"',";
	qry +="'"+req.body.sage+"',";
	qry +="'"+dateformat(req.body.sdob,"yyyy-mm-dd")+"')";

	//console.log(qry);
	con.query(qry,function(err,result){
		if(err)		console.log(err);
	else
		res.redirect(baseUrl);		
	});
	
});


//Edit user - get
app.get('/event/edit/:id',function(req,res){
	
	con.query("select * from tbl_sample where id='"+req.params.id+"'",function(err,result){
		result[0].dob=dateformat(result[0].dob,"yyyy-mm-dd");
	res.render('pages/edit-user',{
		siteTitle:siteTitle,
		pageTitle:"Editing user:"+result[0].sname,
		item:result
	});	
	//console.log(result);

	});	
});

//Edit user - Post
app.post('/event/edit/:id',function(req,res){
	
	var qry = " update tbl_sample set "
	qry +="sname= '"+req.body.sname+"',";
	qry +="age= '"+req.body.sage+"',";
	qry +="dob= '"+dateformat(req.body.sdob,"yyyy-mm-dd")+"' where id='"+req.body.sid+"'";

	//console.log(qry);
	con.query(qry,function(err,result){
		if(result.affectedRows){	res.redirect(baseUrl); }
		else	
			console.log(err);
	});
});


//Delete user - get
app.get('/event/delete/:sid',function(req,res){
	
	con.query("Delete from tbl_sample where id='"+req.params.sid+"'",function(err,result){
	 if(result.affectedRows)
	 	{	res.redirect(baseUrl); }
		
	});	
}); 
*/


//connect the server
var server=app.listen(4000,function(){console.log('Server started on 4000....');})




