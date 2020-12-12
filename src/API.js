const HOME_URL = "http://localhost:3000/";

// const BACKEND_URL = "http://localhost:3000/api/v1/";

class API {
    static getAllBusinesses(){
       fetch(`${HOME_URL}businesses`)
        .then(response => response.json())
        .then(response => {
            response.forEach(obj => {
                Business.insertBusinessesToList(obj)
            })    
        })
    }

    static fetchBusiness(object){
        fetch(`${HOME_URL}businesses/${object.id}`)
        .then(response => response.json())
        .then(response => {
           Business.loadBusiness(response) 
        })
    }

    static getUpdatedRating(id){
        fetch(`${HOME_URL}businesses/${id}`)
        .then(response => response.json())
        .then(response => {
            // debugger
            updateRating(response)
        })
    }

}