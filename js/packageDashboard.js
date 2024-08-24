document.addEventListener("DOMContentLoaded", () => {
    const packageContainer = document.querySelector(".packageContainer");
    const errorDisplayer  = document.querySelector(".error-container")
    console.log(packageContainer);

    async function fetchPackages() {
        const token = localStorage.getItem('jwtToken');
        console.log(token);

        try {
            const response = await fetch("https://project-restapi.onrender.com/api/v1/parcels", {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            const result = await response.json();

            if (response.ok) {
                displayPackages(result);
            } else if (result.err === "jwt expired") {
               displayError("You have to login");
            }
        } catch (error) {
            displayError(`Error fetching packages: ${error}`);
        }
    }

    function displayPackages(parcels) {
        parcels.forEach(parcel => {
            console.log(parcel)
            packageContainer.innerHTML += `
                <div class="packageItems">
                    <p>${parcel.packageName}</p>
                    <p><i class="fa-solid fa-trash" data-package-id="${parcel._id}"></i></p>
                </div>`;
        });

        setupDeleteButton();
    }

    function setupDeleteButton() {
        packageContainer.addEventListener("click", async (e) => {
            if (e.target.classList.contains("fa-trash")) {
                console.log("Delete button clicked");
                const packageId = e.target.dataset.packageId;
                await deletePackage(packageId);
            }
        });
    }

    async function deletePackage(packageId) {
        const token = localStorage.getItem('jwtToken');

        try {
            const response = await fetch(`https://project-restapi.onrender.com/api/v1/parcels/${packageId}/cancel`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (response.ok) {
                console.log(`Package ${packageId} deleted successfully`);
                location.reload();
            } else {
                displayError("Failed to delete package");
            }
        } catch (error) {
            displayError("Error deleting package:");
        }
    }
    fetchPackages();
    function displayError(error){
     errorDisplayer.style.display = "flex";
     errorDisplayer.querySelector(".error-message").textContent = error;
    }
});
