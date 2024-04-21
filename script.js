// Get the category name from the URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

// Fetch paintings for the category
fetch('paintings.json')
 .then(response => response.json())
 .then(data => {
    const paintingsList = document.getElementById('paintings-list');
    data.forEach(painting => {
      if (painting.category === category) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="painting.html?id=${painting.id}">${painting.title}</a>`;
        paintingsList.appendChild(li);
      }
    });
  });

// Handle search form submission
const searchForm = document.querySelector('nav form');
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchForm.querySelector('input[type="text"]').value;
  window.location.href = `category.html?category=${searchTerm}`;
});

// Handle category link clicks
const categoryLinks = document.querySelectorAll('nav ul li a');
categoryLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = event.target.getAttribute('href');
  });
});