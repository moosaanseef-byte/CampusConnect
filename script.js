const opportunities = [
    {
        id : 1,
       title: "Frontend Developer",
       company:"ABC Technologies",
       category: "Internship",
       skills: "HTML,CSS,JAVASCRIPT"

},
{
    id : 2,
       title: "Pyton Developer",
       company:"Tech solutions",
       category: "job",
       skills: "Python,Django"

},
{
    id : 3,
       title: "Backend Developer",
       company:"cognizent",
       category: "job",
       skills: "Node.js,php"
},
];

const opportunitylist = document.getElementById("opportunity-list");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const noResult = document.getElementById("no-results");
const favoritesToggle =document.getElementById("favorites-toggle");

let savedIds =[];

try{
    const savedData = localStorage.getItem("savedOpportunities");

    if(savedData !== null) {
        const parsedData = JSON.parse(savedData);

        if(Array.isArray(parsedData)){
            savedIds = parsedData.filter((id)=>
            Number.isInteger(id)&&
        opportunities.some((opportunitY)=>opportunitY.id === id)
    );
        }
    }
}catch(error){
    console.log("could not load favourites:",error);
}


let showFavorites =false;

function saveFavorites(){
    try{
        localStorage.setItem(
            "savedOpportunities",
            JSON.stringify(savedIds)
        );
    } catch(error) {
        console.log("could not save favourites:",error);
        alert("unable to save favourites in this browser.");
    }
}

function displayOpportunities() {

    const searchText = searchInput.value.toLowerCase().trim();

    const selectedcategory = categoryFilter.value;

    const filteredOpportunities = opportunities.filter((Opportunity)=>{
        const title = Opportunity.title.toLowerCase();
        const company = Opportunity.company.toLowerCase();

        const matchesSearch =
        title.includes(searchText)  ||
        company.includes(searchText);

        const matchesCategory =
        selectedcategory ==="All"  ||
        Opportunity.category === selectedcategory;


        const  isSaved = savedIds.includes(Opportunity.id);
         const matchesFavorites =
         !showFavorites || isSaved;

         return matchesSearch &&
         matchesCategory  &&
         matchesFavorites;
       
    });

    opportunitylist.innerHTML="";

    noResult.hidden = filteredOpportunities.length > 0;

    favoritesToggle.textContent = showFavorites
    ? "show All  Opportunities":
    "show favorites";

    filteredOpportunities.forEach((opportunitY)=>{

        const card = document.createElement("article");
        card.className = "card";

        const title = document.createElement("h3");
        title.textContent = opportunitY.title;

        const company = document.createElement("p");
        company.textContent = opportunitY.company;

        const category = document.createElement("P");
        category.textContent = "type:"+opportunitY.category;

        const skills = document.createElement("p");
        skills.textContent = "skills:" + opportunitY.skills;

        const detailsButton = document.createElement("button");
        detailsButton.textContent = "view Details";
        detailsButton.type="button";

        const saveButton = document.createElement("button");
        saveButton.type = "button";

        const isSaved = savedIds.includes(opportunitY.id);

        saveButton.textContent = isSaved
        ? "Remove saved"
        :"save";
        
        saveButton.className = isSaved
        ? "saved-btn"
        :"save-btn";

        saveButton.addEventListener("click",()=>{
            if(savedIds.includes(opportunitY.id)){
                savedIds = savedIds.filter((id)=>
                id !== opportunitY.id
            );
            }else{
                savedIds.push(opportunitY.id);
            }
            saveFavorites();
            displayOpportunities();
        });

        card.appendChild(title);
         card.appendChild(company);
          card.appendChild(category);
           card.appendChild(skills);
            card.appendChild(detailsButton);
            card.appendChild(saveButton);

            opportunitylist.appendChild(card);
    });

}

searchInput.addEventListener("input", displayOpportunities);

categoryFilter.addEventListener("change",displayOpportunities);

favoritesToggle.addEventListener("click",()=>{
    showFavorites = !showFavorites;
    displayOpportunities();
});
displayOpportunities();


//form

const registerForm = document.querySelector("#register-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const courseInput = document.querySelector("#course");
const passwordInput = document.querySelector("#password");
const formMessage = document.querySelector("#form-message");

registerForm.addEventListener("submit",(event)=>{
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const course = courseInput.value;
    const password = passwordInput.value;

    if(!name || !email || !course || !password){
        formMessage.textContent = "please fill in all fields.";
        return;
    }

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        formMessage.textContent = "please enter a valid email.";
        return;
    }
    if(password.length< 6){
        formMessage.textContent =
        "password must contain at least 6 characters.";
        return;
    }
    formMessage.textContent = "Registration form validated successfully.";
    registerForm.reset();
});