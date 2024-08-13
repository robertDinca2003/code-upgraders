let ui = new firebaseui.auth.AuthUI(auth);

let login = document.querySelector(".login");

const blogSection = document.querySelector(".blog-section");

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("logged in");
    login.style.display = "none";
    getUserWrittenBlogs();
  } else {
    console.log("not login");
    setupLoginButton();
  }
});

const setupLoginButton = () => {
  ui.start("#loginUI", {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectURL) {
        console.log(authResult);
        login.style.display = "none";
        return false;
      },
    },
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  });
};

const getUserWrittenBlogs = () => {
  console.log("tedyinh");
  db.collection("blogs")
    .get()
    .then((blogs) => {
      blogs.forEach((blog) => {
        createBlog(blog);
      });
    })
    .catch((error) => {
      console.log("Error getting blogs");
    });
};

const createBlog = (blog) => {
  let data = blog.data();
  blogSection.innerHTML += `
        <div class="blog-card">
              <img src="${data.bannerImage}" alt="article image"/>
              <h2 class="blog-title">${data.title.substring(0, 50) + "..."}</h2>
              <h3 class="blog-description">${
                data.article.slice(0, 150) + "..."
              }</h3><div class="lineBtn">
              <a href="/${blog.id}" class="btn blog-btn">Visit Article</a>
              <a href="/${blog.id}/editor" class="btn blog-btn">Edit</a>
              <a href="#" onclick = "deleteBlog('${
                blog.id
              }')" class="btn blog-btn">Delete</a></div>
        </div>
    `;
};

const deleteBlog = (id) => {
  db.collection("blogs")
    .doc(id)
    .delete()
    .then(() => {
      location.reload();
    })
    .catch((error) => {
      console.log("Error Deleteing the blog");
    });
};
