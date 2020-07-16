/* Generate a proxy for a session id */
const session = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

let framework;

function voteForFramework(button) {
  framework = button;
}

document.addEventListener('DOMContentLoaded', function (event) {

  //add form submition handler
  document.body.addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;

    const result = fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'session':session, 'email': form.email.value, 'framework': framework.value })
    })
      .then(
        (response) => response.json()
      )
      .then(
        json => console.log(json)
      )
      .catch(error => console.log(error));
    return false;
  });
});
