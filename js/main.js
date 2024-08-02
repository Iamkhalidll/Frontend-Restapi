document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!name || !email || !password) {
        console.error('All fields are required.');
        return;
    }

    const url = "https://project-restapi.onrender.com/api/v1/auth/signup";
    const data = { name, email, password };

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        const token = result.token;
        localStorage.setItem('jwtToken', token); 

        if (response.ok) {
            (function redirectToPage() {
                alert("You have sucessfully signed up")
                window.location.href = "../html/package.html";
                  })();
        } else {
              alert(result.err)
        }
    } catch (error) {
        console.error('Network error:', error);
    }
});