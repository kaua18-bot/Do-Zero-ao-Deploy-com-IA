// Banco de dados falso de músicas
const musicas = [
    {
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        capaUrl: "https://example.com/imagens/bohemian.jpg"
    },
    {
        titulo: "Imagine",
        artista: "John Lennon",
        capaUrl: "https://example.com/imagens/imagine.jpg"
    },
    {
        titulo: "Garota de Ipanema",
        artista: "Tom Jobim",
        capaUrl: "https://example.com/imagens/ipanema.jpg"
    },
    {
        titulo: "Billie Jean",
        artista: "Michael Jackson",
        capaUrl: "https://example.com/imagens/billiejean.jpg"
    }
];

// Função para renderizar as músicas na página
function renderizarMusicas() {
    const container = document.getElementById('lista-de-musicas');
    
    // Para cada música no array, criar um elemento HTML
    musicas.forEach(musica => {
        const musicaElement = document.createElement('div');
        musicaElement.className = 'musica-card';
        
        musicaElement.innerHTML = `
            <img src="${musica.capaUrl}" alt="Capa do álbum ${musica.titulo}" 
                 onerror="this.src='https://via.placeholder.com/64'">
            <div class="musica-info">
                <div class="musica-titulo">${musica.titulo}</div>
                <div class="musica-artista">${musica.artista}</div>
            </div>
        `;

        // Adicionar evento de clique no card
        musicaElement.addEventListener('click', () => {
            alert(`Tocando: ${musica.titulo} - ${musica.artista}`);
        });
        
        container.appendChild(musicaElement);
    });
}

// Chamar a função quando a página carregar
document.addEventListener('DOMContentLoaded', renderizarMusicas);