document.addEventListener("DOMContentLoaded", () => {
    const packageContainer = document.querySelector(".packageContainer");
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
                alert("You have to login");
            }
        } catch (error) {
            console.error("Error fetching packages:", error);
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
                alert('your package has been package order has been cancelled ');
                let answer = prompt("Would you like to create another parcel? ");
                newPackageOrStay(answer);
            } else {
                console.error("Failed to delete package");
            }
        } catch (error) {
            console.error("Error deleting package:", error);
        }
    }
    function newPackageOrStay(answer){
       switch (answer) {
        case "yes":
            location.href = "../html/package.html";
          break;
        case "no":
            location.reload();
          break;
        default:
          alert("This is not a meaningful answer")
      }
    };
    fetchPackages();
});
