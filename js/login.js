const errorDisplayer  = document.querySelector(".error-container")
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://project-restapi.onrender.com/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });

        const result = await response.json();
        const token = result.token;
        console.log(`Token: ${token}`);
        console.log(token)
        localStorage.setItem('jwtToken', token); 
        if (response.ok) {
           (function redirectToPage() {
              alert("login sucessful")
              window.location.href = "../html/packageDashboard.html";
          })();} 
        else {
           displayError(result.err) }} 
      catch (error) {
        displayError(`Error :${error}`);
    }
});
function displayError(error){
    errorDisplayer.style.display = "flex";
    errorDisplayer.querySelector(".error-message").textContent = error;}