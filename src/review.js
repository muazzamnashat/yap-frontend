class Review {
    constructor(props){
        this.content = props.content
        this.rating = props.rating
        this.business_id = props.business_id
        this.user_id = props.user_id
    }

    static createReview (target, review){
        fetch(`http://localhost:3000/users/${review.user_id}`)
        .then(response => response.json())
        .then(object => {
            insertReviewData(object,target,review);
        });
        
    }
}

function insertReviewData(user,target,review){
    const current_user = JSON.parse(localStorage.getItem("current_user"))
    const div = document.createElement("div")
    const p1 = document.createElement("p")
    const p2 = document.createElement("p")
    const p3 = document.createElement("p")
    const delBtn = document.createElement("button")
    const editBtn = document.createElement("button")

    delBtn.setAttribute("class","btn btn-primary btn-sm")
    delBtn.setAttribute("style","margin-right:16px")
    delBtn.setAttribute("Data-id",`${review.id}`)
    editBtn.setAttribute("class", "btn btn-primary btn-sm") 
    editBtn.setAttribute("Data-id",`${review.id}`)

    // delete review from business show page

    delBtn.addEventListener("click",(e) =>{
        if(confirm("Delete?")) {
            fetch(`http://localhost:3000/reviews/${e.target.dataset.id}`,{
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(resp => {
                // get the updated rating from server
                API.getUpdatedRating(review.business_id)})
            // delete the review from DOM
            e.target.parentElement.remove()
        }
        
    })

    editBtn.addEventListener("click", e => {
        const review_id = e.target.dataset.id;
        const rating = p2.innerText
        const content = p3.innerText
        makeChangesToReview(review_id, rating,content)
    })

    p1.innerText = `User: ${user.first_name} ${user.last_name}`
    p2.innerText = `${review.rating}`
    p3.innerText = `${review.content}`

    delBtn.innerText = "Delete"
    editBtn.innerText = "Confirm changes"
    div.appendChild(p1)
    div.appendChild(p2)
    div.appendChild(p3)
  
    if(current_user.id === user.id){
        p2.setAttribute("contenteditable","true")
        p3.setAttribute("contenteditable","true")
        div.appendChild(delBtn)
        div.appendChild(editBtn)
    } 

    target.appendChild(div)
}

function createReviewForm(){
    return `
    Write your review here!
    <div class="form-group">
    <textarea id="content" class="form-control"  name="content"> </textarea><br>
    Rating: <select class="form-control"  name="rating" id="rating">
        <option value=1>1</option>
        <option value=2>2</option>
        <option value=3>3</option>
        <option value=4>4</option>
        <option value=5>5</option>
    </select>
    </div>
    <input class="btn btn-primary" type="submit" value="Submit">
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
        // debugger
        //display updated rating on business show page
        API.getUpdatedRating(businessID);
        Review.createReview(reviewsList,obj);
        console.log(obj)})
}


function createReviewFromNestedData(review){
    let configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(review)
    };

    fetch("http://localhost:3000/reviews",configObj)
    .then(response => {
    return response.json()})
    .then(obj => {
        // debugger
        //after the review is created , here I am creating a new div with updated rating so that the rating show up on the index page
        newlyCreatedDivUpdate(obj.business_id)
        console.log(obj)})
}


function makeChangesToReview(review_id, rating,content) {

    const data = {
        content,
        rating 
    }

    const configObj = {  
        method: "PATCH",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
    } 

    fetch(`http://localhost:3000/reviews/${review_id}`,configObj)
    .then (response => response.json())
    .then (obj => {
        API.getUpdatedRating(obj.business_id);
        console.log(obj)})

}


function updateRating(obj){
    // debugger
    document.querySelectorAll(`#rating-${obj.id}`).forEach(rating => rating.innerHTML = `<b>Rating:</b> ${obj.rating}`)
}

