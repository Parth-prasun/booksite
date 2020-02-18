var express= require("express");
var app=express();
var mongoose= require("mongoose");
var bodyParser=require("body-parser");
var methodOverride = require("method-override");
var booklist=[];
var userlist=[];
var min = 0;
var temp = 0;
var i=0;
var j=0;
// var passport=require("passport");
// var localstrategy=require("passport-local");
//##########################################################################################################################################################

// PASSPORT CONFIGURATION
// app.use(require("express-session")({
//     secret: "Once again Rusty wins cutest dog!",
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
//###########################################################################################################################################################
// address for browser Open http://127.0.0.1:8081/   ## semanticcdn https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css
//##########################################################################################################################################################
mongoose.connect("mongodb://localhost/book_app");

var bookSchema = new mongoose.Schema({
   title: String,
 });

var logSchema = new mongoose.Schema({
    contributor: String,
    image: String,
    lists:[bookSchema],
    phone:String,
    email:String,
    genre:String,


    
});
var Log = mongoose.model("Log", logSchema);


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://"+host +":"+port);
});

// Log.create({
// 	contributor:"jimmy john",
// 	image:"data:image/jpeg;base64,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",
//     lists:[{title:"harry potter and the goblet of fire"},{title:"hunger games catching fire"}],
// 	phone:"1233211231",
// 	email:"jimmyjohn@gmail.com",
// 	genre:"action,crime"},function(err,clog){if(err){console.log(err)}else{console.log(clog)}
    																							
    																								
//     }
// );



app.get("/",function(req,res){
	res.redirect("/books2");

});

app.get("/books2", function(req,res){
	 Log.find({}, function(err, logs){
       if(err){
           console.log("ERROR!");
       } else {
          res.render("home2", {logs: logs}); 
       }
   });
	
});

app.get("/books/login",function(req,res){
	res.render("login");
});

app.post("/books/login",function(req,res){
	console.log(req.body)
	if(req.body.name=="parth"&&req.body.password=="parth")
		{res.redirect("/books");}
	else
		{res.redirect("login");}
	
})



app.get("/books", function(req,res){
	 Log.find({}, function(err, logs){
       if(err){
           console.log("ERROR!");
       } else {
          res.render("home", {logs: logs}); 
       }
   });
	
});

// for the glosarry list


// Log.find({},function(err,logs){
// logs.forEach(function(user){
// 	user.lists.forEach(function(books){
// 		booklist.push(books.title);
// 	})
// });
// console.log(booklist);
// booklist.sort();
// console.log(booklist);
// });

Log.find({},function(err,logs){
	logs.forEach(function(user){
		user.lists.forEach(function(books){
			booklist.push(books.title);
			userlist.push(user.id);
		})
	});
	for(i=0;i<booklist.length-1;i++){
		min=i;
		for(j=i+1;j<booklist.length;j++){
			if(booklist[j]<booklist[min])
				{min=j;}
		}
		booklist[temp]=booklist[min];
		booklist[min]=booklist[i];
		booklist[i]=booklist[temp];

		userlist[temp]=userlist[min];
		userlist[min]=userlist[i];
		userlist[i]=userlist[temp];
	}
})


//glossay route

app.get("/books/glossary2",function(req,res){
// 	Log.find({},function(err,logs){
//       logs.forEach(function(user){
// 	      user.lists.forEach(function(books){
// 		     booklist.push(books.title);
// 	})
// });
// console.log(booklist);
// booklist.sort();
// console.log(booklist);
// });
	res.render("glossary2",{booklist:booklist,userlist:userlist});
});



app.get("/books/glossary",function(req,res){
// 	Log.find({},function(err,logs){
//       logs.forEach(function(user){
// 	      user.lists.forEach(function(books){
// 		     booklist.push(books.title);
// 	})
// });
// console.log(booklist);
// booklist.sort();
// console.log(booklist);
// });
	res.render("glossary",{booklist:booklist,userlist:userlist});
});






app.get("/books/new", function(req, res){
    res.render("new");
});

app.post("/books", function(req, res){
    // create blog
    console.log(req.body);
    console.log("===========")
    console.log(req.body);
    Log.create({contributor:req.body.name,
    			image:req.body.imageurl,
    			lists:[{title:req.body.book1},{title:req.body.book2},{title:req.body.book3},{title:req.body.book4},{title:req.body.book5},{title:req.body.book6},{title:req.body.book7},{title:req.body.book8},{title:req.body.book9},{title:req.body.book10}],
    			phone:req.body.contact,
    			email:req.body.mail,
    			genre:req.body.gen}, function(err, newLog){
        if(err){
            res.render("new");
        } else {
            //then, redirect to the index
            res.redirect("/books");
        }
    });
    // #############################

//     Log.find({},function(err,logs){
// logs.forEach(function(user){
// 	user.lists.forEach(function(books){
// 		booklist.push(books.title);
// 	})
// });
// console.log(booklist);
// booklist.sort();
// console.log(booklist);
// });
});    


app.get("/books/:id", function(req, res){
	
   Log.findById(req.params.id, function(err, foundLog){
       if(err){
           res.redirect("/books");
       } else {
           res.render("show", {log: foundLog});
       }
   })
});

app.get("/books2/:id", function(req, res){
	
   Log.findById(req.params.id, function(err, foundLog){
       if(err){
           res.redirect("/books");
       } else {
           res.render("show2", {log: foundLog});
       }
   })
});

// EDIT ROUTE
app.get("/books/:id/edit", function(req, res){
    Log.findById(req.params.id, function(err, foundLog){
        if(err){
            res.redirect("/books");
        } else {
            res.render("edit", {log: foundLog});
        }
    });
})


// UPDATE ROUTE
app.put("/books/:id", function(req, res){
    // req.body.log.body = req.sanitize(req.body.blog.body)
   Log.findByIdAndUpdate(req.params.id,{contributor:req.body.name,
    			image:req.body.imageurl,
    			lists:[{title:req.body.book1},{title:req.body.book2},{title:req.body.book3},{title:req.body.book4},{title:req.body.book5},{title:req.body.book6},{title:req.body.book7},{title:req.body.book8},{title:req.body.book9},{title:req.body.book10}],
    			phone:req.body.contact,
    			email:req.body.mail,
    			genre:req.body.gen}, function(err, updatedLog){
      if(err){
          res.redirect("/books");
      }  else {
          res.redirect("/books/" + req.params.id);
      }
   });
});

// DELETE ROUTE
app.delete("/books/:id", function(req, res){
   //destroy blog
   Log.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/books");
       } else {
           res.redirect("/books");
       }
   })
   res.redirect("/books");
});








