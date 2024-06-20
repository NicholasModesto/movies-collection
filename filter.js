document.addEventListener('DOMContentLoaded', () => {

const table = document.querySelector("table");
      
function filter(){
  const query = document.querySelector("input").value.toLowerCase();
  const rows = table.rows;  

  if(query.length <3) return;  // optional parameter
  
  for (let z=1 ; z<rows.length ; z++)
    {
	  if(rows[z].cells[0].innerText.toLowerCase().includes(query) ) rows[z].style.display="table-row";
      else rows[z].style.display="none";
    }
}

document.querySelector("input").addEventListener("input", filter);

});