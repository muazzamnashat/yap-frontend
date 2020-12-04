class Review {
    static createReview (target, review){
        target.innerHTML += `
        <div>
        <p>Rating: ${review.rating}/5</p>
        <p>${review.content}</p>
        </div>
        `
    }
}


function createReviewForm(){
    return `
    Write your review here: <textarea id="content" name="content"> </textarea><br>
    Rating: <input type="number" id="rating" name="rating"><br><br>
    <input type="submit" value="Submit">
    `
}

function sendReviewData(e,businessID,reviewsList){
    const current_user = JSON.parse(localStorage.getItem("current_user"))
    const formData = {
    content: e.target.content.value,
    rating: e.target.rating.value,
    business_id: businessID,
    user_id: current_user.id
    };

    let configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/reviews",configObj)
    .then(response => {
    return response.json()})
    .then(obj => {
        Review.createReview(reviewsList,obj)
        console.log(obj)})
}


function createReviewFromNestedData(content,rating,userID, businessID){
    const formData = {
        content: content,
        rating: rating,
        business_id: businessID,
        user_id: userID
        };
        let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
        };
    
        fetch("http://localhost:3000/reviews",configObj)
        .then(response => {
        return response.json()})
        .then(obj => {
            console.log(obj)})
}