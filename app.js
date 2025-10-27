// Banco de dados falso de músicas
const musicas = [
    {
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273d37ecb4982aa739b3714c984",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        titulo: "Imagine",
        artista: "John Lennon",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273872d05a05250c3c59b1afea6",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        titulo: "Garota de Ipanema",
        artista: "Tom Jobim",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273e9533a6a9d3c10f777000dad",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        titulo: "Billie Jean",
        artista: "Michael Jackson",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b2734121faee8df82c526cbab2be",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        titulo: "Shape of You",
        artista: "Ed Sheeran",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        titulo: "Uptown Funk",
        artista: "Mark Ronson ft. Bruno Mars",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b2736b5e78e4b253742981e555b3",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    {
        titulo: "Despacito",
        artista: "Luis Fonsi & Daddy Yankee",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273ef0d4234e1a645740f77d59c",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    {
        titulo: "Sweet Child O' Mine",
        artista: "Guns N' Roses",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273e44963b8bb127552ac761873",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    }
];

// Variável global para controlar o áudio atual
let audioAtual = null;

// Função para renderizar as músicas na página
function renderizarMusicas() {
    const container = document.getElementById('lista-de-musicas');
    container.innerHTML = ''; // Limpa o container antes de renderizar
    
    // Para cada música no array, criar um elemento HTML
    musicas.forEach((musica, index) => {
        const musicaElement = document.createElement('div');
        musicaElement.className = 'musica-card';
        
        musicaElement.innerHTML = `
            <img src="${musica.capaUrl}" alt="Capa do álbum ${musica.titulo}" 
                 onerror="this.src='https://via.placeholder.com/64'">
            <div class="musica-info">
                <div class="musica-titulo">${musica.titulo}</div>
                <div class="musica-artista">${musica.artista}</div>
            </div>
            <div class="controles">
                <audio id="audio-${index}" src="${musica.audioUrl}"></audio>
                <button class="play-button" onclick="tocarMusica(${index})">▶️</button>
                <button class="stop-button" onclick="pararMusica(${index})">⏹️</button>
            </div>
        `;
        
        container.appendChild(musicaElement);
    });
}

// Função para tocar música
function tocarMusica(index) {
    const audio = document.getElementById(`audio-${index}`);
    
    // Se houver outro áudio tocando, para ele
    if (audioAtual && audioAtual !== audio) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
    }
    
    // Se o áudio clicado estava tocando, pausa
    if (audio.paused) {
        audio.play();
        audioAtual = audio;
    } else {
        audio.pause();
    }
}

// Função para parar música
function pararMusica(index) {
    const audio = document.getElementById(`audio-${index}`);
    audio.pause();
    audio.currentTime = 0;
    if (audioAtual === audio) {
        audioAtual = null;
    }
}

// Chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', renderizarMusicas);