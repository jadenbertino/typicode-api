// href = http://127.0.0.1:5501/6.%20Users/user-posts-starter/index.html
// origin = http://127.0.0.1:5501

function getRoot() {
  let url = window.location.href;
  let root;
  for (let i = url.length; i >= 0; i--) {
    if (url[i] == "/") {
      return url.slice(0, i);
    }
  };
}

root = getRoot();

const backBtn = document.querySelector("#back-button");
backBtn.setAttribute("href", root);
