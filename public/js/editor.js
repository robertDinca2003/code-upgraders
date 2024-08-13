const blogTileField = document.querySelector(".title");
const articleFIeld = document.querySelector(".article");
let categoryField = document.querySelector("#category");

const bannerImage = document.querySelector("#banner-upload");
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector(".publish-btn");
const uploadInput = document.querySelector("#image-upload");

bannerImage.addEventListener("change", () => {
  uploadImage(bannerImage, "banner");
});

uploadInput.addEventListener("change", () => {
  uploadImage(uploadInput, "image");
});

const uploadImage = (uploadFile, uploadType) => {
  const [file] = uploadFile.files;
  if (file && file.type.includes("image")) {
    const formdata = new FormData();
    formdata.append("image", file);

    fetch("/upload", {
      method: "post",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        if (uploadType == "image") {
          addImage(data, file.name);
        } else {
          bannerPath = `${location.origin}/${data}`;
          banner.style.backgroundImage = `url(${bannerPath})`;
        }
      });
  } else {
    alert("No way sherlock");
  }
};

const addImage = (imagepath, alt) => {
  let curPos = articleFIeld.selectionStart;
  let textToInsert = `\r![${alt}](${imagepath})\r`;
  articleFIeld.value =
    articleFIeld.value.slice(0, curPos) +
    textToInsert +
    articleFIeld.value.slice(curPos);
};

publishBtn.addEventListener("click", () => {
  let docName = "";
  if (articleFIeld.value.length && blogTileField.value.length) {
    console.log("I ma here 3");
    if (blogID[0] == "editor" || blogID[1] == "editor") {
      console.log("I ma here 1");
      let letters = "abcdefghijklmnopqrstuvwxyz";
      let blogTitle = blogTileField.value.split(" ").join("-");
      let id = "";
      for (let i = 0; i < 4; i++)
        id += letters[Math.floor(Math.random() * letters.length)];
      docName = `${blogTitle}-${id}`;
    }
  } else {
    console.log("I ma here 2");
    docName = decodeURI(blogID[0]);
  }

  let date = new Date();

  db.collection("blogs")
    .doc(docName)
    .set({
      id:
        date.getFullYear() * 1000000 +
        date.getMonth() * 10000 +
        date.getDay() * 100 +
        date.getHours(),
      url: "/" + docName,
      title: blogTileField.value,
      article: articleFIeld.value,
      category: categoryField.value,
      bannerImage: bannerPath,
      publishedAt: `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`,
      author: auth.currentUser.email.split("@")[0],
    })
    .then(() => {
      location.href = `/${docName}`;
    })
    .catch((err) => {
      console.error(err);
    });
});

auth.onAuthStateChanged((user) => {
  if (!user) {
    location.replace("/admin");
  }
});

let blogID = location.pathname.split("/");
blogID.shift();

if (blogID[0] != "editor") {
  let docRef = db.collection("blogs").doc(decodeURI(blogID[0]));
  docRef.get().then((doc) => {
    console.log(doc.data());
    if (doc.exists) {
      let data = doc.data();
      bannerPath = data.bannerImage;
      banner.style.backgroundImage = `url(${bannerPath})`;
      blogTileField.value = data.title;
      articleFIeld.value = data.article;
    } else {
      location.replace("/404");
    }
  });
}
