// Banco de dados de playlists
let playlists = [
    { id: 1, name: 'Favoritas', musicas: [] }
];

// Banco de dados de músicas
const musicas = [
    {
        id: 1,
        titulo: "Amazing Grace",
        artista: "Chris Tomlin",
        categoria: "Louvor",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273f0f7a5b0aa8234186d887225",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        titulo: "How Great Is Our God",
        artista: "Chris Tomlin",
        categoria: "Louvor",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b2735274a9addb9186ff36a689d0",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        titulo: "Oceans",
        artista: "Hillsong UNITED",
        categoria: "Louvor",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273af3d8c4ea2c9b5d1681ae0e5",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        id: 4,
        titulo: "What A Beautiful Name",
        artista: "Hillsong Worship",
        categoria: "Louvor",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273449b39efcd85c01c32ae9551",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        id: 5,
        titulo: "Way Maker",
        artista: "Sinach",
        categoria: "Louvor",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273b85f0817773ab0a5e832925c",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    },
    {
        id: 6,
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        categoria: "Rock",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273d37ecb4982aa739b3714c984",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
    },
    {
        id: 7,
        titulo: "Shape of You",
        artista: "Ed Sheeran",
        categoria: "Pop",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
    },
    {
        id: 8,
        titulo: "10,000 Reasons",
        artista: "Matt Redman",
        categoria: "Louvor",
        capaUrl: "https://i.scdn.co/image/ab67616d0000b273af3d8c4ea2c9b5d1681ae0e5",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    }
];

// Variáveis globais
let audioAtual = null;
let musicasFiltradas = [...musicas];

// Função de busca
function searchMusic(query) {
    if (!query) {
        musicasFiltradas = [...musicas];
    } else {
        query = query.toLowerCase();
        musicasFiltradas = musicas.filter(musica => 
            musica.titulo.toLowerCase().includes(query) ||
            musica.artista.toLowerCase().includes(query) ||
            musica.categoria.toLowerCase().includes(query)
        );
    }
    renderizarMusicas();
}

// Filtrar por categoria
function filtrarPorCategoria(categoria) {
    musicasFiltradas = musicas.filter(musica => musica.categoria === categoria);
    document.getElementById('content-title').innerHTML = `<h2>${categoria}</h2>`;
    renderizarMusicas();
}

// Mostrar todas as músicas
function mostrarTodasMusicas() {
    musicasFiltradas = [...musicas];
    document.getElementById('content-title').innerHTML = '<h2>Todas as Músicas</h2>';
    renderizarMusicas();
}

// Funções de controle de áudio
function tocarMusica(id) {
    const musica = musicas.find(m => m.id === id);
    const audio = document.querySelector(`audio[data-id="${id}"]`) || new Audio(musica.audioUrl);
    audio.dataset.id = id;
    
    if (audioAtual && audioAtual !== audio) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
    }
    
    if (audio.paused) {
        audio.play();
        audioAtual = audio;
    } else {
        audio.pause();
    }
}

function pararMusica(id) {
    const audio = document.querySelector(`audio[data-id="${id}"]`);
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        if (audioAtual === audio) {
            audioAtual = null;
        }
    }
}

// Funções de playlist
function showCreatePlaylistModal() {
    document.getElementById('create-playlist-modal').style.display = 'block';
}

function hideCreatePlaylistModal() {
    document.getElementById('create-playlist-modal').style.display = 'none';
}

function createPlaylist() {
    const name = document.getElementById('playlist-name').value;
    if (name) {
        const newPlaylist = {
            id: playlists.length + 1,
            name: name,
            musicas: []
        };
        playlists.push(newPlaylist);
        renderizarPlaylists();
        hideCreatePlaylistModal();
        document.getElementById('playlist-name').value = '';
    }
}

function showAddToPlaylistModal(musicaId) {
    const modal = document.getElementById('add-to-playlist-modal');
    const optionsContainer = document.getElementById('playlist-options');
    
    optionsContainer.innerHTML = playlists.map(playlist => `
        <div class="playlist-item" onclick="addToPlaylist(${playlist.id}, ${musicaId})">
            ${playlist.name}
        </div>
    `).join('');
    
    modal.style.display = 'block';
}

function hideAddToPlaylistModal() {
    document.getElementById('add-to-playlist-modal').style.display = 'none';
}

function addToPlaylist(playlistId, musicaId) {
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist && !playlist.musicas.includes(musicaId)) {
        playlist.musicas.push(musicaId);
        renderizarPlaylists();
    }
    hideAddToPlaylistModal();
}

// Renderização
function renderizarMusicas() {
    const container = document.getElementById('lista-de-musicas');
    container.innerHTML = '';
    
    musicasFiltradas.forEach(musica => {
        const musicaElement = document.createElement('div');
        musicaElement.className = 'music-card';
        
        musicaElement.innerHTML = `
            <img src="${musica.capaUrl}" alt="Capa do álbum ${musica.titulo}" 
                 onerror="this.src='https://via.placeholder.com/150'">
            <div class="music-info">
                <div class="music-title">${musica.titulo}</div>
                <div class="music-artist">${musica.artista}</div>
                <div class="music-category">${musica.categoria}</div>
            </div>
            <div class="controls">
                <button class="play-button" onclick="tocarMusica(${musica.id})">▶</button>
                <button class="stop-button" onclick="pararMusica(${musica.id})">⏹</button>
                <button class="add-to-playlist" onclick="showAddToPlaylistModal(${musica.id})">+</button>
            </div>
            <audio data-id="${musica.id}"></audio>
        `;
        
        container.appendChild(musicaElement);
    });
}

function renderizarPlaylists() {
    const container = document.getElementById('playlist-list');
    container.innerHTML = '';
    
    playlists.forEach(playlist => {
        const playlistElement = document.createElement('div');
        playlistElement.className = 'playlist-item';
        playlistElement.textContent = `${playlist.name} (${playlist.musicas.length})`;
        playlistElement.onclick = () => mostrarMusicasPlaylist(playlist.id);
        container.appendChild(playlistElement);
    });
}

function mostrarMusicasPlaylist(playlistId) {
    const playlist = playlists.find(p => p.id === playlistId);
    if (playlist) {
        musicasFiltradas = musicas.filter(m => playlist.musicas.includes(m.id));
        document.getElementById('content-title').innerHTML = `<h2>${playlist.name}</h2>`;
        renderizarMusicas();
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarMusicas();
    renderizarPlaylists();
});