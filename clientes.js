document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
    const submenuOverlay = document.getElementById('submenu-overlay');
    const saveButton = document.getElementById('saveButton');
    const cancelButton = document.getElementById('cancelButton');
    const addButton = document.querySelector('.add-button');
    const filterButton = document.querySelector('.filter-button');
    const filterMenu = document.getElementById('filter-menu');
    const applyFiltersButton = document.getElementById('applyFiltersButton');
    const cancelFiltersButton = document.getElementById('cancelFiltersButton');

    addButton.addEventListener('click', () => {
        submenuOverlay.style.display = 'flex';
    });

    cancelButton.addEventListener('click', () => {
        submenuOverlay.style.display = 'none';
        clearForm();
    });

    filterButton.addEventListener('click', () => {
        filterMenu.style.display = 'block';
    });

    cancelFiltersButton.addEventListener('click', () => {
        filterMenu.style.display = 'none';
        clearFilters();
        filterTable();
    });

    applyFiltersButton.addEventListener('click', () => {
        filterMenu.style.display = 'none';
        filterTable();
    });

    function clearForm() {
        document.getElementById('id').value = '';
        document.getElementById('cliente').value = '';
        document.getElementById('direccion').value = '';
        document.getElementById('beneficios').value = '';
        document.getElementById('productos').value = '';
        document.getElementById('Contacto').value = '';
        document.getElementById('Correo').value = '';
        document.getElementById('tipo').value = '';
        document.getElementById('membresia').value = '';
        document.getElementById('fidelidad').value = '';
    }

    function clearFilters() {
        document.getElementById('filterIdCliente').value = '';
        document.getElementById('filterCliente').value = '';
        document.getElementById('filterDireccion').value = '';
        document.getElementById('filterBeneficios').value = '';
        document.getElementById('filterProductos').value = '';
        document.getElementById('filterContacto').value = '';
        document.getElementById('filterCorreo').value = '';
        document.getElementById('filterTipoCliente').value = '';
        document.getElementById('filterMembresia').value = '';
        document.getElementById('filterFidelidad').value = '';
    }

    function filterTable() {
        const filters = {
            id: document.getElementById('filterIdCliente').value.toLowerCase(),
            cliente: document.getElementById('filterCliente').value.toLowerCase(),
            direccion: document.getElementById('filterDireccion').value.toLowerCase(),
            beneficios: document.getElementById('filterBeneficios').value.toLowerCase(),
            productos: document.getElementById('filterProductos').value.toLowerCase(),
            contacto: document.getElementById('filterContacto').value.toLowerCase(),
            correo: document.getElementById('filterCorreo').value.toLowerCase(),
            tipo: document.getElementById('filterTipoCliente').value.toLowerCase(),
            membresia: document.getElementById('filterMembresia').value.toLowerCase(),
            fidelidad: document.getElementById('filterFidelidad').value.toLowerCase()
        };

        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const rowData = {
                id: cells[1].textContent.toLowerCase(),
                cliente: cells[2].textContent.toLowerCase(),
                direccion: cells[3].textContent.toLowerCase(),
                beneficios: cells[4].textContent.toLowerCase(),
                productos: cells[5].textContent.toLowerCase(),
                contacto: cells[6].textContent.toLowerCase(),
                correo: cells[7].textContent.toLowerCase(),
                tipo: cells[8].textContent.toLowerCase(),
                membresia: cells[9].textContent.toLowerCase(),
                fidelidad: cells[10].textContent.toLowerCase()
            };

            const matches = Object.keys(filters).every(key => {
                return rowData[key].includes(filters[key]);
            });

            if (matches) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    saveButton.addEventListener('click', () => {
        const row = document.createElement('tr');
        const rowNumber = tableBody.children.length + 1;
        const id = document.getElementById('id').value || 'N/A';
        const cliente = document.getElementById('cliente').value || 'N/A';
        const direccion = document.getElementById('direccion').value || 'N/A';
        const beneficios = document.getElementById('beneficios').value || 'N/A';
        const productos = document.getElementById('productos').value || 'N/A';
        const contacto = document.getElementById('Contacto').value || 'N/A';
        const correo = document.getElementById('Correo').value || 'N/A';
        const tipo = document.getElementById('tipo').value || 'N/A';
        const membresia = document.getElementById('membresia').value || 'N/A'; 
        const fidelidad = document.getElementById('fidelidad').value || 'N/A'; 
        row.innerHTML = `
            <td>${rowNumber}</td>
            <td>${id}</td>
            <td>${cliente}</td>
            <td>${direccion}</td>
            <td>${beneficios}</td>
            <td>${productos}</td>
            <td>${contacto}</td>
            <td>${correo}</td>
            <td>${tipo}</td>
            <td>${membresia}</td>
            <td>${fidelidad}</td>
            <td>N/A</td>
        `;

        tableBody.appendChild(row);

        submenuOverlay.style.display = 'none';
        clearForm();
    });
});
