document.getElementById('deliveryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    let form = e.target;
    const formData = new FormData(form);
    console.log(formData)
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
    console.log(data)

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
        alert(`${result.msg}`)
        let answer = prompt("Do you want to go to your dashboard")
        gotoDashboard(answer.toLowerCase());
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});
function gotoDashboard(answer){
    switch (answer) {
     case "yes":
         location.href = "../html/packageDashboard.html";
       break;
     case "no":
         location.reload();
       break;
     default:
       alert("This is not a meaningful answer")
   }
 };
