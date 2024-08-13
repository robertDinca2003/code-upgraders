function getCatFact() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      var catFact = response.fact;
      document.querySelector(".catFact").innerText = catFact;
    }
  };
  xhr.open("GET", "/catFact", true);
  xhr.send();
}

getCatFact();
