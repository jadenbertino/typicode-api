// API 1: "https://jsonplaceholder.typicode.com/users"
// API 2: "https://jsonplaceholder.typicode.com/posts?userId=:id"
// HELP: "https://jsonplaceholder.typicode.com/guide/"


function getRoot() {
  const url = window.location.href;
  let root;
  for (let i = url.length; i >= 0; i--) {
    if (url[i] == "/") {
      return url.slice(0, i);
    }
  };
}

function createUserHTML(user) {
  return `
  <div class="user" onclick="goToPostsByUser(${user.id})">
    <div class="user-card">
      <div class="user-card__container">
        <h3>${user.name}</h4>
          <p><b>Email:</b> ${user.email}</p>
          <p><b>Phone:</b> ${user.phone}</p>
          <p><b>Website:</b> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
      </div>
    </div>
  </div>
  `
  return html
}

async function main() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  const usersData = await users.json();
  const usersHTML = usersData.map(user => createUserHTML(user)).join("");
  document.querySelector(".user-list").innerHTML = usersHTML;
}

function goToPostsByUser(id) {
  // stores user id local storage then goes to user.html
  /*
  local storage saves it in cache, so that it retains even on refresh
  window.location.href = the full url of the window
  window.location.origin = the root domain of the window
  */
  localStorage.setItem("id", id);
  window.location.href= `${root}/user.html`;
  // go to user.js for next steps
}

root = getRoot();
main();
getPosts();
