var express=require("express");
var app=express();
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;
var bodyParser=require("body-parser");
var methodOverride=require("method-override");
var Campground= require("./models/campground");
var Comment=require("./models/comment");
var passport=require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User= require("./models/user");
var expressSession=require("express-session");
var flash=require("connect-flash");
var seedDB=require("./seeds");

var commentRoutes        = require("./routes/comments"),
    campgroundRoutes     = require("./routes/campgrounds"),
    indexRoutes          = require("./routes/index");
  


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
seedDB();
//passport configuration
app.use(expressSession({
    secret:"Rusty is the best and cutest dog in the world",
    resave:false,
    saveUninitialized:false
    
}));
app.use(passport.initialize());
app.use(passport.session());    
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
})
  
app.use("/",indexRoutes);
app.use("/campground",campgroundRoutes);
app.use("/campground/:id/comment",commentRoutes);




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("service has started");
})