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
        capaUrl: "https://images.pexels.com/photos/415687/pexels-photo-415687.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://raw.githubusercontent.com/kaua18-bot/Do-Zero-ao-Deploy-com-IA/desenvolvimento/audio/song1.mp3"
    },
    {
        id: 2,
        titulo: "How Great Is Our God",
        artista: "Chris Tomlin",
        categoria: "Louvor",
        capaUrl: "https://images.pexels.com/photos/2422497/pexels-photo-2422497.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://raw.githubusercontent.com/kaua18-bot/Do-Zero-ao-Deploy-com-IA/desenvolvimento/audio/song2.mp3"
    },
    {
        id: 3,
        titulo: "Oceans",
        artista: "Hillsong UNITED",
        categoria: "Louvor",
        capaUrl: "https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://raw.githubusercontent.com/kaua18-bot/Do-Zero-ao-Deploy-com-IA/desenvolvimento/audio/song3.mp3"
    },
    {
        id: 4,
        titulo: "What A Beautiful Name",
        artista: "Hillsong Worship",
        categoria: "Louvor",
        capaUrl: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://raw.githubusercontent.com/kaua18-bot/Do-Zero-ao-Deploy-com-IA/desenvolvimento/audio/song4.mp3"
    },
    {
        id: 5,
        titulo: "Way Maker",
        artista: "Sinach",
        categoria: "Louvor",
        capaUrl: "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://raw.githubusercontent.com/kaua18-bot/Do-Zero-ao-Deploy-com-IA/desenvolvimento/audio/song5.mp3"
    },
    {
        id: 6,
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        categoria: "Rock",
        capaUrl: "https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://raw.githubusercontent.com/kaua18-bot/Do-Zero-ao-Deploy-com-IA/desenvolvimento/audio/song6.mp3"
    },
    {
        id: 7,
        titulo: "Shape of You",
        artista: "Ed Sheeran",
        categoria: "Pop",
        capaUrl: "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://raw.githubusercontent.com/kaua18-bot/Do-Zero-ao-Deploy-com-IA/desenvolvimento/audio/song7.mp3"
    },
    {
        id: 8,
        titulo: "10,000 Reasons",
        artista: "Matt Redman",
        categoria: "Louvor",
        capaUrl: "https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://raw.githubusercontent.com/kaua18-bot/Do-Zero-ao-Deploy-com-IA/desenvolvimento/audio/song8.mp3"
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
    if (!musica) {
        console.error('Música não encontrada');
        return;
    }

    let audio = document.querySelector(`audio[data-id="${id}"]`);
    
    if (!audio) {
        audio = new Audio();
        audio.crossOrigin = "anonymous";
        audio.preload = "auto";
        audio.dataset.id = id;
        
        // Evento para tratamento de erros durante o carregamento
        audio.addEventListener('error', (e) => {
            console.error('Erro ao carregar áudio:', e);
            alert('Erro ao carregar o áudio. Tentando novamente...');
            // Tenta carregar novamente após um breve delay
            setTimeout(() => {
                audio.src = musica.audioUrl + '?t=' + new Date().getTime();
            }, 1000);
        });

        // Evento para quando o áudio estiver pronto
        audio.addEventListener('canplaythrough', () => {
            console.log('Áudio pronto para reprodução');
        });

        document.body.appendChild(audio);
    }

    // Define/redefine a fonte do áudio
    if (!audio.src || audio.error) {
        audio.src = musica.audioUrl;
    }
    
    if (audioAtual && audioAtual !== audio) {
        audioAtual.pause();
        audioAtual.currentTime = 0;
    }
    
    if (audio.paused) {
        // Tenta reproduzir com retry
        const tentarTocar = async (tentativas = 3) => {
            try {
                await audio.play();
                audioAtual = audio;
                console.log('Reprodução iniciada com sucesso');
            } catch (error) {
                console.error('Erro ao tocar áudio:', error);
                if (tentativas > 0) {
                    console.log(`Tentando novamente... (${tentativas} tentativas restantes)`);
                    setTimeout(() => tentarTocar(tentativas - 1), 1000);
                } else {
                    if (error.name === 'NotAllowedError') {
                        alert('Por favor, permita a reprodução de áudio nesta página.');
                    } else if (error.name === 'NotSupportedError') {
                        alert('O formato de áudio não é suportado pelo seu navegador.');
                    } else {
                        alert('Erro ao reproduzir o áudio. Por favor, recarregue a página e tente novamente.');
                    }
                }
            }
        };

        tentarTocar();
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
    const modal = document.getElementById('create-playlist-modal');
    const selectionList = document.getElementById('music-selection-list');
    
    // Limpar seleções anteriores
    selectionList.innerHTML = '';
    
    // Adicionar todas as músicas disponíveis
    musicas.forEach(musica => {
        const musicaElement = document.createElement('div');
        musicaElement.className = 'music-selection-item';
        musicaElement.dataset.id = musica.id;
        
        musicaElement.innerHTML = `
            <img src="${musica.capaUrl}" alt="${musica.titulo}">
            <div class="title">${musica.titulo}</div>
            <div class="artist">${musica.artista}</div>
        `;
        
        musicaElement.onclick = () => {
            musicaElement.classList.toggle('selected');
        };
        
        selectionList.appendChild(musicaElement);
    });
    
    modal.style.display = 'block';
}

function hideCreatePlaylistModal() {
    document.getElementById('create-playlist-modal').style.display = 'none';
    document.getElementById('playlist-name').value = '';
}

function createPlaylistWithSongs() {
    const name = document.getElementById('playlist-name').value;
    if (!name) {
        alert('Por favor, dê um nome para a playlist');
        return;
    }
    
    const selectedSongs = Array.from(document.getElementsByClassName('music-selection-item selected'))
        .map(el => parseInt(el.dataset.id));
    
    if (selectedSongs.length === 0) {
        alert('Por favor, selecione pelo menos uma música');
        return;
    }
    
    const newPlaylist = {
        id: playlists.length + 1,
        name: name,
        musicas: selectedSongs
    };
    
    playlists.push(newPlaylist);
    renderizarPlaylists();
    hideCreatePlaylistModal();
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