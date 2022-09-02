const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.data.news_category));
};

const showCategories = (categories) => {
  const categoriesSection = document.getElementById("categories-container");

  categories.filter((category) => {
    // console.log(category.category_id);
    const div = document.createElement("div");
    div.innerHTML = `
    <div onclick="loadCategoryDetail(${category.category_id})">

                <p class="mx-4">${category.category_name}</p>
            
        </div>`;
    categoriesSection.appendChild(div);
  });
};

const loadCategoryDetail = (category_id) => {
  //   console.log(category_id);
  const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayResult(data.data));
  //   .then((data) => displayDetails(data.data[0]));
};

const displayResult = (items) => {
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
    console.log(items.length);
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
};

loadCategories();
