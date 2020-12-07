
window.addEventListener('DOMContentLoaded', (event) => {

  if (localStorage.getItem("current_user")) {
    App.run();
  } else {
    App.loadSignupPage();
    App.loadLoginPage();
  }
  
  document.getElementById("welcome-tag").addEventListener("click",e => {
    const element = document.getElementById("business-list");
    element.style.visibility = 'visible';
    document.getElementById("write-review").style.visibility = 'visible';
    document.getElementById("background").style.visibility = 'visible';
    document.getElementById("business-show").innerHTML="";
    document.getElementById("write-review-form").innerHTML="";
  })

  document.getElementById("search-bar").addEventListener("input", e => {
      
      fetch(`${HOME_URL}businesses`)
        .then(response => response.json())
        .then(response => {
          const resultDisplay = document.getElementById("search-result")
            response.forEach(obj => {
              if (obj.name.toLowerCase().indexOf(e.target.value) > -1){
                let node = document.createElement("a")
                node.setAttribute("href","#")
                node.innerText = obj.name
                node.addEventListener("click", e => {
                  Business.loadBusiness(obj)
                })
                if (e.target.value.length < 5) resultDisplay.appendChild(node)
                console.log("this is the search key", e.target.value)
                console.log("this is the result ", obj.name)
              }



            })    
        })
  })

})
  

  



