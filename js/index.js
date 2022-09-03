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

// spinner
const toggleSpinner = (isLoading) => {
  const spinnerSection = document.getElementById("spinner");
  if (isLoading) {
    spinnerSection.classList.remove("d-none");
  } else {
    spinnerSection.classList.add("d-none");
  }
};
// toggle view section
const toggleViewSection = (isAvailable) => {
  const viewSection = document.getElementById("view-section");
  if (isAvailable) {
    viewSection.classList.remove("d-none");
  } else {
    viewSection.classList.add("d-none");
  }
};

// Load Categories Details
const loadCategoryDetail = (category_id) => {
  toggleSpinner(true);
  toggleViewSection(true);
  const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoryDetails(data.data))
    .catch((error) => console.log(error));
};

const displayCategoryDetails = (categories) => {
  // console.log(categories);

  categories.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  // console.log(categories);
  const noResult = document.getElementById("no-result");
  // show number of contents in that category
  const lengthOfArray = [];
  const arrayLength = categories.map((category) =>
    lengthOfArray.push(category)
  );
  const resultNumber = document.getElementById("result-number");
  resultNumber.classList.add("bg-light");
  resultNumber.classList.add("my-3");
  resultNumber.innerHTML = ``;
  const p = document.createElement("p");
  p.innerHTML = `${arrayLength.length} news found in this category`;
  resultNumber.appendChild(p);
  //
  // Get Category Details Container
  const categoryDetailsContainer = document.getElementById(
    "category-details-container"
  );

  categoryDetailsContainer.innerHTML = "";
  // check if category has data inside and show no data found
  if (categories.length == 0) {
    toggleViewSection(false);
    // resultNumber.innerHTML = ``;
    categoryDetailsContainer.classList.add("text-center");
    categoryDetailsContainer.innerHTML = `
    <h1 class="fw-bold text-info fst-italic"> No News Found In This Category</h1>
    `;
    noResult.innerHTML = ``;
  }
  //
  else {
    toggleViewSection(true);
    /* const viewSection = document.getElementById("view-section");
    const div = document.createElement("div");
    viewSection.innerHTML = ``;
    div.classList.add("d-flex");
    div.classList.add("justify-content-around");
    div.classList.add("align-items-center");
    div.innerHTML = `
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-bs-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Default
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something else here</a>
    </div
    </div>
    <div class="d-flex">
    <button type="button" class="btn btn-primary mx-1 fw-bold">Today's Pick</button>
    <button type="button" class="btn btn-outline-primary mx-1 fw-bold">Trending</button>
    </div>
    
    `;
    viewSection.appendChild(div); */
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
        category?.author?.name
      }</small></span>
      </div>
      <div><span class="card-text fst-italic"><small class="text-muted">Views:${
        category.total_view
      }</small></span></div>
      <div><button onclick="loadNewsDetail('${
        category._id
      }')" type="button" class="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#newsDetailModal">View</button>
      </div>
      </div>
      </div>
  </div>
</div>
  `;
      categoryDetailsContainer.appendChild(div);
    }
  }
  toggleSpinner(false);
};

const loadNewsDetail = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data[0]))
    .catch((error) => console.log(error));
};

const displayNewsDetails = (news) => {
  const modalBody = document.getElementById("modal");
  modalBody.innerHTML = ``;
  const div = document.createElement("div");
  div.classList.add("modal-content");
  div.innerHTML = `

      <div class="modal-header">
        <h5 class="" id="exampleModalLongTitle">${news.title}</h5>
        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p class="fw-bold">${news.details}</p>
        <p></p>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
      `;
  modalBody.appendChild(div);
};

loadCategories();
