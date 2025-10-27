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
        capaUrl: "https://m.media-amazon.com/images/I/71rrF6eqkUL._UF1000,1000_QL80_.jpg",
        audioUrl: "https://dl.dropboxusercontent.com/scl/fi/xt6fjc0uch5h27ht3y2g7/amazing-grace.mp3?rlkey=v40wprb2xpbgvqktih6437hxw"
    },
    {
        id: 2,
        titulo: "How Great Is Our God",
        artista: "Chris Tomlin",
        categoria: "Louvor",
        capaUrl: "https://upload.wikimedia.org/wikipedia/en/8/86/Chris_Tomlin_-_How_Great_Is_Our_God.jpg",
        audioUrl: "https://dl.dropboxusercontent.com/scl/fi/xpheqxx63bsv7mnmo8o73/how-great-is-our-god.mp3?rlkey=v40wprb2xpbgvqktih6437hxw"
    },
    {
        id: 3,
        titulo: "Oceans",
        artista: "Hillsong UNITED",
        categoria: "Louvor",
        capaUrl: "https://i.scdn.co/image/ab67616d00001e02af3d8c4ea2c9b5d1681ae0e5",
        audioUrl: "https://dl.dropboxusercontent.com/scl/fi/d6byyo5ks4ugbwqca35jc/oceans.mp3?rlkey=v40wprb2xpbgvqktih6437hxw"
    },
    {
        id: 4,
        titulo: "What A Beautiful Name",
        artista: "Hillsong Worship",
        categoria: "Louvor",
        capaUrl: "https://i.scdn.co/image/ab67616d00001e02449b39efcd85c01c32ae9551",
        audioUrl: "https://dl.dropboxusercontent.com/scl/fi/hnqpvql2akw9kh7st8aef/what-a-beautiful-name.mp3?rlkey=v40wprb2xpbgvqktih6437hxw"
    },
    {
        id: 5,
        titulo: "Way Maker",
        artista: "Sinach",
        categoria: "Louvor",
        capaUrl: "https://i1.sndcdn.com/artworks-000583616056-43q5fi-t500x500.jpg",
        audioUrl: "https://dl.dropboxusercontent.com/scl/fi/aohnfwvbv947xiv49norp/way-maker.mp3?rlkey=v40wprb2xpbgvqktih6437hxw"
    },
    {
        id: 6,
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        categoria: "Rock",
        capaUrl: "https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody_soundtrack.jpg",
        audioUrl: "https://dl.dropboxusercontent.com/scl/fi/88po1vlbkdf1p80f9nwj4/bohemian-rhapsody-sample.mp3?rlkey=v40wprb2xpbgvqktih6437hxw"
    },
    {
        id: 7,
        titulo: "Shape of You",
        artista: "Ed Sheeran",
        categoria: "Pop",
        capaUrl: "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png",
        audioUrl: "https://dl.dropboxusercontent.com/scl/fi/zkjp8gqz2c3zae1i5c0qk/shape-of-you-sample.mp3?rlkey=v40wprb2xpbgvqktih6437hxw"
    },
    {
        id: 8,
        titulo: "10,000 Reasons",
        artista: "Matt Redman",
        categoria: "Louvor",
        capaUrl: "https://upload.wikimedia.org/wikipedia/en/3/3a/10%2C000_Reasons_%28Bless_the_Lord%29_-_Matt_Redman.jpg",
        audioUrl: "https://dl.dropboxusercontent.com/scl/fi/lv7hj4wgw3rzd73ctjbfe/10000-reasons.mp3?rlkey=v40wprb2xpbgvqktih6437hxw"
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