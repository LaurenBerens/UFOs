// import the data from data.js
const tableData = data;

// Reference the HTML table using D3
var tbody = d3.select("tbody");

// empty table in html file so no dups arise upon running app
function buildTable(data) {
   tbody.html(""); 
}

// Create table
    data.forEach((dataRow) => {
        
        // add row to tale with each iteration
        let row = tbody.append("tr");
        
        // add value to the corresponding cell in the table
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");   
            cell.text(val); 
        }
    );
});

// Create function used to indicate what to do after an input is given by user

// data using D3 for date filtering
function handleClick() {
    let date = d3.select("#datetime").property("value");
    
    // setup default filter
    let filteredData = tableData;

    // if-statement “If there is a date already set, then use that date
    // as a filter. If not, then return the default data."
    // if-statement syntax
    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    };
    buildTable(filteredData);
}
// Listen for form button
d3.selectAll("#filter-btn").on("click", handleClick);

//Build table when page loads
buildTable(tableData);