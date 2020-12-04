class Business{

    static insertBusinessesToList(object){
        const list = document.getElementById("business-list");
        const div = document.createElement("div")
        const anchor = document.createElement("a")

        anchor.setAttribute("href","#")
        anchor.addEventListener("click",e =>{
            e.stopPropagation()
            API.fetchBusiness(object)
        })
        anchor.innerText = object.name

        
        div.appendChild(anchor)
        div.dataset.tabFor= object.id
        createBusinessDiv(div, object)

        list.appendChild(div);
    }

    static loadBusiness(object){

        const element = document.getElementById("business-list")
        element.style.visibility = 'hidden';
        const div = document.createElement("div")
        const reviews = document.createElement("div")
        const form = document.createElement("form")
        form.setAttribute("data-business-ID",object.id)
        form.addEventListener("submit",e => {
        e.preventDefault();
        sendReviewData(e,object.id,reviews);
        e.target.reset();
        })
        reviews.innerText = "Recommended Reviews"
        createBusinessDiv(div, object)
        
        object.reviews.forEach(review => Review.createReview(reviews,review))
        div.appendChild(reviews)
        document.getElementById("business-show").appendChild(div)
        form.innerHTML = createReviewForm()
        document.getElementById("business-show").appendChild(form)
        
     
    }
}

function createBusinessDiv(target, object){
    const desc = document.createElement("p");
    const address = document.createElement("p");
    const website = document.createElement("p");
    const contact = document.createElement("p");

    desc.innerText = `Description: ${object.description}`
    target.appendChild(desc)

    address.innerText = `Address: ${object.address}`
    target.appendChild(address)

    website.innerText = `Website: ${object.website}`
    target.appendChild(website)

    contact.innerText = `Contact: ${object.contact}`
    target.appendChild(contact)
    
}

