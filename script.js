const cardContainer = document.getElementById('card-container');
const resultSection = document.getElementById('result');
const likedCatsDiv = document.getElementById('liked-cats');

const totalCats = 10;
let currentIndex = 0;
let likedCats = [];
let catImages = [];

function showCat(index) {
  cardContainer.innerHTML = '';
  const img = document.createElement('img');
  img.src = catImages[index];
  img.alt = 'Cat Image';

  const likeBtn = document.createElement('button');
  likeBtn.textContent = '👍 Like';
  likeBtn.onclick = () => {
    likedCats.push(catImages[index]);
    nextCat();
  };

  const dislikeBtn = document.createElement('button');
  dislikeBtn.textContent = '👎 Dislike';
  dislikeBtn.onclick = nextCat;

  cardContainer.appendChild(img);
  cardContainer.appendChild(likeBtn);
  cardContainer.appendChild(dislikeBtn);
}

function nextCat() {
  currentIndex++;
  if (currentIndex < catImages.length) {
    showCat(currentIndex);
  } else {
    showResults();
  }
}

function showResults() {
  cardContainer.classList.add('hidden');
  resultSection.classList.remove('hidden');
  likedCats.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'Liked Cat';
    likedCatsDiv.appendChild(img);
  });
}

// Fetch cat images
function loadCats() {
  for (let i = 0; i < totalCats; i++) {
    catImages.push(`https://cataas.com/cat?unique=${i}`);
  }
  showCat(currentIndex);
}

loadCats();
