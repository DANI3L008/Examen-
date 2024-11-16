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
    const data = [];

    filterMenu.style.display = 'none';

    addButton.addEventListener('click', () => {
        submenuOverlay.style.display = 'flex';
    });

    cancelButton.addEventListener('click', () => {
        submenuOverlay.style.display = 'none';
        clearForm();
    });

    function clearForm() {
        document.getElementById('Iddelproveedor').value = '';
        document.getElementById('Proveedor').value = '';
        document.getElementById('Producto').value = '';
        document.getElementById('Diasdeentrega').value = '';
        document.getElementById('Horarios').value = '';
        document.getElementById('Contacto').value = '';
        document.getElementById('Correo').value = '';
        document.getElementById('Calidad').value = '';
        document.getElementById('Duracion').value = '';
    }

    saveButton.addEventListener('click', () => {
        const Iddelproveedor = document.getElementById('Iddelproveedor').value || 'N/A';
        const Proveedor = document.getElementById('Proveedor').value || 'N/A';
        const Producto = document.getElementById('Producto').value || 'N/A';
        const Diasdeentrega = document.getElementById('Diasdeentrega').value || 'N/A';
        const Horarios = document.getElementById('Horarios').value || 'N/A';
        const Contacto = document.getElementById('Contacto').value || 'N/A';
        const Correo = document.getElementById('Correo').value || 'N/A';
        const Calidad = document.getElementById('Calidad').value || 'N/A';
        const Duracion = document.getElementById('Duracion').value || 'N/A';

        const nuevoProveedor = {
            id: data.length + 1,
            iddelproveedor: Iddelproveedor,
            proveedor: Proveedor,
            producto: Producto,
            diasdeentrega: Diasdeentrega,
            horarios: Horarios,
            contacto: Contacto,
            correo: Correo,
            calidad: Calidad,
            duracion: Duracion,
            frecuencia: 'N/A'
        };

        data.push(nuevoProveedor);
        renderTable(data);
        submenuOverlay.style.display = 'none';
        clearForm();
    });

    filterButton.addEventListener('click', () => {
        filterMenu.style.display = filterMenu.style.display === 'none' ? 'block' : 'none';
    });

    applyFiltersButton.addEventListener('click', () => {
        applyFilters();
        filterMenu.style.display = 'none'; 
    });

    cancelFiltersButton.addEventListener('click', () => {
        filterMenu.style.display = 'none'; 
    });

    function applyFilters() {
        const idProveedor = document.getElementById('filterIdProveedor').value.toLowerCase();
        const proveedor = document.getElementById('filterProveedor').value.toLowerCase();
        const producto = document.getElementById('filterProducto').value.toLowerCase();
        const diasEntrega = document.getElementById('filterDiasEntrega').value.toLowerCase();
        const horarios = document.getElementById('filterHorarios').value.toLowerCase();
        const contacto = document.getElementById('filterContacto').value.toLowerCase();
        const correo = document.getElementById('filterCorreo').value.toLowerCase();
        const calidad = document.getElementById('filterCalidad').value.toLowerCase();
        const duracion = document.getElementById('filterDuracion').value.toLowerCase();

        const filteredData = data.filter(item => {
            return (
                (idProveedor ? item.iddelproveedor.toLowerCase().includes(idProveedor) : true) &&
                (proveedor ? item.proveedor.toLowerCase().includes(proveedor) : true) &&
                (producto ? item.producto.toLowerCase().includes(producto) : true) &&
                (diasEntrega ? item.diasdeentrega.toLowerCase().includes(diasEntrega) : true) &&
                (horarios ? item.horarios.toLowerCase().includes(horarios) : true) &&
                (contacto ? item.contacto.toLowerCase().includes(contacto) : true) &&
                (correo ? item.correo.toLowerCase().includes(correo) : true) &&
                (calidad ? item.calidad.toLowerCase().includes(calidad) : true) &&
                (duracion ? item.duracion.toLowerCase().includes(duracion) : true)
            );
        });

        renderTable(filteredData);
    }

    function renderTable(dataToRender) {
        tableBody.innerHTML = '';
        dataToRender.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.iddelproveedor}</td>
                <td>${item.proveedor}</td>
                <td>${item.producto}</td>
                <td>${item.diasdeentrega}</td>
                <td>${item.horarios}</td>
                <td>${item.contacto}</td>
                <td>${item.correo}</td>
                <td>${item.calidad}</td>
                <td>${item.duracion}</td>
                <td>${item.frecuencia}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderTable(data); 
});
