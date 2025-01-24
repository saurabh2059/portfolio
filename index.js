const about_me = {
    "name": "saurabh aryal",
  
    "DOB": "2003/ 01/ 07",
  
    "eduction": [
  
      { "SEE": "Shanti Namuna Secondary School, Butwal",
       "GPA": "3.7" },
  
      { "+2": "Kalika Manavgyan Secondary School, Butwal",
       "GPA": "3.29" },
       
      {
        "Bachelor": "Orchid Int'l College, Kathmandu",
        "Currently Studying": "5th sem"
      }
  
    ],
  
    "interest": ["books", "movies", "coding", "aviation"],
  
    "skills": {
      "proficiency": ["HTML", "CSS", "JS", "React JS"],
  
      "familiar_with": ["C", "C++", "python", "PHP"],

      "database":["oracle"]
    },
  
    "social_media": {
      "github": "https://www.github.com/saurabh2059",
      "linkedin": "https://www.linkedin.com/in/saurabh-aryal-b326932ab/"
    }
  
  }

// btn event listner

  // const btn = document.querySelector("#hello_btn");

  // btn.addEventListener("click", function(){
  //   alert("hello coder")

  // }) 


// projects mapping
  const projects = [
    {
      img: "./assets/images/ecommerce.png",
      title:"Ecommerce",
      url:"https://saurabhshop.netlify.app"
    },
    
    {
      img: "./assets/images/coffee.png",
      title:"Coffee Shop",
      url:"https://saurabh2059.github.io/coffeeshop/"
    },
    {
      img: "./assets/images/grocery.png",
      title:"Grocery Website",
      url:"https://saurabh1.netlify.app/"
    },
  ]


    // Get the project wrapper element
    const projectWrapper = document.querySelector('.project_wrapper');

    // Map over the projects array and dynamically create HTML


    projects.forEach(project => {

      // Create a div for the project card
      const projectCard = document.createElement('div');
      projectCard.classList.add('project_card');

      // Set the inner HTML of the project card
      projectCard.innerHTML = `
        <img src="${project.img}" alt="${project.title}">
        <h3>${project.title}</h3>
        <a href="${project.url}" target="_blank">View Project</a>
      `;

      // Append the project card to the wrapper
      projectWrapper.appendChild(projectCard);
    });




 
  
  

