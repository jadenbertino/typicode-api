// href = http://127.0.0.1:5501/6.%20Users/user-posts-starter/index.html
// origin = http://127.0.0.1:5501
const postsListElem = document.querySelector(".posts-list");

function getRoot() {
  let url = window.location.href;
  let root;
  for (let i = url.length; i >= 0; i--) {
    if (url[i] == "/") {
      return url.slice(0, i);
    }
  };
}

function renderPostsHTML(posts) {
  postsListElem.innerHTML = posts.map(post => {
    return `
    <div class="post">
      <div class="post__title">
        ${post.title}
      </div>
      <p class="post__body">
        ${post.body}
      </p>
    </div>
    `
  }).join("");
}

async function displayPosts() {
  /*
  gets id and name from local storage (comes from last clicked / searched user)
  gets all posts by that user
  generates html to display
  */

  const id = localStorage.getItem("id");
  const name = localStorage.getItem("name");

  // get all posts by user
  const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  const postsData = await posts.json();

  // Render & Display Posts
  renderPostsHTML(postsData);
  document.querySelector(".header").textContent = `Posts By ${name}`;
}



// Ensure back button works properly
const root = getRoot();
const backBtn = document.querySelector("#back-button");
backBtn.setAttribute("href", root);

// Display posts by last clicked user from index.html
displayPosts();

// User search -> display posts
document.querySelector(".post__search").addEventListener("input", async (event) => {
  const id = event.target.value;
  localStorage.setItem("id", id);

  // get & store name
  // fetch and json are both promises so you need to wait for each. can nest await 
  const users = await (await fetch("https://jsonplaceholder.typicode.com/users")).json(); 
  for (let user of users) {
    if (user.id == id) { // id is str, user.id is number
      localStorage.setItem("name", user.username);
      break;
    }
  }
  
  displayPosts();
})