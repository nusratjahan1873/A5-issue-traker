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


// display issues

const displayIssues=(issues)=>{
   const  container= document.getElementById("issues-container");
   container.innerHTML="";
   issues.forEach(issue =>{
    const div = document.createElement("div");

   let borderColor = issue.status === "open"
    ? "border-green-500" : "border-purple-500"; 
    div.innerHTML = ` <div onclick="openModal('${issue.title}','${issue.description}')" class="border-t-4 ${borderColor} bg-white p-4 rounded shadow cursor-pointer">
     <h2 class="font-bold">${issue.title}</h2>
     <p class="text-sm text-gray-500 mt-2"> ${issue.description.slice(0,80)}... </p> 
     <p class="text-xs mt-3"> By ${issue.author} </p>
      </div> `;


      container.appendChild(div);
   });  
};


// filter issue

const filterIssues =(status)=>{
    manageSpinner(true);

    fetch(API)
    .then(res => res.json())
    .then(data=>{


        let issues = data.data;
         if(status !== "all"){
             issues = issues.filter(issue => issue.status === status);
             }
              displayIssues(issues); 

              manageSpinner(false);
    });
};

// search issue
const searchIssue =()=>{
    const text =
    document.getElementById("search-input").value.toLowerCase();

    fetch(API)
    .then(res=> res.json())
    .then(data=>{
        const filtered = data.data.filter(issue =>
            issue.title.toLowerCase().includes(text)      
        );
        displayIssues(filtered);
    })
}

