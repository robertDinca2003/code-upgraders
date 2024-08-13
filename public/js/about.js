function randomise() {
  document
    .querySelector(".rand")
    .style.setProperty("--random", Math.random() * 2 - 1);
}

function displayNot() {
  document.querySelector(".notif").style.left = "0";
}

function submitForm(event) {
  event.preventDefault();
  console.log("here");
  const email = document.querySelector(".email");
  const message = document.querySelector(".message");
  console.log(email.value, message.value);

  if (message.value.length == 0 || email.value.length == 0) {
    alert("Not completed fields");
    event.stopPropagation();
    return;
  }
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email.value)) {
    alert("Invalid Email");
    event.stopPropagation();
    return;
  }
  alert("Message has been sent");
  messages = localStorage.getItem("messages");
  if (messages === null) messages = [message.value];
  else {
    messages = JSON.parse(localStorage.getItem("messages"));
    messages = [...messages, message.value];
  }
  localStorage.setItem("messages", JSON.stringify(messages));
  updateMessages();
}

function updateMessages() {
  const messSection = document.querySelector(".previous");
  messSection.innerHTML = "";
  messages = JSON.parse(localStorage.getItem("messages"));
  if (messages !== null)
    messages.forEach((mes) => {
      messSection.innerHTML += `<p class="parag">${mes}</p>`;
    });
  parag = document.getElementsByClassName("parag");
  if (parag != null)
    for (var i = 0; i < parag.length; i++)
      parag[i].style.fontSize = computedStyles.fontSize;
}

const computedStyles = window.getComputedStyle(document.querySelector(".desc"));

// updateMessages();

const allMessages = (messages = JSON.parse(localStorage.getItem("messages")));

setInterval(randomise, 3500);

setTimeout(displayNot, 10000);
