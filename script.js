document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('crud-form');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const indexInput = document.getElementById('index');
    const tableBody = document.getElementById('crud-table-body');

    let items = JSON.parse(localStorage.getItem('items')) || [];

    function renderTable() {
        tableBody.innerHTML = '';
        items.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td class="actions">
                    <button onclick="editItem(${index})">Editar</button>
                    <button class="delete" onclick="deleteItem(${index})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.editItem = function (index) {
        const item = items[index];
        nameInput.value = item.name;
        ageInput.value = item.age;
        emailInput.value = item.email;
        phoneInput.value = item.phone;
        indexInput.value = index;
    };

    window.deleteItem = function (index) {
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        renderTable();
    };

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = nameInput.value;
        const age = ageInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const index = indexInput.value;

        if (index === '') {
            items.push({ name, age, email, phone });
        } else {
            items[index] = { name, age, email, phone };
        }

        localStorage.setItem('items', JSON.stringify(items));
        renderTable();
        form.reset();
        indexInput.value = '';
    });

    renderTable();
});
