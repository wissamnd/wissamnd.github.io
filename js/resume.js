

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict

var button = '<a href="https://www.youtube.com/watch?v=TcMBFSGVi1c" target="_blank" class="btn btn-light "> <i class="material-icons linkTrailer">tv</i>Trailer</a>';
var text = '<p class="card-text">2019 ‧ Fantasy/Sci-fi ‧ 3h 2m ‧ PG-13</p>';
var title = '<h5 class="card-title text-secondary">Avengers: Endgame</h5>';
var body = '<div class="card-body">'+title+text+button+'</div>';
var image = '<img class="card-img-top"  src="https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg" alt="Card image"></img>';
var card = '<div class="card bg-dark" style="width: 200px">'+image+body+'</div>';
var main = '<section class="movie-section d-inline-block">'+card+'</section>';
var column = '<div class="col-sm">'+main+'</div>';

function getButton(buttonUrl){
  return '<a href="'+buttonUrl+'" target="_blank" class="btn btn-light "> <i class="material-icons linkTrailer md-48">tv</i>Trailer</a>'
}
function getText(text){
  return '<p class="card-text">'+text+'</p>';
}
function getTitle(title){
  return '<h5 class="card-title text-secondary">'+title+'</h5>';
}
function getImage(Imageurl){
  return '<img class="card-img-top"  src="'+Imageurl+'" alt="Card image"></img>';
}
function getBody(title,text,buttonUrl){
  return '<div class="card-body">'+getTitle(title)+getText(text)+getButton(buttonUrl)+'</div>';
}
function getcard(Imageurl,title,text,buttonUrl){
  return '<div class="card bg-dark" style="width: 200px ;height:500px">'+getImage(Imageurl)+getBody(title,text,buttonUrl)+'</div>';
}
function BuildMain(Imageurl,title,text,buttonUrl){
  return '<section class="movie-section d-inline-block">'+getcard(Imageurl,title,text,buttonUrl)+'</section>';
}

// display movies
// var fruits, text, fLen, i;
// fruits = ["Banana", "Orange", "Apple", "Mango","e","m"];
// fLen = fruits.length;
// var text = "";
// for (i = 0; i < fLen; i++) {
//   text += main;
// }
// document.getElementById("demo").innerHTML = text;


async function getInfo(){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/discover/movie?api_key=d72426061641a42c9786e231acf12418&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_original_language=en",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  
  var r;
  var text = "";
  await $.ajax(settings).done(function (response) {
    console.log(response);
    r= response;
  });
  var results = []
  console.log(r['results']);
  results = await r['results'];
  
  for(i in results){
    // console.log(results[i]['title']);
    text = text +BuildMain('https://image.tmdb.org/t/p/w300'+results[i]['poster_path'],results[i]['title'],results[i]["release_date"],await getTrailer(results[i]['id']));
  }
  document.getElementById("demo").innerHTML = text;
}

getInfo();

getTrailer(429617);
async function getTrailer(id){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.themoviedb.org/3/movie/"+id+"/videos?language=en-US&api_key=d72426061641a42c9786e231acf12418",
    "method": "GET",
    "headers": {},
    "data": "{}"
  }
  var results = []; 
  await $.ajax(settings).done(function (response) {
    results = response['results'];
  });
  for(i in results){
    element = results[i];
    if(element['type']=="Trailer"){
      return 'https://www.youtube.com/watch?v='+element['key'];
    }
  }
}
