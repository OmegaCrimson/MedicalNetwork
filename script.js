async function loadCategoryData(category) {
    try {
        // 1. Fetch the JSON file based on the page category
        const response = await fetch(`../data/${category}.json`);
        const data = await response.json();

        const container = document.querySelector(`#${category}-tbody`);
        if (!container) return;

        // 2. Map and Inject
        container.innerHTML = data.map((item, index) => `
            <tr>
                <td data-label="مسلسل">${index + 1}</td>
                <td data-label="الجهة" class="name-cell">
                    <div class="logo-wrapper">
                        <img src="../assets/logos/${item.logo}" alt="logo" class="logo">
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
        // 1. Fetch the JSON file based on the page category
        const response = await fetch(`./data/index.json`);
        const data = await response.json();

        const container = document.querySelector(`#index-nav`);
        if (!container) return;

        // 2. Map and Inject
        container.innerHTML = data.map((item) => `
            <a href="pages/${item.target}" class="flexy-item">
                <figure>
                    <img src="assets/icons/${item.logo}">
                    <figurecaption>${item.name}</figurecaption>
                </figure>
            </a>
        `).join('');
    } catch (err) {
        console.error("Failed to load medical data:", err);
    }
}
// Check which page we are on and load corresponding data
function renderNetwork() {
    if (window.location.pathname.includes('hospitals.html')) {
        loadCategoryData('hospitals');
    }
    else if (window.location.pathname.includes('optics.html')) {
        loadCategoryData('optics');
    }
    else if (window.location.pathname.includes('scans.html')) {
        loadCategoryData('scans');
    }
    else if (window.location.pathname.includes('labs.html')) {
        loadCategoryData('labs');
    }
    else if (window.location.pathname.includes('clinics.html')) {
        loadCategoryData('clinics');
    }
    else if (window.location.pathname.includes('therapy.html')) {
        loadCategoryData('therapy');
    }
    else if (window.location.pathname.includes('pharmacies.html')) {
        loadCategoryData('pharmacies');
    }
    // Add else-if blocks for pharmacies, labs, etc.
    else if (window.location.pathname.includes('index.html')) {
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