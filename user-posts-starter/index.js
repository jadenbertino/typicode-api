// API 1: "https://jsonplaceholder.typicode.com/users"
// API 2: "https://jsonplaceholder.typicode.com/posts?userId=:id"
// HELP: "https://jsonplaceholder.typicode.com/guide/"

async function main() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  const usersData = await users.json();
  let usersHTML = usersData.map(user => {
    const html =
      `<div class="user">
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
  });

  document.querySelector(".user-list").innerHTML = usersHTML.join("");
}

main();
