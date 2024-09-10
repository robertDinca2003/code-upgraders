const blogSection = document.querySelector(".blog-section");
const orderSelect = document.querySelector(".byorder");
const categorySelect = document.querySelector(".bycategory");
const btnLoad = document.querySelector(".loadBtn");
const headBtn = document.querySelector(".headBtn");

let contor = 3;
var collectionRef = db.collection("blogs");
// collectionRef.get().then((blogs) => {
//   blogs.forEach((blog) => {
//     if (blog.id != decodeURI(location.pathname.split("/").pop())) {
//       createBlog(blog);
//     }
//   });
// });
if (headBtn != null) headBtn.style.pointerEvents = "none";
auth.onAuthStateChanged(async (user) => {
  if (user) {
    console.log("logged in");
    if (headBtn != null) headBtn.innerHTML = "Write a blog";
  } else {
    console.log("not login");
    if (headBtn != null) headBtn.innerHTML = "Random Blog";
    const initSize = await collectionRef.get();
    console.log(initSize.size);
    const number = Math.floor(Math.random() * initSize.size);
    console.log(initSize.docs[number].data().url);
    if (headBtn != null)
      headBtn.setAttribute("href", initSize.docs[number].data().url);
  }
  if (headBtn != null) headBtn.style.pointerEvents = "initial";
});

var sortedDB = collectionRef.orderBy("id");

sortedDB
  .limit(contor)
  .get()
  .then((blogs) => {
    blogs.forEach((blog) => {
      if (blog.id != decodeURI(location.pathname.split("/").pop())) {
        createBlog(blog);
      }
    });
  });

const Load = async (increment) => {
  blogSection.innerHTML = "";
  if (increment) contor += 3;
  sortedDB
    .limit(contor)
    .get()
    .then((blogs) => {
      blogs.forEach((blog) => {
        if (blog.id != decodeURI(location.pathname.split("/").pop())) {
          createBlog(blog);
        }
      });
    });
  const getSize = await sortedDB.get();
  console.log(getSize.size);
  if (contor >= getSize.size) btnLoad.style.display = "none";
  else btnLoad.style.display = "block";
};

const updateOrder = () => {
  console.log(
    "Updated Order",
    orderSelect.options[orderSelect.selectedIndex].value
  );
  if (orderSelect.options[orderSelect.selectedIndex].value == "Latest") {
    sortedDB = collectionRef.orderBy("id");
  } else {
    console.log("I am here");
    sortedDB = collectionRef.orderBy("id", "desc");
  }
  updateBlogs();
};

const updateBlogs = () => {
  let val = categorySelect.options[categorySelect.selectedIndex].value;
  if (val == "All") {
    if (orderSelect.options[orderSelect.selectedIndex].value == "Latest") {
      sortedDB = collectionRef.orderBy("id");
    } else {
      sortedDB = collectionRef.orderBy("id", "desc");
    }
  } else {
    if (orderSelect.options[orderSelect.selectedIndex].value == "Latest") {
      sortedDB = collectionRef.where("category", "==", val).orderBy("id");
    } else {
      sortedDB = collectionRef
        .where("category", "==", val)
        .orderBy("id", "desc");
    }
  }
  Load(false);
};

const createBlog = (blog) => {
  let data = blog.data();
  let description = data.article.slice(0, 150);
  while (description.indexOf("#") >= 0) {
    description = description.replace("#", "");
  }
  while (description.indexOf("![") >= 0) {
    description =
      description.slice(0, description.indexOf("![")) +
      description.slice(
        description.indexOf(")", description.indexOf("![")) + 1
      );
  }
  blogSection.innerHTML += `
        <div class="blog-card">
              <img src="${data.bannerImage}" alt="article image"/>
              <h2 class="blog-title">${
                data.title.substring(0, 50) +
                (data.title.length > 50 ? "..." : "")
              }</h2>
              <h3 class="blog-description">${description}</h3>
              <a href="/${blog.id}" class="btn blog-btn">Visit Article</a>
          </div>
    `;
  document.querySelectorAll("img").forEach((img) => {
    img.onerror = function () {
      this.src = "../img/no-image-found.jpg";
    };
  });
};
