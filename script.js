let projectName = "";

//function for changing projectname variable
function changeProjectName(name){
    projectName = name;
    localStorage.setItem("projectName", projectName);
}

//function for getting project name and displaying it to a element
function getProjectName(elementId, prefix){
    projectName = localStorage.getItem("projectName");

    if(prefix != ""){
        document.getElementById(elementId).innerHTML = prefix + " - " + projectName;
    }
    else{
        document.getElementById(elementId).innerHTML = projectName;
    }
}


//function for retrieving project description and setting it to an element
function getProjectDetails(elementId){
    //get data out of json file
    fetch('/data.json').then((response) => response.json()).then(function(data){
        //get initials of project
        const objNameArray = localStorage.getItem("projectName"); //returns array with project name in
        objName = "";

        //for loop to get first 4 letters of projectName
        for(let i = 0; i < 4; i++){
            objName = objName + objNameArray[i];
        }

        //get link and description of project
        link = data[objName][0].DownloadLink;
        description = data[objName][1].Description;
        localStorage.setItem("description", description);

        //get amount of images and display them in html file
        imageCount = data[objName][2].ImageCount;

        //for loop to get amount of images and add to html file
        for(let i = 1; i <=imageCount; i++){
            //get image paths and add to html page
            screen = "Screen" +  String(i);
            image = data[objName][(2 + i)][screen];

            document.getElementById(screen).setAttribute('src', image);
        }

        //Set details to html file
        document.getElementById(elementId).innerHTML = description;
        document.getElementById('GooglePlayLink').setAttribute('href', link);
    });
}

//function to increase height of div if neccessary
function checkOutOfBorder(id){
    //get height of id
    height = document.getElementById(id).offsetHeight;

    //check if height is greater then 620 (px)
    if(height > 620){
        if(id == 'aboutText'){
            document.getElementById('profileBlocks').style.display = "block";
                blockHeight = document.getElementById('profile1').offsetHeight;
                document.getElementById(id + 'Parent').style.height = (height + (blockHeight * 3)) + 50 + "px";
        }
        else{
            //change height to needed height and add 50 px margin
            document.getElementById(id + "Parent").style.height = (height * 1.25) + "px";   
        }
    }
    
    if(id == "projectText" && height > 196){
        let width = document.getElementById('projectTextParent').offsetWidth;
        let wordsPerLine = width/5; //average 5 words per line
        let height = Math.round((((localStorage.getItem("description").length) / wordsPerLine) * 15) + (4*250)); //12px height of text with 4 images of each 250px

        document.getElementById('projectTextParent').style.height = height + "px";
    }
}

//function to collapse navbar into dropdown
function checkNavBarCollapse(bodyId){
    //get width of body
    let bodyWidth = document.getElementById(bodyId).offsetWidth;

    //check if width is to small
    if(bodyWidth < 595){
        //for loop to remove links
        for(let i = 1; i <= 5; i++){
            //remove links
            document.getElementById('link' + i).style.display = 'none';
        }

        //place image for dropdown menu
        let dropdown = document.createElement('p');
        let divDropdown = document.createElement('div');
        let divTotal = document.createElement('div');

        let homeLink = document.createElement('a');
        let aboutLink = document.createElement('a');
        let contactLink = document.createElement('a');
        let projectLink = document.createElement('a');
        let servicesLink = document.createElement('a');

        //adapt links
        homeLink.innerHTML = "Home";
        homeLink.classList.add('linkCollapsed');
        aboutLink.innerHTML = "About us";
        aboutLink.classList.add('linkCollapsed');
        contactLink.innerHTML = "Contact us";
        contactLink.classList.add('linkCollapsed');
        projectLink.innerHTML = "Projects";
        projectLink.classList.add('linkCollapsed');
        servicesLink.innerHTML = "Services";
        servicesLink.classList.add('linkCollapsed');

        if(bodyId == "index"){
            homeLink.href = "#top";
            contactLink.href = "/Vixionary/pages/contactUs.html";
            aboutLink.href = "/Vixionary/pages/aboutUs.html";
            projectLink.href = "/Vixionary/pages/projects.html";
            servicesLink.href = "/Vixionary/pages/services.html";

            document.getElementById('arrow').style.opacity = 100; 
        }
        else if(bodyId == "contact"){
            homeLink.href = "../index.html";
            contactLink.href = "#top";
            aboutLink.href = "/aboutUs.html";
            projectLink.href = "/projects.html";
            servicesLink.href = "/services.html";
        }
        else if(bodyId == "about"){
            homeLink.href = "../index.html";
            contactLink.href = "/contactUs.html";
            aboutLink.href = "#top";
            projectLink.href = "/projects.html";
            servicesLink.href = "/services.html";
        }
        else if(bodyId == "services"){
            homeLink.href = "../index.html";
            contactLink.href = "/contactUs.html";
            aboutLink.href = "/aboutUs.html";
            projectLink.href = "/projects.html";
            servicesLink.href = "#top";

            document.getElementById('arrow1').style.opacity = 100;
            document.getElementById('serviceBlocks').style.display = 'block';
        }
        else{
            homeLink.href = "../index.html";
            contactLink.href = "/contactUs.html";
            aboutLink.href = "/aboutUs.html";
            projectLink.href = "#top";
            servicesLink.href = "/services.html";

            if(bodyId == "projectInfo"){
                for(let i = 1; i<=4; i++){
                    document.getElementById('Screen' + i).style.height = "250px";
                }
            }
        }
    
        //adapt and add dropdown arrow
        dropdown.innerHTML = "<i id='dropdownArrow' class='fa-solid fa-arrow-down'></i> Menu";  
        dropdown.id = "dropdownImg";
        dropdown.height = "20";
        dropdown.style.fontFamily = "fantasy";


        //add div and arrow to navbar
        divDropdown.append(homeLink);
        divDropdown.append(aboutLink);
        divDropdown.append(contactLink);
        divDropdown.append(projectLink);
        divDropdown.append(servicesLink);

        divDropdown.style.visibility = "hidden";
        divDropdown.style.backgroundColor = "#faf6f6";
        divDropdown.style.padding = "10px";
        divDropdown.style.borderRadius = "10px";

        //adjust div dropdown
        homeLink.style.display = "block";
        aboutLink.style.display = "block";
        contactLink.style.display = "block";
        projectLink.style.display = "block";
        servicesLink.style.display = "block";

        divTotal.append(divDropdown);
        document.getElementById(bodyId + 'Nav').append(dropdown);
        document.getElementById(bodyId + 'Nav').append(divTotal);

        divTotal.classList.add('container');

        let dropdownBool = false;

        dropdown.addEventListener('click' ,function display(){
            if(dropdownBool != true){
                divDropdown.style.visibility = "visible";

                dropdownBool = true;
                document.getElementById('dropdownArrow').style.transform = "rotate(180deg)";
            }
            else{
                divDropdown.style.visibility = "hidden";

                dropdownBool = false;
                document.getElementById('dropdownArrow').style.transform = "rotate(0deg)";
            }
        })
    }
}