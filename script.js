// Obtendo referências para o vídeo e o canvas
const video = document.getElementById('videoElement');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// Função para solicitar permissão de acesso à câmera
function requestCameraPermission() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(error => {
            console.error('Erro ao acessar a webcam: ', error);
        });
}

// Função para capturar a foto
function capture() {
    // Verificando se a permissão de acesso à câmera já foi concedida
    if (video.srcObject === null) {
        requestCameraPermission();
        return;
    }

    // Desenhando o frame atual do vídeo no canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertendo o conteúdo do canvas para uma URL de dados (data URL)
    const dataURL = canvas.toDataURL('image/png');

    // Criando um elemento de imagem para exibir a foto capturada
    const img = new Image();
    img.src = dataURL;

    // Adicionando a imagem ao corpo da página
    document.body.appendChild(img);
}
