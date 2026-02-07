async function loadCategoryData(category) {
    try {
        // Get the base path, handling GitHub Pages URLs like /repo-name/
        const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/pages/'));
        const dataPath = `${basePath}/data/${category}.json`;
        
        const response = await fetch(dataPath);
        const data = await response.json();

        const container = document.querySelector(`#${category}-tbody`);
        if (!container) return;

        // 2. Map and Inject
        container.innerHTML = data.map((item, index) => `
            <tr>
                <td data-label="مسلسل">${index + 1}</td>
                <td data-label="الجهة" class="name-cell">
                    <div class="logo-wrapper">
                        <img src="${basePath}/assets/logos/${item.logo}" alt="logo" class="logo">
                        <span>${item.name}</span>
                    </div>
                </td>
                <td data-label="العنوان">${item.address}</td>
                <td data-label="الخصومات">
                    ${item.discounts.map(d => `<span class="badge">${d}</span>`).join('')}
                </td>
                <td data-label="التواصل">
                    ${item.phones.map(p => `<a href="tel:${p}" class="phone-link">${p}</a>`).join('')}
                </td>
            </tr>
        `).join('');
    } catch (err) {
        console.error("Failed to load medical data:", err);
    }
}

async function loadIndex() {
    try {
        // Get the base path, handling GitHub Pages URLs like /repo-name/
        const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
        const dataPath = `${basePath}/data/index.json`;
        
        const response = await fetch(dataPath);
        const data = await response.json();

        const container = document.querySelector(`#index-nav`);
        if (!container) return;

        // 2. Map and Inject 
        container.innerHTML = data.map((item) => `
            <a href="${basePath}/pages/${item.target}" class="flexy-item">
                <figure>
                    <img src="${basePath}/assets/icons/${item.logo}">
                    <figurecaption>${item.name}</figurecaption>
                </figure>
            </a>
        `).join('');
    } catch (err) {
        console.error("Failed to load medical data:", err);
    }
}
function renderNetwork() {
    const pathname = window.location.pathname;
    
    if (pathname.includes('hospitals.html')) {
        loadCategoryData('hospitals');
    }
    else if (pathname.includes('optics.html')) {
        loadCategoryData('optics');
    }
    else if (pathname.includes('scans.html')) {
        loadCategoryData('scans');
    }
    else if (pathname.includes('labs.html')) {
        loadCategoryData('labs');
    }
    else if (pathname.includes('clinics.html')) {
        loadCategoryData('clinics');
    }
    else if (pathname.includes('therapy.html')) {
        loadCategoryData('therapy');
    }
    else if (pathname.includes('pharmacies.html')) {
        loadCategoryData('pharmacies');
    }
    else {
        // Load index for root path or index.html
        loadIndex();
    }

    // Search functionality filters across all tables simultaneously
    document.getElementById('searchBar')?.addEventListener('input', function (e) {
        const term = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    });
}
// Run rendering on page load
window.onload = renderNetwork;