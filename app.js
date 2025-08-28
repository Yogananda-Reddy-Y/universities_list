let error_count = 0;

function searchUniversities(){
    const country = document.getElementById('select_country').value;
    const table_body = document.getElementById('universites_table_body');

    const data = fetch(`unversitieslist.js`)
    .then((data) => {
        const allData = data.json();
        return allData;
    }).then((allData) => {
        
        console.log(allData);

        const originalData = allData.filter(u => u.country.toLowerCase() === country.toLowerCase());

        let universities_data = '';
        let count = 0;
        originalData.forEach(universities => {
            count++;
            universities_data += `<tr><th>${count}</th>
                                    <td>${universities.name}</td>
                                    <td>${universities.country}</td>
                                    <td>${universities["state-province"] == null ? "-" : universities["state-province"]}</td>
                                    <td>${universities.domains ? universities.domains.join(", ") : "-"}</td>
                                    <td>${universities.web_pages ? universities.web_pages.join(", ") : "-"}</td>
                                    <td>${universities.alpha_two_code}</td>
                                    <th>${count}</th>`
        });

        table_body.innerHTML = universities_data;

    }).catch((error)=> {
        console.log("apis calling failed");
        error_count++;
        if (error_count < 4) {
            searchUniversities();
        }else{
            console.log('Error fetching universities:', error);
            // Optionally show user-friendly message on the page:
            table_body.innerHTML = `<tr><td colspan="7">Failed to load data. Please try again later.</td></tr>`;
    
        }
    });
}