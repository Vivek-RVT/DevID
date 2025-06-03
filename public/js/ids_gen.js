document.addEventListener('DOMContentLoaded', async () => {








    const card_container =document.getElementById('cards-container'); // Make sure this 
    try {
        const response = await fetch('/api/devs');
        const devs = await response.json();
console.log(devs)
devs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

// 2. Take only the first 4
const latestFour = devs.slice(0, 3);

// 3. Render cards
latestFour.forEach(dev => {
            const card = document.createElement("div");
            card.className = "dev-card";
            card.innerHTML = `
                <nav>Dev ID  

</nav>
                <img src="${dev.photo || 'default.jpg'}" alt="Profile Image" class="dev-photo">
                <div class="id-content">
                    <h3>${dev.FirstName} ${dev.LastName}</h3>
                    <p><strong>Email:</strong> ${dev.email}</p>
                    <p><strong>Address:</strong> ${dev.address}</p>
                    <p><strong>Salary:</strong> ₹${dev.salary}</p>
                    <p><strong>Language:</strong> ${dev.language}</p>
                    <p><strong>Manager:</strong> ${dev.isManager ? "Yes" : "No"}</p>
                    <span>Created on: ${new Date(dev.createdAt).toLocaleDateString()}</span>
                </div>
            `;
            card_container.appendChild(card);
        
        });

    } catch (err) {
        card_container.innerHTML = "<p>Error loading dev data.</p>";
        console.error(err);
    }






});