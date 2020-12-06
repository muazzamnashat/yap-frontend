
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

})
  

  



