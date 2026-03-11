// API
 const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

// spinner control
const manageSpinner=(status)=>{
    const spinner = document.getElementById("spinner");

    if(status){
        spinner.classList.remove("hidden");

    }
    else{
        spinner.classList.add("hidden")
    }
};
  
// Load Issues

const loadIssues = ()=>{
    manageSpinner(true);

    fetch(API)
    .then(res => res.json())
    .then(data=>{
        displayIssues(data.data);
        document.getElementById("issue-count").innerText=
        data.data.length;
        manageSpinner(false);
    });
};