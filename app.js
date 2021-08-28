const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {

   var a = req.body.selector;
console.log(a);

    res.sendFile(__dirname + "/index.html");
});



app.post("/", function (req, res) {
    const apiKey = "";
    

    const selector = req.body.selector;
    var genre_id = 28;
     https.get("https://api.themoviedb.org/3/genre/movie/list?api_key="+apiKey+"&language=en-US",function (response) {
            
        response.on("data", function(data){
                
            const genre = JSON.parse(data);                
                
                genre.genres.forEach(item => {
                    if(item.name == selector) 
                        genre_id = item.id;
                 });
                 
                 const url = "https://api.themoviedb.org/3/discover/movie?api_key="+apiKey+"&with_genres="+genre_id;
        
                
        https.get(url, function (resp) {
                resp.on("data",function (data) {
                    const movies = JSON.parse(data);
                    
                    movies.results.forEach(movie => {
                        res.write("<p>"+movie.title+"</p>"); 
                    });
                    
                 res.send();

                });
            })
                
        });
    });

   

});


app.listen(3000, function () {
    console.log("App is running on port 3000!");
});



// API Key
// 923b1f458e968b246fb3a10fe2db1398

// https.get("https://api.themoviedb.org/3/genre/movie/list?api_key=923b1f458e968b246fb3a10fe2db1398&language=en-US", async function (response) {
            
//     await response.on("data", function(data){
//              const genre = JSON.parse(data);
//              const categories = [];
             
//              genre.genres.forEach(item => {
//                      categories.push(item.name);
//              });
//              console.log(categories);
             
//      });
//  });