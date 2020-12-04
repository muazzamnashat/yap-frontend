class App {
    static run(){
        API.getAllBusinesses();
    }

    static loadLoginPage(){
        // App.hideAllElements();
        const div = document.getElementById("login-div")
        const form = document.createElement('form');
        form.id = "loginForm"
        form.addEventListener("submit", e => {
            e.preventDefault();
            User.sendUserData(e);
            e.target.reset();
            document.getElementById("login-div").style.visibility = 'hidden';
            App.run();

        })
        form.innerHTML = `
        <input type="text" placeholder="Enter first name" name="first_name" required>
        <input type="text" placeholder="Enter last name" name="last_name" required>
        <button type="submit">Login</button>
        `
        div.appendChild(form)
    } 

    static hideAllElements(){
        document.getElementById("write-review").style.visibility = 'hidden';
        document.getElementById("business-list").style.visibility = 'hidden';
        document.getElementById("business-show").style.visibility = 'hidden'; 
    }

    static showAllBusinesses(){
        
        document.getElementById("login-div").innerHTML = '';
        document.getElementById("write-review-form").innerHTML = '';
        document.getElementById("write-review").style.visibility = 'visible';
        document.getElementById("business-list").style.visibility = 'visible';
        document.getElementById("business-show").innerHTML = ''; 
    }
}