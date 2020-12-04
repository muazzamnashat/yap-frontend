
window.addEventListener('DOMContentLoaded', (event) => {

  if (localStorage.getItem("current_user")) {
    App.run();
  } else {
    App.loadLoginPage();
  }
  
  document.getElementById("welcome-tag").addEventListener("click",e => {
    const element = document.getElementById("business-list")
    element.style.visibility = 'visible';
    document.getElementById("write-review").style.visibility = 'visible';
    document.getElementById("business-show").innerHTML="";
    document.getElementById("write-review-form").innerHTML="";})
  
  })
  

  // window.addEventListener('hashchange', checkLocation)

  // history.replaceState({tabID: "index"},null,"/index")
  // function checkLocation() {
    
  //   const location = window.location.href.split("8080/")[1]
  //   console.log(location)
  //   if ( location === "index"){
  //     App.run();
  //   } else {
  //     const bz = document.getElementById(`bz-${location.split("/")[1]}`)
  //     document.body.innerHTML = bz
  //   }
  // }
  

// const signUp = (e) => {

//   const formData = {
//     email: e.target.email.value,
//     password: e.target.password.value
//   };

//   let configObj = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify(formData)
//   };

//   fetch("http://localhost:3000/users",configObj)
//   .then(response => {
//     return response.json()})
//   .then(obj => {
//     const user = new User({email: obj.email});
//     //load the welcome page here
//     hideSignUp();
//   })
// }

// const hideSignUp = () => {
//   document.getElementById("signup-form").style.display = "none"
//   document.getElementById("welcome-page").style.display = "block"}



  



