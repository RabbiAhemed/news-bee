// Load Categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.data.news_category));
};
// Show Categories
const showCategories = (categories) => {
  const categoriesSection = document.getElementById("categories-container");

  categories.filter((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div onclick="loadCategoryDetail(${category.category_id})">

                <p class="mx-4 fw-bold">${category.category_name}</p>
            
        </div>`;
    categoriesSection.appendChild(div);
  });
};

// Load Categories Details
const loadCategoryDetail = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoryDetails(data.data))
    .catch((error) => console.log(error));
};

const displayCategoryDetails = (categories) => {
  const noResult = document.getElementById("no-result");

  // show number of contents in that category
  const lengthOfArray = [];
  const arrayLength = categories.map((category) =>
    lengthOfArray.push(category)
  );
  const resultNumber = document.getElementById("result-number");
  resultNumber.innerHTML = ``;
  const p = document.createElement("p");
  p.innerHTML = `Total Number of Matching Content : ${arrayLength.length}`;
  resultNumber.appendChild(p);
  //
  // Get Category Details Container
  const categoryDetailsContainer = document.getElementById(
    "category-details-container"
  );

  categoryDetailsContainer.innerHTML = "";
  // check if category has data inside and show no data found
  if (categories.length == 0) {
    resultNumber.innerHTML = ``;
    categoryDetailsContainer.classList.add("text-center");
    categoryDetailsContainer.textContent = "No Results Found";
    noResult.innerHTML = ``;
  }
  //
  else {
    for (const category of categories) {
      const div = document.createElement("div");
      div.classList.add("mb-3");
      div.classList.add("card");
      div.innerHTML = `
  <div class="row g-0 p-2 ">
  <div class="col-md-4">
    <img src="${category.thumbnail_url}" class="img-fluid " alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${category.title}</h5>
      <p class="card-text">${category.details.slice(0, 150).concat("...")}</p>
      <div class="card-bottom">
      <div class="author-info">
      <img src="${
        category.author.img
      }" class=" author-img rounded-circle" alt="author..."></img>
      <span class="card-text fst-italic"><small class="text-muted">${
        category.author.name
      }</small></span>
      </div>
      
      <div><span class="card-text fst-italic"><small class="text-muted">Views:${
        category.total_view
      }</small></span></div>
      
      <div><button type="button" class="btn btn-info">Info</button>
      </div>
      
      
      </div>
     
     
      </div>

  </div>
</div>

  `;

      categoryDetailsContainer.appendChild(div);
    }
  }
};

const loadNewsDetail = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/{news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data));
};
loadNewsDetail();

loadCategories();
