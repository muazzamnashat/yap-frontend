class User {
    constructor (props){
        this.first_name = props.first_name
        this.last_name = props.last_name
        this.email = props.email
        this.bio = props.bio
        this.location = props.location
    }

    static sendUserData(e){
        const user = new User({first_name: e.target.first_name.value,last_name:e.target.last_name.value,email:e.target.email.value})
        const formData = {
            first_name:  user.first_name,
            last_name: user.last_name,
            email: user.email
            };
        
        let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
        };

        fetch("http://localhost:3000/users",configObj)
        .then(response => {
        return response.json()})
        .then(obj => {
            // debugger
            if (Array.isArray(obj)){
                alert(obj[0]);
                location.reload();
            } else {
                localStorage.setItem("current_user",JSON.stringify(obj))
            }
            // debugger
        })
        
    }


    static getUserData(e){
        const formData = {
            email: e.target.email.value
            };

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
            };

        fetch("http://localhost:3000/login",configObj)
        .then(response => {
        return response.json()})
        .then(obj => {
            // debugger
            if (obj.error){
                alert(obj.error);
                location.reload();
            } else {
                localStorage.setItem("current_user",JSON.stringify(obj))
            }
            // debugger
        })
    }

}