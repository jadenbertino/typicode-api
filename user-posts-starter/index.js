// API 1: "https://jsonplaceholder.typicode.com/users"
// API 2: "https://jsonplaceholder.typicode.com/posts?userId=:id"
// HELP: "https://jsonplaceholder.typicode.com/guide/"


function getRoot() {
  let url = window.location.href;
  let root;
  for (let i = url.length; i >= 0; i--) {
    if (url[i] == "/") {
      return url.slice(0, i);
    }
  };
}

async function main() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  const usersData = await users.json();
  const usersHTML = usersData.map(user => createUserHTML(user));
  document.querySelector(".user-list").innerHTML = usersHTML.join("");
}

function createUserHTML(user) {
  const html =
  `<div class="user" onclick="showUserPosts(${user.id})">
    <div class="user-card">
      <div class="user-card__container">
        <h3>${user.name}</h4>
          <p><b>Email:</b> ${user.email}</p>
          <p><b>Phone:</b> ${user.phone}</p>
          <p><b>Website:</b> <a href="https://${user.website}" target="_blank">${user.website}</a></p>
      </div>
    </div>
  </div>`
  return html
}

function showUserPosts(id) {
  /*
  local storage saves it in cache, so that it retains even on refresh
  window.location.href = the full url of the window
  window.location.origin = the root domain of the window
  */
  localStorage.setItem("id", id);
  window.location.href= `${root}/user.html`;
  getPosts();
}

async function getPosts() {
  // showUserPosts sets id in local storage to last clicked user
  // this function displays posts of that id
  const id = localStorage.getItem("id");
  const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  const postsData = await posts.json();
}

root = getRoot();
main();
getPosts();
