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
  // console.log(categories);

  // console.log(typeof categories);

  // show number of contents in that category
  const lengthOfArray = [];
  const arrayLength = categories.map((category) =>
    lengthOfArray.push(category)
  );
  // console.log(arrayLength);
  const resultNumber = document.getElementById("result-number");
  resultNumber.innerHTML = ``;
  const p = document.createElement("p");
  p.innerHTML = `Total Number of Matching Content : ${arrayLength.length}`;
  resultNumber.appendChild(p);
  //
  const categoryDetailsContainer = document.getElementById(
    "category-details-container"
  );
  categoryDetailsContainer.innerHTML = "";
  // check if category has data inside
  if (categories.length == 0) {
    resultNumber.innerHTML = ``;
    categoryDetailsContainer.classList.add("text-center");
    categoryDetailsContainer.textContent = "No Results Found";
    noResult.innerHTML = ``;
  } else {
    console.log("found");
    for (const category of categories) {
      // No Result Found

      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
          <div onclick="loadDetail(${category._id})" class="card h-100">
                  <div class="card-body">
                      <h5 class="card-title">${category.title}</h5>
                      <p class="card-text">T${category.details.slice(
                        0,
                        150
                      )}</p>
                  </div>
              </div>`;
      categoryDetailsContainer.appendChild(div);
    }
  }

  //
};

// Display Category Result

/* const displayResult = (items) => {
  const categoryDetailsContainer = document.getElementById(
    "category-details-container"
  );
  // clear page/result after one search and for next search
  categoryDetailsContainer.innerHTML = "";

  if (items.length === 0) {
    const noResult = document.getElementById("no-result");
    categoryDetailsContainer.textContent = "No Results Found";
    noResult.innerHTML = ``;
  }

  items.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div onclick="loadDetail(${item._id})" class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">T${item.details.slice(0, 150)}</p>
                </div>
            </div>`;
    categoryDetailsContainer.appendChild(div);
  });
}; */

loadCategories();
