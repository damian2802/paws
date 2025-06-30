const cardContainer = document.getElementById('card-container');
const resultSection = document.getElementById('result');
const likedCatsDiv = document.getElementById('liked-cats');
const totalCats = 10;

let currentIndex = 0;
let catImages = [];
let likedCats = JSON.parse(localStorage.getItem('likedCats')) || [];
let username = localStorage.getItem('name');

if (username !== null) {
  // Display welcome message with username
  document.getElementById('welcome-section').innerHTML = `
    <div class="row">
    <div class="col-8"><h2>Welcome, ${username}!</h2></div>
    <div class="col-auto"><button id="logout" class="btn btn-primary">LogOut</button></div>
    </div>`;

  if (localStorage.getItem('likedCats') !== null) {
    // If there are liked cats in localStorage, show results directly
    showResults();
  } else {
    // If no liked cats, load cats and show the selection section
    loadCats();
    document.getElementById('cat-select-section').style.display = 'block';
    showCat(currentIndex);
  }

  // Logout function clears localStorage and reloads the page
  document.getElementById('logout').addEventListener('click', function() {
    localStorage.clear();
    location.reload();
  });
  
} else {
  // if localStrage is empty show User name form
  document.getElementById('welcome-section').innerHTML = `
    <div class="row">
      <h2>Welcome to Paws and Preference!</h2>
    </div>
    <form id="name-form">
      <div class="row">
        <div class="col-lg-2 col-sm-12 mb-2">
          <label class="form-label">Enter Your Name: </label>
        </div>
        <div class="col-lg-8 col-sm-12 mb-2">
          <input type="text" id="name" class="form-control border border-2 border-dark" placeholder="Your Name" required>
        </div>
        <div class="col-lg-2 col-sm-12 mb-2">
          <button type="submit" id="submit" class="btn btn-primary">Let's Get Start</button>
        </div>
      </div>
    </form>
  
  `;

  // Submit button to save user name in localStorage
  document.getElementById('submit').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    if (name === '') {
      alert('Please enter your name.');
      return;
    } else {
      localStorage.setItem('name', name);
    }
  });
}

// Swipe functionality using Hammer.js
var square = document.querySelector('.square');
var manager = new Hammer.Manager(square);
var Swipe = new Hammer.Swipe();
manager.add(Swipe);

manager.on('swipe', function(e) {
  var direction = e.offsetDirection;
  if (direction === 4) {
    likedCats.push(catImages[currentIndex]);
    nextCat();
  } else if (direction === 2) {
    nextCat();
  }
});

// Fetch cat images
function loadCats() {
  for (let i = 0; i < totalCats; i++) {
    fetch('https://cataas.com/cat?json=true')
      .then(response => response.json())
      .then(data => {
        catImages.push(`https://cataas.com/cat/${data.id}?width=600&height=400`);
        if (catImages.length === totalCats) {
          showCat(currentIndex);
        }
      })
      .catch(error => console.error('Error fetching cat image:', error));
  }
}

// Display next cat image
function nextCat() {
  currentIndex++;
  if (currentIndex < catImages.length) {
    console.log('Current Index:', currentIndex);
    showCat(currentIndex);
  } else {
    localStorage.setItem('likedCats', JSON.stringify(likedCats));
    showResults();
  }
}

// Display current cat image
function showCat(index) {
  document.getElementById('cat-images').src = catImages[index];
}

// After user selection show liked cats
function showResults() {
  console.log(likedCats);
  console.log(localStorage.getItem('likedCats'));
  document.getElementById('cat-select-section').style.display = 'none';
  document.getElementById('liked-cats-section').style.display = 'block';
  const likedCatsDiv = document.getElementById('liked-cats');
  
  likedCats.forEach((cat, index) => {
    const indicators = document.getElementById('corousel-indicators');
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-bs-target', '#carouselExampleIndicators');
    button.setAttribute('data-bs-slide-to', index); 
    button.setAttribute('aria-label', `Slide ${index + 1}`);

    if (index === 0) {
      button.className = 'active';
      button.setAttribute('aria-current', 'true');
    }

    indicators.appendChild(button);

    const div = document.createElement('div');
    div.className = 'carousel-item' + (index === 0 ? ' active' : ''); // Set first item active
    likedCatsDiv.appendChild(div);
  
    const img = document.createElement('img');
    img.src = cat;
    img.className = 'd-block w-100';
    img.alt = `Liked Cat ${index + 1}`;
    div.appendChild(img);
  });
}




