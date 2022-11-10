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

function renderPostHTML(posts) {
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
  gets id of last clicked user
  gets all posts by that user
  generates html to display
  */

  // get id of last clicked user
  const id = localStorage.getItem("id");
  const name = localStorage.getItem("name");

  // get all posts by user
  const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  const postsData = await posts.json();

  // generate html + display
  renderPostHTML(postsData);
  document.querySelector(".header").textContent = `Posts By ${name}`;
}



// Ensure back button works properly
const root = getRoot();
const backBtn = document.querySelector("#back-button");
backBtn.setAttribute("href", root);

// Display posts by last clicked user from index.html
displayPosts();

// User search -> display posts
