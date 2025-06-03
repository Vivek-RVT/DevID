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
            <nav><div class="n-a"> <img src="img/logo.svg" alt="" class="nav-l"> Dev ID
              </div> <div class="export-cont">
               <div class="export-buttons">
                <img src="img/export.svg" alt="" class="exportImage" class="exportIcon">
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

  // ✅ Attach export menu toggler
  // document.querySelectorAll('.exportIcon').forEach(icon => {
  //   icon.addEventListener('click', (e) => {
  //     e.stopPropagation();
  //     document.querySelectorAll('.ex-menu').forEach(menu => menu.style.display = 'none');
  //     const menu = icon.nextElementSibling;
  //     if (menu) {
  //       menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
  //     }
  //   });
  // });

  // ✅ Attach export button functionality
  document.querySelectorAll('.export-buttons').forEach(buttonGroup => {
    const exportImageBtn = buttonGroup.querySelector('.exportImage');

    const cardToExport = buttonGroup.closest('.dev-card');

 const ex_menu = document.querySelector('.ex-menu');
 
      exportImageBtn.addEventListener('click', () => {
        // exportMenu.style.opacity = '0';
        html2canvas(cardToExport).then(canvas => {
// ex_menu.style.display = 'none'
          const link = document.createElement("a");
          link.download = "DevID.png";
          link.href = canvas.toDataURL();
          link.click();
          const exportMenu = buttonGroup.closest('.ex-menu');
        });
      });
    

  });
}
renderCards(devsids)
function message(cont) {
  setTimeout(() => {
     const mess = document.createElement('div')
  mess.classList.add('mess')
  mess.innerText = cont;
  }, 3000);
  mess.style.display = 'none.'
 

}
    } catch (err) {
        const card_container = document.getElementById('cardContainer');
        card_container.innerHTML = "<p>Error loading dev data.</p>";
        console.error(err);
    }
})();

// // Show/hide export menu when icon clicked
// document.querySelectorAll('.exportIcon').forEach(icon => {
//   icon.addEventListener('click', (e) => {
//     e.stopPropagation(); // prevent bubbling

//     // Hide other menus
//     document.querySelectorAll('.ex-menu').forEach(menu => menu.style.display = 'none');

//     const menu = icon.nextElementSibling;
//     if (menu) {
//       menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
//     }
//   });
// });

// // Hide menu when clicking outside
// document.addEventListener('click', () => {
//   document.querySelectorAll('.ex-menu').forEach(menu => menu.style.display = 'none');
// });
