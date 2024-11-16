document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
    const submenuOverlay = document.getElementById('submenu-overlay');
    const saveButton = document.getElementById('saveButton');
    const cancelButton = document.getElementById('cancelButton');
    const addButton = document.querySelector('.add-button');
    const filterMenu = document.getElementById('filter-menu');
    const applyFiltersButton = document.getElementById('applyFiltersButton');
    const cancelFiltersButton = document.getElementById('cancelFiltersButton');
    
    const filterInputs = {
        codigoProducto: document.getElementById('filterCodigoProducto'),
        proveedor: document.getElementById('filterProveedor'),
        producto: document.getElementById('filterProducto'),
        cantidadMin: document.getElementById('filterCantidadMin'),
        cantidadMax: document.getElementById('filterCantidadMax'),
    };

    addButton.addEventListener('click', () => {
        submenuOverlay.style.display = 'flex';
    });

    cancelButton.addEventListener('click', () => {
        submenuOverlay.style.display = 'none';
        clearForm();
    });

    function clearForm() {
        document.getElementById('codigoProducto').value = '';
        document.getElementById('proveedor').value = '';
        document.getElementById('producto').value = '';
        document.getElementById('cantidad').value = '';
        document.getElementById('medidas').value = '';
        document.getElementById('lote').value = '';
        document.getElementById('fechaFabricacion').value = '';
    }

    saveButton.addEventListener('click', () => {
        const row = document.createElement('tr');
        const rowNumber = tableBody.children.length + 1;

        const codigoProducto = document.getElementById('codigoProducto').value || 'N/A';
        const proveedor = document.getElementById('proveedor').value || 'N/A';
        const producto = document.getElementById('producto').value || 'N/A';
        const cantidad = document.getElementById('cantidad').value || 'N/A';
        const medidas = document.getElementById('medidas').value || 'N/A';
        const lote = document.getElementById('lote').value || 'N/A';
        const fechaFabricacion = document.getElementById('fechaFabricacion').value || 'N/A';

        row.innerHTML = `
            <td>${rowNumber}</td>
            <td>${codigoProducto}</td>
            <td>${proveedor}</td>
            <td>${producto}</td>
            <td>${cantidad}</td>
            <td>${medidas}</td>
            <td>${lote}</td>
            <td>${fechaFabricacion}</td>
            <td>N/A</td>
        `;

        tableBody.appendChild(row);

        submenuOverlay.style.display = 'none';
        clearForm();
    });

    document.querySelector('.filter-button').addEventListener('click', () => {
        filterMenu.style.display = filterMenu.style.display === 'none' ? 'block' : 'none';
    });

    applyFiltersButton.addEventListener('click', () => {
        const filters = {
            codigoProducto: filterInputs.codigoProducto.value.toLowerCase(),
            proveedor: filterInputs.proveedor.value.toLowerCase(),
            producto: filterInputs.producto.value.toLowerCase(),
            cantidadMin: filterInputs.cantidadMin.value,
            cantidadMax: filterInputs.cantidadMax.value,
        };

        Array.from(tableBody.children).forEach((row) => {
            const [codigoProducto, proveedor, producto, cantidad] = [
                row.children[1].innerText.toLowerCase(),
                row.children[2].innerText.toLowerCase(),
                row.children[3].innerText.toLowerCase(),
                parseFloat(row.children[4].innerText),
            ];

            const match =
                (!filters.codigoProducto || codigoProducto.includes(filters.codigoProducto)) &&
                (!filters.proveedor || proveedor.includes(filters.proveedor)) &&
                (!filters.producto || producto.includes(filters.producto)) &&
                (!filters.cantidadMin || cantidad >= parseFloat(filters.cantidadMin)) &&
                (!filters.cantidadMax || cantidad <= parseFloat(filters.cantidadMax));

            row.style.display = match ? '' : 'none';
        });

        filterMenu.style.display = 'none';
    });

    cancelFiltersButton.addEventListener('click', () => {
        filterMenu.style.display = 'none';
        clearFilters();
    });

    function clearFilters() {
        filterInputs.codigoProducto.value = '';
        filterInputs.proveedor.value = '';
        filterInputs.producto.value = '';
        filterInputs.cantidadMin.value = '';
        filterInputs.cantidadMax.value = '';
    }
});
