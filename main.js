let buttonsArray = document.querySelectorAll(".trigger");
let allButton = document.querySelector(".triggerAll");
let items = [];
let categories = [];
const imageGrid = document.querySelector("#imgGrid");
const navbar = document.querySelector(".navbar-nav");

async function getData() {
  const response = await fetch("./images.json");
  const data = await response.json();
  // create a div for each item and add event listeners
  data.forEach(obj => {
    //   Create div to go into imgGrid
    const divNode = document.createElement("div");
    divNode.innerHTML = `
             <img class='thumbnail img-fluid img-thumbnail' src='${
               obj.imgsrc
             }'/>
            <div class='img-info'>
                <h6 class='art-title'><a href='#'>${obj.title}</a></h6>
                <p><a href='#' class='trigger'>${obj.category}</a></p>
            </div>
      `;

    //add classes and attribute to div
    const classes = `${
      obj.category
    } col-sm-6 col-md-4 col-lg-3 hovereffect art-item`;
    divNode.className = classes;

    divNode.setAttribute("data-display", "true");

    // add event listener to the thumbnail
    const thumbnail = divNode.querySelector(".thumbnail");
    thumbnail.addEventListener("click", () => {
      $(".modal-body").empty();
      $(".modal-body").append(`<img class="img-fluid" src="${obj.imgsrc}" />`);
      $("#myModal").modal({ show: true });
    });
    // add event listen to the item title
    const itemBtn = divNode.querySelector(".art-title");
    itemBtn.addEventListener("click", () => {
      $(".modal-body").empty();
      $(".modal-body").append(`<img class="img-fluid" src="${obj.imgsrc}" />`);
      $("#myModal").modal({ show: true });
    });

    //add event listener to te category
    const categoryBtn = divNode.querySelector(".trigger");
    categoryBtn.addEventListener("click", () => {
      items.forEach(img => {
        if (img.classList.contains(obj.category)) {
          img.setAttribute("data-display", "true");
        } else {
          img.setAttribute("data-display", "false");
        }
      });
    });
    imageGrid.appendChild(divNode);
    items.push(divNode);

    if (!categories.includes(obj.category)) {
      categories.push(obj.category);
    }
  });

  categories.sort().forEach(cat => {
    const li = document.createElement("li");
    li.innerHTML = cat;
    const liClasses = "trigger nav-item pl-3";
    li.className = liClasses;
    navbar.appendChild(li);
    li.addEventListener("click", () => {
      items.forEach(img => {
        if (img.classList.contains(cat)) {
          img.setAttribute("data-display", "true");
        } else {
          img.setAttribute("data-display", "false");
        }
      });
    });
  });
}
// call the Json data and fills the imgGrid
getData();

// navbar event listener
allButton.addEventListener("click", () => {
  items.forEach(img => {
    img.setAttribute("data-display", "true");
  });
});
