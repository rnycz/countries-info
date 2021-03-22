
function showData(){
const url = 'https://restcountries.eu/rest/v2/all';
fetch(url)
.then((resp) => resp.json())
.then(function(data) {
    for(var i = 0; i<data.length; i++){
      const country = data[i];
      const table = document.getElementById("country-table");
      const tr = document.createElement("tr");
      const sum = document.getElementById("sum");
      const flag = country.alpha3Code.toLowerCase();
      const text = `
      <td><img src="https://restcountries.eu/data/${flag}.svg"> ${country.name}</td>
      <td>${country.alpha3Code}</td>
      <td>${country.capital}</td>
      <td>${country.region}</td>
      <td>${country.population}</td>
      <td>${country.currencies[0].code} - ${country.currencies[0].name}</td>
      <td>${country.languages[0].name}</td>`;
      tr.innerHTML = text;
      sum.innerHTML = i;
      table.appendChild(tr);
    }
})
.catch(function(error) {
  console.log(error);
});
}

function filterData(){
  var input, filterText, table, tr, td, i, j, text, filterChoose;
  input = document.getElementById("filter");
  filterText = input.value.toUpperCase();
  table = document.getElementById("country-table");
  tr = table.getElementsByTagName("tr");
  filterChoose = document.getElementsByName("filter-choose");
  for(j = 0; j < filterChoose.length; j++){
    if(filterChoose[j].checked){
      for(i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName("td")[filterChoose[j].value];
        if(td){
          text = td.textContent || td.innerText;
          if(text.toUpperCase().indexOf(filterText) > -1){
            tr[i].style.display = "";
          }else{
            tr[i].style.display = "none";
          }
        }
      }
    }
  }
}
function clearFilter(){
  const table = document.getElementById("country-table");
  const tr = document.createElement("tr");
  const text = `
  <th>Country</th>
  <th>Country code alpha-3</th>
  <th>Capital</th>
  <th>Region</th>
  <th>Population</th>
  <th>Currency</th>
  <th>Official language</th>`;
  document.querySelector('#filter').value = "";
  var clearRadio = document.querySelector('input[type=radio][name=filter-choose]:checked');
  clearRadio.checked = false;
  while(table.hasChildNodes())
  {
     table.removeChild(table.firstChild);
  }
  tr.innerHTML = text;
  table.appendChild(tr);
  showData();
}