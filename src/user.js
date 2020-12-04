class User {
    constructor (props){
        this.first_name = props.first_name
        this.last_name = props.last_name
        this.email = props.email
        this.bio = props.bio
        this.location = props.location
    }

    static sendUserData(e){
        const user = new User({first_name: e.target.first_name.value,last_name:e.target.last_name.value})
        const formData = {
            first_name:  user.first_name,
            last_name: user.last_name
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
            localStorage.setItem("current_user",JSON.stringify(obj))
            console.log(obj)})
    }

}