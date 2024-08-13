let ul = document.querySelector(".page-links");

auth.onAuthStateChanged((user) => {
  if (user) {
    ul.innerHTML += `<li class="link-item">
        <a class="link-anchor" href="/admin">Dashboard</a>
      </li>
      <li class="link-item">
            <a class="link-anchor" onclick="logoutUser()" href="#">Log out</a>
          </li>`;
  } else {
    ul.innerHTML += `<li class="link-item">
        <a class="link-anchor" href="/admin">Login</a>
      </li>`;
  }
});
