document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
    const submenuOverlay = document.getElementById('submenu-overlay');
    const saveButton = document.getElementById('saveButton');
    const cancelButton = document.getElementById('cancelButton');
    const addButton = document.querySelector('.add-button');

    const filterMenu = document.getElementById('filter-menu');
    const filterButton = document.querySelector('.filter-button');
    const applyFiltersButton = document.getElementById('applyFiltersButton');
    const cancelFiltersButton = document.getElementById('cancelFiltersButton');

    addButton.addEventListener('click', () => {
        submenuOverlay.style.display = 'flex';
    });

    cancelButton.addEventListener('click', () => {
        submenuOverlay.style.display = 'none';
        clearForm();
    });

    function clearForm() {
        document.getElementById('codigoProducto').value = '';
        document.getElementById('idproveedorocliente').value = '';
        document.getElementById('producto').value = '';
        document.getElementById('cantidad').value = '';
        document.getElementById('condicion').value = '';
        document.getElementById('lote').value = '';
        document.getElementById('fechadeenvioorecibido').value = '';
        document.getElementById('supervisor').value = '';
        document.getElementById('proveedorocliente').value = '';
        document.getElementById('tipodemovimiento').value = ''; 
    }

    saveButton.addEventListener('click', () => {
        const row = document.createElement('tr');
        const rowNumber = tableBody.children.length + 1;

        const codigoProducto = document.getElementById('codigoProducto').value || 'N/A';
        const idproveedorocliente = document.getElementById('idproveedorocliente').value || 'N/A';
        const producto = document.getElementById('producto').value || 'N/A';
        const cantidad = document.getElementById('cantidad').value || 'N/A';
        const condicion = document.getElementById('condicion').value || 'N/A';
        const lote = document.getElementById('lote').value || 'N/A';
        const fechadeenvioorecibido = document.getElementById('fechadeenvioorecibido').value || 'N/A';
        const supervisor = document.getElementById('supervisor').value || 'N/A';
        const proveedorocliente = document.getElementById('proveedorocliente').value || 'N/A'; 
        const tipodemovimiento = document.getElementById('tipodemovimiento').value || 'N/A'; 
        row.innerHTML = `
            <td>${rowNumber}</td>
            <td>${codigoProducto}</td>
            <td>${idproveedorocliente}</td>
            <td>${proveedorocliente}</td>
            <td>${producto}</td>
            <td>${cantidad}</td>
            <td>${condicion}</td>
            <td>${tipodemovimiento}</td>
            <td>${lote}</td>
            <td>${fechadeenvioorecibido}</td>
            <td>${supervisor}</td>
        `;

        tableBody.appendChild(row);

        submenuOverlay.style.display = 'none';
        clearForm();
    });

    filterButton.addEventListener('click', () => {
        filterMenu.style.display = 'flex';
    });

    cancelFiltersButton.addEventListener('click', () => {
        filterMenu.style.display = 'none';
        clearFilters();
    });

    applyFiltersButton.addEventListener('click', () => {
        const codigoProducto = document.getElementById('filterCodigoProducto').value.toLowerCase();
        const proveedorOCliente = document.getElementById('filterProveedorOCliente').value.toLowerCase();
        const producto = document.getElementById('filterProducto').value.toLowerCase();
        const fechaInicio = document.getElementById('filterFechaInicio').value;
        const fechaFin = document.getElementById('filterFechaFin').value;
        const cantidadMin = parseInt(document.getElementById('filterCantidadMin').value) || 0;
        const cantidadMax = parseInt(document.getElementById('filterCantidadMax').value) || Infinity;

        Array.from(tableBody.children).forEach(row => {
            const [rowCodigo, rowProveedor, rowProducto, rowCantidad, , rowFecha] = Array.from(row.children).map(cell => cell.textContent.toLowerCase());
            const cantidad = parseInt(rowCantidad) || 0;
            const fecha = rowFecha || '';

            if (
                (codigoProducto && !rowCodigo.includes(codigoProducto)) ||
                (proveedorOCliente && !rowProveedor.includes(proveedorOCliente)) ||
                (producto && !rowProducto.includes(producto)) ||
                (fechaInicio && fecha < fechaInicio) ||
                (fechaFin && fecha > fechaFin) ||
                cantidad < cantidadMin ||
                cantidad > cantidadMax
            ) {
                row.style.display = 'none';
            } else {
                row.style.display = '';
            }
        });

        filterMenu.style.display = 'none';
    });

    function clearFilters() {
        document.getElementById('filterCodigoProducto').value = '';
        document.getElementById('filterProveedorOCliente').value = '';
        document.getElementById('filterProducto').value = '';
        document.getElementById('filterFechaInicio').value = '';
        document.getElementById('filterFechaFin').value = '';
        document.getElementById('filterCantidadMin').value = '';
        document.getElementById('filterCantidadMax').value = '';
    }
});
