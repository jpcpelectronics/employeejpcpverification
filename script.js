// APNI GOOGLE SHEET KA PUBLISHED CSV LINK YAHAN PASTE KAREIN
const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTNXkyZwa5p0RJh2fuCQCw9HmdT4Uwe5l-UEHQtEbBODk5chQ8GJYeNugFqWSxj4Obqv5EM-DG-z2o0/pub?gid=0&single=true&output=csv";

let employeeDatabase = [];

// Website load hote hi Google Sheet se data laayega
window.onload = function() {
    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            employeeDatabase = parseCSV(data);
            console.log("Database Synced with Google Sheets");
        })
        .catch(err => console.error("Data load nahi ho paya:", err));
};

function parseCSV(text) {
    const lines = text.split('\n');
    const result = [];
    // Headers: id, name, mobile, designation, location, manager
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i]) continue;
        const obj = {};
        const currentline = lines[i].split(',');

        headers.forEach((header, index) => {
            obj[header] = currentline[index] ? currentline[index].trim() : "";
        });
        result.push(obj);
    }
    return result;
}

function verifyEmployee() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const card = document.getElementById('resultCard');

    // Search logic for ID, Name, or Mobile
    const employee = employeeDatabase.find(emp => 
        (emp.id && emp.id.toLowerCase() === searchInput) || 
        (emp.name && emp.name.toLowerCase() === searchInput) || 
        (emp.mobile && emp.mobile === searchInput)
    );

    if (employee) {
        document.getElementById('resName').innerText = employee.name;
        document.getElementById('resDesig').innerText = employee.designation;
        document.getElementById('resLoc').innerText = employee.location;
        card.style.display = "block";
    } else {
        alert("Employee not found!");
        card.style.display = "none";
    }
}
function resetForm() {
    // 1. Search input box ko khali karein
    document.getElementById('searchInput').value = "";

    // 2. Result card ko phir se chhupa dein (hide)
    const card = document.getElementById('resultCard');
    if (card) {
        card.style.display = "none";
    }

    // 3. (Optional) Purana text bhi clear karein taaki agli baar fresh dikhe
    document.getElementById('resName').innerText = "";
    document.getElementById('resDesig').innerText = "";
    document.getElementById('resLoc').innerText = "";

}


