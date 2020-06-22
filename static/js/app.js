// import the data from data.js
const tableData = data;

// Reference the HTML table using D3
var tbody = d3.select("tbody");

// empty table in html file so no dups arise upon running app
function buildTable(data) {
   tbody.html(""); 


// Create table
    data.forEach((dataRow) => {
        
        // add row to tale with each iteration
        let row = tbody.append("tr");
        
        // add value to the corresponding cell in the table
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");   
            cell.text(val); 
        
        });
    });
}

// keep track of all filters
var filters = {};


// Create function used to indicate what to do after an input is given by user
// data using D3 for date filtering
function updatedFilters() {
    let headerValue = d3.select("head").select("input");

    let newFilter = headerValue.property("value");

    let filterId = headerValue.attr("id");
    


    // if-statement “If there is a filter already set, then use that header
    // as a filter. If not, then return the default data."
    // if-statement syntax
    if (newFilter) {
        filters[filterId]= newFilter;
    }
    else {
        delete filters[filterId];
    }
    
    //rebuild table with new entry
    filterTable();
}

function filterTable() {
    let filteredData = tableData;

    //loop through to find match of new filterID
    Object.defineProperties(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row => row[key] === value);
    });

    //rebuild table
    buildTable(filteredData);
}

// Listen for form button
d3.selectAll(".filter").on("headerValue", updatedFilters);

//Build table when page loads
buildTable(tableData);
