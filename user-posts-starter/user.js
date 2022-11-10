// href = http://127.0.0.1:5501/6.%20Users/user-posts-starter/index.html
// origin = http://127.0.0.1:5501
const postsList = document.querySelector(".posts-list");

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
  postsList.innerHTML = posts.map(post => {
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

async function getPosts() {
  // showUserPosts sets id in local storage to last clicked user
  // this function displays posts of that id

  // get last clicked user
  const id = localStorage.getItem("id");

  // get all posts by user
  const posts = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  const postsData = await posts.json();

  // generate html + display
  renderPostHTML(postsData);
}


root = getRoot();

const backBtn = document.querySelector("#back-button");
backBtn.setAttribute("href", root);
getPosts();
/*
- get id in storage
- find matching user
- display posts by that user
  - get all posts
  - filter by matching id
  - generate html
  - set html of page
*/
