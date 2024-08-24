const errorDisplayer = document.querySelector(".error-container");
const cartCounter = document.querySelector(".cart-count");

document.getElementById('deliveryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    let form = e.target;
    const formData = new FormData(form);
    
    const data = {
        packageName: formData.get('packageName'),
        description: formData.get('description'),
        destination: {
            address: formData.get('destination[address]'),
            city: formData.get('destination[city]'),
            country: formData.get('destination[country]'),
            state: formData.get('destination[state]')
        },
        presentLocation: {
            address: formData.get('presentLocation[address]'),
            city: formData.get('presentLocation[city]'),
            country: formData.get('presentLocation[country]'),
            state: formData.get('presentLocation[state]')
        }
    };

    try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch('https://project-restapi.onrender.com/api/v1/parcel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        
        let result = await response.json();
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Increment the cart count
        incrementCount(Number(cartCounter.textContent) + 1);

        // Clear the form fields
        form.reset();

    } catch (error) {
        displayError(`There was a problem with the fetch operation: ${error}`);
    }
});

function incrementCount(value){
    cartCounter.textContent = value;
}

function displayError(error){
    errorDisplayer.style.display = "flex";
    errorDisplayer.querySelector(".error-message").textContent = error;
}
