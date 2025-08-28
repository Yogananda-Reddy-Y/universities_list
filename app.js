let error_count = 0;

import fetch from 'node-fetch';

export default async function handler(req, res) {
  const url = `http://universities.hipolabs.com${req.url.replace('/api/proxy', '')}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy failed' });
  }
}

async function searchUniversities () {
    
    const country = document.getElementById('select_country').value;
    const table_body = document.getElementById('universites_table_body');

    try {

        const data = await fetch(`/api/proxy/search?country=${country}`);
        const originalData = await data.json();

        console.log(originalData);
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
    } catch (error) {
        error_count++;
        if (error_count < 4) {
            searchUniversities();
        }else{
            console.error('Error fetching universities:', error);
            // Optionally show user-friendly message on the page:
            table_body.innerHTML = `<tr><td colspan="7">Failed to load data. Please try again later.</td></tr>`;
    
        }
        
    }
    


}
