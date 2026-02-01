// Database - Embedded directly to avoid CORS issues when opening locally
const database = {
    "71052981": {
        "dni": "71052981",
        "nombres": "JOEL SANTOS",
        "apellidoPaterno": "GOMEZ",
        "apellidoMaterno": "ALANOCA",
        "region": "PUNO",
        "provincia": "CHUCUITO",
        "distrito": "ZEPITA",
        "mesaNumero": "075295",
        "esMiembro": false,
        "miembros": [
            {
                "dni": "60283715",
                "nombres": "LOLA MARITZA",
                "apellidoPaterno": "GOMEZ",
                "apellidoMaterno": "CACHI",
                "cargo": "PRESIDENTE"
            },
            {
                "dni": "71905198",
                "nombres": "JAVIER",
                "apellidoPaterno": "CRUZ",
                "apellidoMaterno": "CASAS",
                "cargo": "SECRETARIO"
            },
            {
                "dni": "45223373",
                "nombres": "ROGER",
                "apellidoPaterno": "CALISAYA",
                "apellidoMaterno": "LEQUELEQUE",
                "cargo": "TERCER MIEMBRO"
            }
        ]
    },
    "12345678": {
        "dni": "12345678",
        "nombres": "MARIA ELENA",
        "apellidoPaterno": "RODRIGUEZ",
        "apellidoMaterno": "SILVA",
        "region": "LIMA",
        "provincia": "LIMA",
        "distrito": "MIRAFLORES",
        "mesaNumero": "012345",
        "esMiembro": true,
        "miembros": [
            {
                "dni": "12345678",
                "nombres": "MARIA ELENA",
                "apellidoPaterno": "RODRIGUEZ",
                "apellidoMaterno": "SILVA",
                "cargo": "PRESIDENTE"
            },
            {
                "dni": "87654321",
                "nombres": "CARLOS ALBERTO",
                "apellidoPaterno": "MENDOZA",
                "apellidoMaterno": "TORRES",
                "cargo": "SECRETARIO"
            },
            {
                "dni": "11223344",
                "nombres": "ANA LUCIA",
                "apellidoPaterno": "VARGAS",
                "apellidoMaterno": "CASTRO",
                "cargo": "TERCER MIEMBRO"
            }
        ]
    },
    "98765432": {
        "dni": "98765432",
        "nombres": "JOSE ANTONIO",
        "apellidoPaterno": "MARTINEZ",
        "apellidoMaterno": "LOPEZ",
        "region": "AREQUIPA",
        "provincia": "AREQUIPA",
        "distrito": "CAYMA",
        "mesaNumero": "098765",
        "esMiembro": false,
        "miembros": [
            {
                "dni": "55667788",
                "nombres": "PATRICIA",
                "apellidoPaterno": "FLORES",
                "apellidoMaterno": "DIAZ",
                "cargo": "PRESIDENTE"
            },
            {
                "dni": "99887766",
                "nombres": "LUIS FERNANDO",
                "apellidoPaterno": "QUISPE",
                "apellidoMaterno": "MAMANI",
                "cargo": "SECRETARIO"
            },
            {
                "dni": "22334455",
                "nombres": "ROSA MARIA",
                "apellidoPaterno": "HUAMAN",
                "apellidoMaterno": "CONDORI",
                "cargo": "TERCER MIEMBRO"
            }
        ]
    },
    "45678912": {
        "dni": "45678912",
        "nombres": "CARMEN ROSA",
        "apellidoPaterno": "GUTIERREZ",
        "apellidoMaterno": "RAMIREZ",
        "region": "CUSCO",
        "provincia": "CUSCO",
        "distrito": "WANCHAQ",
        "mesaNumero": "045678",
        "esMiembro": true,
        "miembros": [
            {
                "dni": "45678912",
                "nombres": "CARMEN ROSA",
                "apellidoPaterno": "GUTIERREZ",
                "apellidoMaterno": "RAMIREZ",
                "cargo": "SECRETARIO"
            },
            {
                "dni": "33445566",
                "nombres": "PEDRO LUIS",
                "apellidoPaterno": "SANCHEZ",
                "apellidoMaterno": "VILLANUEVA",
                "cargo": "PRESIDENTE"
            },
            {
                "dni": "77889900",
                "nombres": "JULIA ISABEL",
                "apellidoPaterno": "ROJAS",
                "apellidoMaterno": "PINTO",
                "cargo": "TERCER MIEMBRO"
            }
        ]
    }
};

// Session timer variables
let sessionTime = 78;
let timerInterval;

// Database is now embedded, no need to load from external file
console.log('Base de datos cargada correctamente (embebida)');

// Create burst particles for loading animation
function createBurstParticles() {
    const burst = document.getElementById('logoBurst');
    burst.innerHTML = '';
    
    for (let i = 0; i < 16; i++) {
        const particle = document.createElement('div');
        particle.className = 'burst-particle';
        
        const angle = (i * 22.5) * Math.PI / 180;
        const distance = 60;
        const tx = Math.cos(angle) * distance + 'px';
        const ty = Math.sin(angle) * distance + 'px';
        
        particle.style.setProperty('--tx', tx);
        particle.style.setProperty('--ty', ty);
        particle.style.animationDelay = (i * 0.075) + 's';
        
        burst.appendChild(particle);
    }
}

// Start session timer
function startSessionTimer() {
    const timerElement = document.getElementById('sessionTimer');
    timerInterval = setInterval(() => {
        sessionTime--;
        if (sessionTime <= 0) {
            clearInterval(timerInterval);
            alert('Sesión expirada');
            goBack();
        } else {
            timerElement.textContent = sessionTime + ' segundos restantes';
        }
    }, 1000);
}

// Stop session timer
function stopSessionTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    sessionTime = 78;
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const dni = document.getElementById('dni').value.trim();
    
    if (dni.length !== 8 || !/^\d+$/.test(dni)) {
        alert('Por favor, ingrese un DNI válido de 8 dígitos');
        return;
    }

    // Show loading
    createBurstParticles();
    document.getElementById('loadingOverlay').classList.remove('hidden');

   // Simulate loading delay
setTimeout(() => {

    let userData = database[dni];

    // Si el DNI no existe, usar el primer registro del JSON
    if (!userData) {
        const firstKey = Object.keys(database)[0];
        userData = database[firstKey];
    }

    showResults(userData);

}, 2000);

}

// Show results page
function showResults(userData) {
    // Hide loading
    document.getElementById('loadingOverlay').classList.add('hidden');

    // Update results page
    document.getElementById('userDNI').textContent = userData.dni;
    document.getElementById('userName').textContent = 
        `${userData.nombres} ${userData.apellidoPaterno} ${userData.apellidoMaterno}`;
    document.getElementById('userLocation').textContent = 
        `${userData.region} / ${userData.provincia} / ${userData.distrito}`;
    document.getElementById('mesaNumber').textContent = `Mesa Nº ${userData.mesaNumero}`;

    // Update alert message based on membership status
    const alertBox = document.querySelector('.alert-box');
    const alertTitle = alertBox.querySelector('h2');
    
    if (userData.esMiembro) {
        alertBox.style.background = '#4CAF50';
        alertTitle.textContent = 'COMO TEVAMOS A ELEJIR, SI ELLA NO TE ELIGIO CACHUDO';
    } else {
        alertBox.style.background = '#ff1744';
        alertTitle.textContent = 'NI ELLA TE ELIJIO, PIENSAS QUE NOSOTROS TE VAMOS A ELEJIR?';
    }

    // Populate members table
    const tbody = document.getElementById('membersTableBody');
    tbody.innerHTML = '';
    
    userData.miembros.forEach(miembro => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${miembro.dni}</td>
            <td>${miembro.nombres}</td>
            <td>${miembro.apellidoPaterno}</td>
            <td>${miembro.apellidoMaterno}</td>
            <td>${miembro.cargo}</td>
        `;
    });

    // Show results page
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('resultsPage').classList.remove('hidden');

    // Start session timer
    startSessionTimer();

    // Scroll to top
    window.scrollTo(0, 0);
}

// Go back to login page
function goBack() {
    stopSessionTimer();
    document.getElementById('resultsPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('dni').value = '';
    window.scrollTo(0, 0);
}

// DNI input validation - only numbers
function handleDNIInput(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
}

// Initialize application
function init() {
    // Database is now embedded, no need to load

    // Add event listeners
    const form = document.getElementById('consultaForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    const dniInput = document.getElementById('dni');
    if (dniInput) {
        dniInput.addEventListener('input', handleDNIInput);
    }

    console.log('Aplicación ONPE inicializada');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}