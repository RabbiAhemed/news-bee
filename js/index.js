const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.data.news_category));
};

const showCategories = (categories) => {
  const categoriesSection = document.getElementById("categories-container");

  categories.forEach((category) => {
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
    .then((data) => console.log(data.data));
};

// const displayDetails = (post) => {
//   console.log(post);
//   const postDetail = document.getElementById("post-details");
//   const div = document.createElement("div");
//   div.classList.add("card");
//   div.innerHTML = `
//   <div class="card-body">
//     <h5 class="card-title">${post}</h5>
//   </div>`;
//   postDetail.appendChild(div);
//   //   console.log(postDetail);
// };

loadCategories();
