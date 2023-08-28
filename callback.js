const { Console } = require("console");

function fetchData(url, callback) {
    // Simulate fetching data from a server
    setTimeout(() => {
        const data = { id: 1, name: "Example" };
        console.log(callback);
        callback(data); // Call the callback with the fetched data
    }, 1000);
}

function processData(data) {
    console.log("Processed data:", data);
}

fetchData("https://api.example.com/data", processData);
console.log("Fetching data...");
