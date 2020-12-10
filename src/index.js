

window.addEventListener('DOMContentLoaded', (event) => {

  // console.log(process.env.GOOGLE_KEY)
  if (localStorage.getItem("current_user")) {
    App.run();
  } else {
    App.loadSignupPage();
    App.loadLoginPage();
  }
  
  document.getElementById("welcome-tag").addEventListener("click",e => {
    document.getElementById("business-list").style.visibility = 'visible';
    document.getElementById("write-review").style.visibility = 'visible';
    document.getElementById("background").style.visibility = 'visible';
    document.getElementById("business-show").innerHTML="";
    document.getElementById("write-review-form").innerHTML="";
    document.getElementById("results").innerHTML="";
    document.getElementById("search-result").innerHTML="";
  })

  document.getElementById("search-bar").addEventListener("input", e => {
    if (e.target.value.length > 3){
      let result = []
        fetch(`${HOME_URL}businesses`)
          .then(response => response.json())
          .then(response => {
            const resultDisplay = document.getElementById("search-result");
              response.forEach(obj => {
                if (obj.name.toLowerCase().indexOf(e.target.value) > -1){
                  result.push(obj)
                  let node = document.createElement("a")
                  node.setAttribute("href","#")
                  node.setAttribute("class","list-group-item list-group-item-action")
                  node.innerText = obj.name
                  node.addEventListener("click", e => {
                    document.getElementById("search-bar").reset();
                    Business.loadBusiness(obj);
                  })
                  if (resultDisplay.childNodes.length < 5) resultDisplay.appendChild(node)
                } 
              })    
          })
      document.getElementById("search-bar").addEventListener("submit", e => {
        document.getElementById("search-bar").reset();
        displaySearchResult(result);
      })
    }
  })


})
  

  



