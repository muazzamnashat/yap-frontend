class Review {
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

    delBtn.setAttribute("class","review-delete")
    delBtn.setAttribute("Data-id",`${review.id}`)
    editBtn.setAttribute("class", "review-edit") 
    editBtn.setAttribute("Data-id",`${review.id}`)

    delBtn.addEventListener("click",(e) =>{
        if(confirm("Delete?")) {
            fetch(`http://localhost:3000/reviews/${e.target.dataset.id}`,{
                method: "DELETE"
            })
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
    Write your review here: <textarea id="content" name="content"> </textarea><br>
    Rating: <select name="rating" id="rating">
        <option value=1>1</option>
        <option value=2>2</option>
        <option value=3>3</option>
        <option value=4>4</option>
        <option value=5>5</option>
    </select>
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
        console.log(obj)})

}
