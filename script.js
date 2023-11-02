const employeeGrid = document.getElementById('employee-grid');
let currentEmployeeIndex = 0;
let employees = [];

fetch('https://randomuser.me/api/?results=12&nat=us,gb,ca')  
  .then(response => response.json())
  .then(data => {
    employees = data.results;
    displayEmployees(employees);
    addSearchFunctionality(employees);
  })
  .catch(error => console.log(error));

function addSearchFunctionality(employees) {
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredEmployees = employees.filter(employee => {
      const fullName = `${employee.name.first} ${employee.name.last}`.toLowerCase();
      return fullName.includes(searchTerm);
    });
    displayEmployees(filteredEmployees);
  });
}

function displayEmployees(employees) {
  employeeGrid.innerHTML = '';
  employees.forEach((employee, index) => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
      <img src="${employee.picture.large}" alt="${employee.name.first} ${employee.name.last}">
      <div class="employee-info">
        <h3>${employee.name.first} ${employee.name.last}</h3>
        <p>${employee.email}</p>
        <p>${employee.location.city}, ${employee.location.state}</p>
      </div>
    `;
    card.addEventListener('click', () => {
      displayModal(index);
    });
    employeeGrid.appendChild(card);
  });
}

function displayModal(index) {
  const employee = employees[index];
  currentEmployeeIndex = index;

  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modal-image');
  const modalName = document.getElementById('modal-name');
  const modalEmail = document.getElementById('modal-email');
  const modalLocation = document.getElementById('modal-location');
  const modalBirthday = document.getElementById('modal-birthday');
  const modalAddress = document.getElementById('modal-address');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');

  modalImage.src = employee.picture.large;
  modalName.textContent = `${employee.name.first} ${employee.name.last}`;
  modalEmail.textContent = employee.email;
  modalLocation.textContent = `${employee.location.city}, ${employee.location.state}`;
  modalBirthday.textContent = `Birthday: ${new Date(employee.dob.date).toLocaleDateString()}`;
  modalAddress.textContent = `Address: ${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;

  modal.style.display = 'block';

  modalPrev.onclick = () => {
    displayModal(currentEmployeeIndex === 0 ? employees.length - 1 : currentEmployeeIndex - 1);
  };

  modalNext.onclick = () => {
    displayModal(currentEmployeeIndex === employees.length - 1 ? 0 : currentEmployeeIndex + 1);
  };
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Event listeners for close button and window click
const close = document.getElementById('close');
close.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
});
