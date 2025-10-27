// Banco de dados de playlists
let playlists = [
    { id: 1, name: 'Favoritas', musicas: [] }
];

// Banco de dados de músicas
const musicas = [
    {
        id: 1,
        titulo: "Piano Melody",
        artista: "Piano Artist",
        categoria: "Piano",
        capaUrl: "https://images.pexels.com/photos/415687/pexels-photo-415687.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://drive.google.com/uc?export=download&id=1mq_EUnI5JL_FXoN0ZePgR-GgWsrYe2SB"
    },
    {
        id: 2,
        titulo: "Guitar Solo",
        artista: "Guitar Master",
        categoria: "Guitar",
        capaUrl: "https://images.pexels.com/photos/2422497/pexels-photo-2422497.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://drive.google.com/uc?export=download&id=1wPe45Ln7jItsGV_ARjyEHsb12UtgN-gO"
    },
    {
        id: 3,
        titulo: "Smooth Jazz",
        artista: "Jazz Band",
        categoria: "Jazz",
        capaUrl: "https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://drive.google.com/uc?export=download&id=1QZJtYLBIYrpOGG7p4k_EvQyvXYA2L0Uy"
    },
    {
        id: 4,
        titulo: "Electronic Beat",
        artista: "DJ Mix",
        categoria: "Electronic",
        capaUrl: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://drive.google.com/uc?export=download&id=1HVJrGUPiHeMDfA6spUNK4HHM3zOaCDN4"
    },
    {
        id: 5,
        titulo: "Acoustic Session",
        artista: "Acoustic Band",
        categoria: "Acoustic",
        capaUrl: "https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-arizona.jpg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://drive.google.com/uc?export=download&id=1puLj89Td6tZXn4HaHeBXQI1zRLDZw9X_"
    },
    {
        id: 6,
        titulo: "Rock Anthem",
        artista: "Rock Band",
        categoria: "Rock",
        capaUrl: "https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://drive.google.com/uc?export=download&id=1Sh-bRGhZbvl7_CMQyDNlBwY-kMF_dh-_"
    },
    {
        id: 7,
        titulo: "Pop Hit",
        artista: "Pop Star",
        categoria: "Pop",
        capaUrl: "https://images.pexels.com/photos/1644616/pexels-photo-1644616.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://drive.google.com/uc?export=download&id=1g4B3FIi3b_yx_BEOp_yJ5AKfeBqBjuRy"
    },
    {
        id: 8,
        titulo: "Classical Symphony",
        artista: "Orchestra",
        categoria: "Classical",
        capaUrl: "https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg?auto=compress&cs=tinysrgb&w=400",
        audioUrl: "https://drive.google.com/uc?export=download&id=1b_iLVhRR9K-R2bYaxWmqBnw6_W5aqRbO"
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
    const playButton = document.querySelector(`button.play-button[data-id="${id}"]`);
    
    const atualizarBotao = (playing) => {
        if (playButton) {
            playButton.innerHTML = playing ? '⏸' : '▶';
        }
    };

    if (!audio) {
        audio = new Audio();
        audio.crossOrigin = "anonymous";
        audio.preload = "auto";
        audio.dataset.id = id;
        
        audio.addEventListener('play', () => {
            atualizarBotao(true);
            console.log('Reprodução iniciada');
        });

        audio.addEventListener('pause', () => {
            atualizarBotao(false);
            console.log('Reprodução pausada');
        });

        audio.addEventListener('ended', () => {
            atualizarBotao(false);
            console.log('Reprodução finalizada');
        });

        audio.addEventListener('error', (e) => {
            console.error('Erro no áudio:', e);
            atualizarBotao(false);
            alert('Erro ao carregar áudio. Tentando novamente...');
            
            // Tenta carregar com URL alternativo
            setTimeout(() => {
                const backupUrl = musica.audioUrl.replace('uc?export=download', 'open?id');
                console.log('Tentando URL alternativo:', backupUrl);
                audio.src = backupUrl;
            }, 1000);
        });

        document.body.appendChild(audio);
    }

    if (!audio.src || audio.error) {
        audio.src = musica.audioUrl;
    }
    
    if (audioAtual && audioAtual !== audio) {
        const oldPlayButton = document.querySelector(`button.play-button[data-id="${audioAtual.dataset.id}"]`);
        if (oldPlayButton) {
            oldPlayButton.innerHTML = '▶';
        }
        audioAtual.pause();
        audioAtual.currentTime = 0;
    }
    
    if (audio.paused) {
        const tentarTocar = async (tentativas = 3) => {
            try {
                await audio.play();
                audioAtual = audio;
            } catch (error) {
                console.error('Erro ao tocar:', error);
                if (tentativas > 0) {
                    console.log(`Tentativa ${4-tentativas}/3...`);
                    setTimeout(() => tentarTocar(tentativas - 1), 1000);
                } else {
                    alert('Não foi possível reproduzir o áudio. Tente novamente em alguns segundos.');
                    atualizarBotao(false);
                }
            }
        };
        tentarTocar();
    } else {
        audio.pause();
    }
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
                <button class="play-button" data-id="${musica.id}" onclick="tocarMusica(${musica.id})">▶</button>
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