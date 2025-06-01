document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector("table");
    const searchInput = document.querySelector("input");
    let debounceTimer;
      
    function filter(){
        const query = searchInput.value.toLowerCase();
        const rows = table.rows;  
        
        for (let z=1; z<rows.length; z++) {
            if(rows[z].cells[0].innerText.toLowerCase().includes(query)) {
                rows[z].style.display="table-row";
            } else {
                rows[z].style.display="none";
            }
        }
    }
    
    function debouncedFilter() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(filter, 300);
    }
    
    searchInput.addEventListener("input", debouncedFilter);
});