"use strict";

function showLoader(show) {
  let loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}

const url = "https://helleflohr.dk/wordpress/wp-json/wp/v2/posts?_embed&categories=13&per_page=99";

let _filmPosts = [];

function getMovies() {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (posts) {
      shuffle(posts);
      console.log(posts);
      _filmPosts = posts;
      appendPosts(posts);
      setTimeout(function () {
        showLoader(false);
      }, 200);
    });
};

getMovies();

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function appendPosts(posts) {
  let htmlTemplate = "";
  for (let post of posts) {
    htmlTemplate += `
    <article class="${post.acf.category}">
    
    <img src="${getFeaturedImageUrl(post)}">
    <h2> ${post.title.rendered} (${post.acf.year})</h2>
    <button class="btn" onclick="show('#showSection${post.id}')">Se mere</button>
    <section id="showSection${post.id}" style="display:none;">
    <p><b>Beskrivelse:</b> ${post.acf.description} </p>
  <p><b>Genrer:</b> ${post.acf.category} </p>
  <b>Trailer:</b><br>
  <iframe src="${post.acf.trailer} align="bottom"></iframe>
  </section>
     </article>`
  }

  document.querySelector('#movie-container').innerHTML = htmlTemplate;
}

// Show section with movie info
function show(movie) {

  let show = document.querySelector(movie);
  if (show.style.display === "none") {
    show.style.display = "block";
  } else {
    show.style.display = "none";
  }


}

// get the featured image url
function getFeaturedImageUrl(post) {
  let imageUrl = "";
  if (post._embedded['wp:featuredmedia']) {
    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  }
  return imageUrl;
}

/*
Search functionality: find objects by given searchValue
*/
function search(searchValue) {
  searchValue = searchValue.toLowerCase();
  console.log(searchValue);

  let filteredPosts = [];

  for (let posts of _filmPosts) {

    let name = posts.title.rendered.toLowerCase();
    let year = posts.acf.year.toLowerCase();
    let category = posts.acf.category.toLowerCase();

    if (name.includes(searchValue)) {
      filteredPosts.push(posts);
    } else if (year.includes(searchValue)) {
      filteredPosts.push(posts);
    }
  }

  appendPosts(filteredPosts);
}

// Filter the different movies by genres

function filter() {
  console.log("Hello Disney");
  let uncheked = '';
  let unchekedAll = true;
  if (!document.getElementById("gyser").checked)
    uncheked += '.Gyser,';
  else unchekedAll = false;
  if (!document.getElementById("action").checked)
    uncheked += '.Action,';
  else unchekedAll = false;
  if (!document.querySelector("#animation").checked)
    uncheked += '.Animation,';
  else unchekedAll = false;
  if (!document.getElementById("romantik").checked)
    uncheked += '.Romantik,';
  else unchekedAll = false;
  if (!document.getElementById("danskefilm").checked)
    uncheked += '.Danske,';
  else unchekedAll = false;
  if (!document.querySelector("#boernefilm").checked)
    uncheked += '.Børnefilm,';
  else unchekedAll = false;
  if (!document.getElementById("dokumentar").checked)
    uncheked += '.Dokumentar,';
  else unchekedAll = false;
  if (!document.getElementById("drama").checked)
    uncheked += '.Drama,';
  else unchekedAll = false;
  if (!document.getElementById("eventyr").checked)
    uncheked += '.Eventyr,';
  else unchekedAll = false;
  if (!document.getElementById("komedie").checked)
    uncheked += '.Komedie,';
  else unchekedAll = false;
  if (!document.getElementById("krigsfilm").checked)
    uncheked += '.Krigsfilm,';
  else unchekedAll = false;
  if (!document.getElementById("krimi").checked)
    uncheked += '.Krimi,';
  else unchekedAll = false;
  if (!document.getElementById("sifi").checked)
    uncheked += '.SiFi,';
  else unchekedAll = false;
  if (!document.getElementById("thriller").checked)
    uncheked += '.Thriller,';
  else unchekedAll = false;


  uncheked = uncheked.slice(0, -1);

  console.log(uncheked);
  appendPosts(_filmPosts);

  if (unchekedAll == false) {
    let movies = document.querySelectorAll(uncheked);
    for (let movie of movies) {
      movie.style.display = "none";
    }
  }
}