 
 
 let submit;
 /*
  function checkForm(form)
  {
    const result =  fetch('/vote', {
      method: 'POST',
      body: new new FormData(form)
    })        
    .then((response) => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));  
    alert(submit.value);
    return false;
  }
   */  
  function Clicked(button)
  {
    submit= button ;
  }
  document.addEventListener('DOMContentLoaded', function (event) {
  document.body.addEventListener("submit", async function(event) {
    event.preventDefault();

    const form = event.target;
    
    const result =  fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {'email':form.email.value, 'vote_for': submit.value} )
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
 