

let sUpBtn = document.querySelector(".sUpBtn");


sUpBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission

    let name = document.querySelector(".signupName").value;
    // If clicked on Sign Up 
    if(event.target.textContent=="Sign Up"){
        sUpBtn.disabled = true;
        fetch('/signup/api', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ name: name })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
              
                if (data.message == "User Already Exists") {
                    alert("user Already Exists");
                }
                if(data.name){
                    console.log("created")
                    window.location.href = '/';
                }

            })
            .catch(error => {
                console.error('Error:', error);
                alert('Signup failed. Please try again.');
            });
        sUpBtn.disabled = false;
    }

});


