let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(blogId);

docRef.get().then((doc) => {
  if (doc.exists) {
    setupBlog(doc.data());
  } else {
    location.replace("/404");
  }
});

const setupBlog = (data) => {
  const banner = document.querySelector(".banner");
  const title = document.querySelector(".title");
  const articleField = document.querySelector(".article");
  const publishedAt = document.querySelector(".published");

  banner.style.backgroundImage = `url(${data.bannerImage})`;
  title.innerHTML += data.title;
  publishedAt.innerHTML += data.publishedAt;
  publishedAt.innerHTML += ` by ${data.author}`;

  let editBtn = document.getElementById("edit-blog-btn");
  if (auth.currentUser != null) {
    editBtn.style.display = "inline";
    editBtn.href = `/${blogId}/editor`;
  }
  addArticle(articleField, data.article);
};

const addArticle = (articleField, articleData) => {
  console.log(articleData);
  data = articleData.split("\n").filter((item) => item.length);
  data.forEach((item) => {
    if (item[0] == "#") {
      let hCount = 0;
      let i = 0;
      while (item[i] == "#") {
        hCount++;
        i++;
      }
      let tag = `h${hCount}`;
      articleField.innerHTML += `<${tag}>${item.slice(
        hCount,
        item.length
      )}</${tag}>`;
    } else if (item[0] == "!" && item[1] == "[") {
      let separator;
      for (let i = 0; i <= item.length; i++) {
        if (
          item[i] == "]" &&
          item[i + 1] == "(" &&
          item[item.length - 1] == ")"
        ) {
          separator = i;
        }
      }

      let alt = item.slice(2, separator);
      let src = item.slice(separator + 2, item.length - 1);
      articleField.innerHTML += `<img src="${src}" alt="${alt}" class="article-image"/>`;
    } else {
      articleField.innerHTML += `<p>${item}</p>`;
    }
  });
  console.log(data);
};
