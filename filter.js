document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('movie-table');
    const searchInput = document.getElementById('filter-input');
    let debounceTimer;

    function filter() {
        const query = searchInput.value.toLowerCase();
        const rows = table.tBodies[0]?.rows || [];

        for (let i = 0; i < rows.length; i++) {
            const titleText = rows[i].cells[0]?.textContent.toLowerCase() || '';
            const formatText = rows[i].cells[1]?.textContent.toLowerCase() || '';
            const matches = titleText.includes(query) || formatText.includes(query);
            rows[i].style.display = matches ? 'table-row' : 'none';
        }
    }

    function debouncedFilter() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(filter, 300);
    }

    searchInput.addEventListener('input', debouncedFilter);
});
