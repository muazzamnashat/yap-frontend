class Business{

    //  get the object from API call and create each businesses and attach to the list (Index page)
    static insertBusinessesToList(object){
        const list = document.getElementById("business-list");
        const outerDiv = document.createElement("div");
        outerDiv.setAttribute("class","media");
        const div = document.createElement("div")
        div.setAttribute("class","media-body")
        const img = document.createElement("img")
        img.setAttribute("class","mr-3")
        img.setAttribute("src",`http://lorempixel.com/g/400/200/food/${Math.floor(Math.random() * 11)}/`)
        img.setAttribute("alt","Not found")

        // takes to the business show page
        const anchor = document.createElement("a")
        anchor.setAttribute("href","#")
        anchor.setAttribute("class","mt-0")
        anchor.addEventListener("click",e =>{
            e.stopPropagation();
            API.fetchBusiness(object);
        })
        anchor.innerText = object.name
        
        div.appendChild(anchor)
        div.dataset.tabFor= object.id
        createBusinessDiv(div, object)
        outerDiv.appendChild(img);
        outerDiv.appendChild(div);
        list.appendChild(outerDiv);
    }

    static loadBusiness(object){

        const element = document.getElementById("business-list")
        const reviewButton = document.getElementById("write-review")
        const background = document.getElementById("background")
        background.style.visibility = 'hidden';
        element.style.visibility = 'hidden';
        reviewButton.style.visibility = 'hidden';
        const div = document.createElement("div")
        const reviews = document.createElement("div")
        const form = document.createElement("form")
        form.setAttribute("data-business-ID",object.id)
        form.addEventListener("submit",e => {
            e.preventDefault();
            sendReviewData(e,object.id,reviews);
            e.target.reset();
            API.getUpdatedRating(object.id)
        })
        reviews.innerText = "Recommended Reviews"

        document.getElementById("business-show").innerHTML = `<h2>${object.name}</h2>`

        // create business description on the business show page
        createBusinessDiv(div, object)
        
        object.reviews.forEach(review => Review.createReview(reviews,review))
        div.appendChild(reviews)
        document.getElementById("business-show").appendChild(div)
        form.innerHTML = createReviewForm()
        document.getElementById("business-show").appendChild(form)
        // to prevent it from hiding when get back to this like from welcome yap logo click
        document.getElementById("business-show").style.visibility="visible";
    }
}

function createBusinessDiv(target, object){
   
    const rating = document.createElement("p");
    const desc = document.createElement("p");
    const address = document.createElement("p");
    const website = document.createElement("p");
    const contact = document.createElement("p");

    rating.innerText = `Rating: ${object.rating}`
    rating.id = `rating-${object.id}`
    target.appendChild(rating)

    desc.innerText = `Description: ${object.description}`
    target.appendChild(desc)

    address.innerText = `Address: ${object.address}`
    target.appendChild(address)

    website.innerText = `Website: ${object.website}`
    target.appendChild(website)

    contact.innerText = `Contact: ${object.contact}`
    target.appendChild(contact)
    
}

document.getElementById("write-review").addEventListener("click", e => {
    e.preventDefault();
    App.hideAllElements();
    const formDiv= document.getElementById("write-review-form")
    const form = document.createElement("form")
    form.innerHTML = createBusinessForm()
    form.addEventListener("submit", e => {
        // debugger
        e.preventDefault();
        sendBusinessData(e);
        // e.target.reset();
        App.showAllBusinesses();

    })
    formDiv.appendChild(form)      
})

function createBusinessForm(){
    return `
    <p>Review your favorite businesses and share your experiences with our community.</p>
    
    <div class="form-row">
        <div class="col">
            <input class="form-control" type="text" name="name"  placeholder="Name" ><br>
            Description the business : <textarea class="form-control" name="description" > </textarea><br>
            Review : <textarea class="form-control" name="review"> </textarea placeholder="Review"><br>
            Rating: <select class="form-control" name="rating" >
                        <option value=1>1</option>
                        <option value=2>2</option>
                        <option value=3>3</option>
                        <option value=4>4</option>
                        <option value=5>5</option>
                    </select>
            <input class="form-control" type="number" name="price" placeholder="Price range between 1 to 5"><br>
            <input class="form-control" type="text" name="address"  placeholder="Address"><br>        
            <input class="form-control" type="text" name="state"  placeholder="State"><br>
            <input class="form-control" type="number" name="zip" placeholder="Zip"><br>
            <input class="form-control" type="number" name="contact" placeholder="Phone number"><br>
            <input class="form-control" type="text" name="website" placeholder="Website"><br>
        </div>
    </div>
    <input  class="btn btn-primary" type="submit" value="Submit">
    `
}


function sendBusinessData(e){

    const current_user = JSON.parse(localStorage.getItem("current_user"))
    const content = e.target.review.value
    const rating = e.target.rating.value
      
    const name = e.target.name.value
    const description = e.target.description.value
    const address = e.target.address.value
    const state = e.target.state.value
    const zip = e.target.zip.value
    const contact = e.target.contact.value
    const website = e.target.website.value
    const price = e.target.price.value

    const formData = {
    name,
    description,
    address,
    state,
    zip,
    contact,
    website,
    price
    // user_id: current_user.id
    };

    let configObj = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(formData)
    };
// debugger
    fetch("http://localhost:3000/businesses",configObj)
    .then(response => {
    return response.json()})
    .then(obj => {
        // console.log(obj)
        const business_id = obj.id;
        createReviewFromNestedData(content,rating,current_user.id,business_id)
        const div = document.createElement("div");
        const anchor = document.createElement("a")

        anchor.setAttribute("href","#")
        anchor.addEventListener("click",e =>{
            e.stopPropagation()
            API.fetchBusiness(obj)
        })
        anchor.innerText = obj.name
        div.appendChild(anchor)
        // const element = document.getElementById("business-list");
        const element = document.getElementById("newlyCreated");
        createBusinessDiv(div,obj);
        element.appendChild(div);
        // debugger
        
    })
    // .catch (error => console.log(error.messages))
}