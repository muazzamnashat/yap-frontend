class App {
    static run(){
        App.showAllBusinesses();
        API.getAllBusinesses();
    }

    static loadSignupPage(){
        App.hideAllElements();
        const div = document.getElementById("signup-div")
        const form = document.createElement('form');
        form.id = "signupForm"
        form.addEventListener("submit", e => {
            e.preventDefault();
            User.sendUserData(e);
            e.target.reset();
            document.getElementById("signup-div").style.visibility = 'hidden';
            App.run();

        })
        form.innerHTML = `
        <input type="text" placeholder="Enter first name" name="first_name" required><br>
        <input type="text" placeholder="Enter last name" name="last_name" required><br>
        <input type="text" placeholder="Enter your email" name="email" required><br>
        <button type="submit">Sign Up</button>
        `
        div.appendChild(form)
    } 

    static hideAllElements(){
        document.getElementById("background").style.visibility = 'hidden';
        document.getElementById("write-review").style.visibility = 'hidden';
        document.getElementById("business-list").style.visibility = 'hidden';
        document.getElementById("business-show").style.visibility = 'hidden'; 
    }

    static showAllBusinesses(){

        document.getElementById("background").style.visibility = 'visible';
        document.getElementById("signup-div").innerHTML = '';
        document.getElementById("login-div").innerHTML = '';
        document.getElementById("write-review-form").innerHTML = '';
        document.getElementById("write-review").style.visibility = 'visible';
        document.getElementById("business-list").style.visibility = 'visible';
        document.getElementById("business-show").innerHTML = ''; 
    }

    static loadLoginPage(){
        const div = document.getElementById("login-div")
        const form = document.createElement('form');
        form.id = "loginForm"
        form.addEventListener("submit", e => {
            e.preventDefault();
            User.getUserData(e);
            e.target.reset();
            document.getElementById("login-div").style.visibility = 'hidden';
            App.run();

        })
        form.innerHTML = `
        <input type="text" placeholder="Enter your email" name="email" required><br>
        <button type="submit">Login</button>
        `
        div.appendChild(form)
    }
}

const displaySearchResult = (result) => {
    document.getElementById("search-result").innerHTML =""
    App.hideAllElements();
    result.forEach(object => {
        const div = document.createElement("div")
        const anchor = document.createElement("a")

        anchor.setAttribute("href","#")
        anchor.addEventListener("click",e =>{
            e.stopPropagation();
            API.fetchBusiness(object);
            document.getElementById("results").innerHTML=""
        })
        anchor.innerText = object.name
        div.appendChild(anchor)
        div.dataset.tabFor= object.id
        createBusinessDiv(div, object)

        document.getElementById("results").appendChild(div) 
    })
}