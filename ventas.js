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

    addButton.addEventListener('click', () => {
        submenuOverlay.style.display = 'flex';
    });

    cancelButton.addEventListener('click', () => {
        submenuOverlay.style.display = 'none';
        clearForm();
    });

    function toggleFilterMenu() {
        filterMenu.style.display = filterMenu.style.display === 'none' ? 'block' : 'none';
    }

    saveButton.addEventListener('click', () => {
        const row = document.createElement('tr');
        const rowNumber = tableBody.children.length + 1;
        const codigoProducto = document.getElementById('codigoProducto').value || 'N/A';
        const producto = document.getElementById('producto').value || 'N/A';
        const cantidad = document.getElementById('cantidad').value || 'N/A';
        const precio = document.getElementById('precio').value || 'N/A';
        const fecha = document.getElementById('fecha').value || 'N/A';
        const cliente = document.getElementById('cliente').value || 'N/A';

        const nuevoProducto = {
            id: data.length + 1,
            codigo: codigoProducto,
            producto: producto,
            cantidad: cantidad,
            precioUnitario: precio,
            precioTotal: cantidad * precio,
            fechaVenta: fecha,
            cliente: cliente,
            frecuencia: 'N/A'
        };

        data.push(nuevoProducto);
        renderTable(data);

        submenuOverlay.style.display = 'none';
        clearForm();
    });

    filterButton.addEventListener('click', toggleFilterMenu);

    applyFiltersButton.addEventListener('click', () => {
        applyFilters();
        toggleFilterMenu();
    });

    cancelFiltersButton.addEventListener('click', () => {
        toggleFilterMenu();
    });

    function clearForm() {
        document.getElementById('codigoProducto').value = '';
        document.getElementById('producto').value = '';
        document.getElementById('cantidad').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('fecha').value = '';
        document.getElementById('cliente').value = '';
    }

    function applyFilters() {
        const codigo = document.getElementById('filterCodigoProducto').value.toLowerCase();
        const producto = document.getElementById('filterProducto').value.toLowerCase();
        const fechaInicio = document.getElementById('filterFechaInicio').value;
        const fechaFin = document.getElementById('filterFechaFin').value;
        const cantidadMin = parseInt(document.getElementById('filterCantidadMin').value) || 0;
        const cantidadMax = parseInt(document.getElementById('filterCantidadMax').value) || Infinity;

        const filteredData = data.filter(item => {
            const withinCodigo = codigo ? item.codigo.toLowerCase().includes(codigo) : true;
            const withinProducto = producto ? item.producto.toLowerCase().includes(producto) : true;
            const withinFecha = (fechaInicio ? new Date(item.fechaVenta) >= new Date(fechaInicio) : true) &&
                                (fechaFin ? new Date(item.fechaVenta) <= new Date(fechaFin) : true);
            const withinCantidad = item.cantidad >= cantidadMin && item.cantidad <= cantidadMax;

            return withinCodigo && withinProducto && withinFecha && withinCantidad;
        });

        renderTable(filteredData);
    }

    function renderTable(dataToRender) {
        tableBody.innerHTML = '';
        dataToRender.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.codigo}</td>
                <td>${item.producto}</td>
                <td>${item.cantidad}</td>
                <td>${item.precioUnitario}</td>
                <td>${item.precioTotal}</td>
                <td>${item.fechaVenta}</td>
                <td>${item.cliente}</td>
                <td>${item.frecuencia}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    renderTable(data); 
});
