const Crt_real_btn = document.querySelector('.create-r-btn');
const Reasl_form_cont = document.querySelector('.form-container');
const mb_menu_btn = document.querySelector('.menu-mb-icon');
const mb_menu = document.querySelector('.mb-nav');
const mb_cancel_btn = document.querySelector('.nav-c');

mb_menu_btn.addEventListener('click',()=>{
    mb_menu.style.display= "flex";
    document.body.style.scroll = "none"

})

mb_cancel_btn.addEventListener('click',()=>{
    mb_menu.style.display= 'none';
     document.body.style.scroll = "none"
})
Crt_real_btn.addEventListener('click', () => {
    Reasl_form_cont.style.display = "block";
    Reasl_form_cont.innerHTML = `
        <h2>Employee Details Form</h2>
        <div class="cancel">+</div>
       <form action="/CreateID" method="POST" enctype="multipart/form-data">
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" class="form-in" name="email" placeholder="Enter your email address" required>
    </div>

    <div class="form-in-d">
        <div class="form-group">
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" class="form-in" name="first-name" placeholder="Enter first name" required>
        </div>
        <div class="form-group">
            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name" class="form-in" name="last-name" placeholder="Enter last name" required>
        </div>
    </div>

    <div class="form-group">
        <label for="address">Address:</label>
        <input type="text" id="address" class="form-in" name="address" placeholder="Enter your full address" required>
    </div>

    <div class="form-in-d">
        <div class="form-group">
            <label for="salary">Salary:</label>
            <input type="number" id="salary" class="form-in" name="salary" placeholder="Enter salary amount" required>
        </div>

        <div class="form-group">
            <label for="language">Preferred Language:</label>
            <select id="language" class="form-opt" name="language" required>
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
            </select>
        </div>

        <div class="form-group">
            <label for="is-manager">Are you a Manager?</label>
            <select id="is-manager" name="is-manager" class="form-opt" required>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <label for="image">Upload Image:</label>
        <input type="file" id="image" name="image" accept="image/*" required>
    </div>

    <div class="form-group">
        <button type="submit" class="submit-btn">Submit</button>
    </div>
</form>

    `;

    document.querySelector('.cancel').addEventListener("click", () => {
        Reasl_form_cont.style.display = "none";
    });
});

(async () => {
    try {
        const response = await fetch('/api/devs');
        const devsids = await response.json();

        const options = {
            keys: ['FirstName', 'LastName', 'email', 'address', 'language'],
            threshold: 0.3
        };

        const fuse = new Fuse(devsids, options);

        function renderCards(data) {
            const container = document.getElementById('cardContainer');
            container.innerHTML = "";
        
            data.forEach(dev => {
                container.innerHTML += `
                    <div class="dev-card">
                      <nav>Dev ID
                        <div class="export-cont">
                          <img src="img/logo.svg" alt="" class="exportIcon">
                          <div class="ex-menu">
                              <div class="export-buttons">
                                  <button class="exportImage">Export as Image</button>
                                  <button class="exportPDF">Export as PDF</button>
                              </div>
                          </div>
                        </div>
                      </nav>
                      <img src="${dev.photo}" alt="${dev.FirstName}" class="dev-photo">
                      <div class="id-content">
                        <h3>${dev.FirstName} ${dev.LastName}</h3>
                        <p><strong>Email:</strong> ${dev.email}</p>
                        <p><strong>Address:</strong> ${dev.address}</p>
                        <p><strong>Language:</strong> ${dev.language}</p>
                        <p><strong>Manager:</strong> ${dev.isManager ? 'Yes' : 'No'}</p>
                        <p><strong>Salary:</strong> ₹${dev.salary.toLocaleString()}</p>
                      </div>
                    </div>
                `;
            });
        
            if (data.length === 0) {
                container.innerHTML = "<p class='error-p'>No results found.</p>";
                return;
            }
        
            // 🔁 Attach export listeners right after rendering cards
            document.querySelectorAll('.export-buttons').forEach(buttonGroup => {
                const exportImageBtn = buttonGroup.querySelector('.exportImage');
                const exportPDFBtn = buttonGroup.querySelector('.exportPDF');
                const cardToExport = buttonGroup.closest('.dev-card');
        
                if (exportImageBtn && cardToExport) {
                    exportImageBtn.addEventListener('click', () => {
                        html2canvas(cardToExport).then(canvas => {
                            const link = document.createElement("a");
                            link.download = "DevID.png";
                            link.href = canvas.toDataURL();
                            link.click();
                        });
                    });
                }
        
                if (exportPDFBtn && cardToExport) {
                    exportPDFBtn.addEventListener('click', () => {
                        html2canvas(cardToExport).then(canvas => {
                            const imgData = canvas.toDataURL("image/png");
                            const pdf = new jspdf.jsPDF();
                            pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
                            pdf.save("DevID.pdf");
                        });
                    });
                }
            });
        }
        

        renderCards(devsids);

    } catch (err) {
        const card_container = document.getElementById('cardContainer');
        card_container.innerHTML = "<p>Error loading dev data.</p>";
        console.error(err);
    }
})();

const exportTarget = document.getElementById("idCard"); // your ID card element

document.getElementById("exportImage").addEventListener("click", () => {
  html2canvas(exportTarget).then(canvas => {
    const link = document.createElement("a");
    link.download = "DevID.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

document.getElementById("exportPDF").addEventListener("click", () => {
  html2canvas(exportTarget).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jspdf.jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 180, 100); // adjust size as needed
    pdf.save("DevID.pdf");
  });
});
