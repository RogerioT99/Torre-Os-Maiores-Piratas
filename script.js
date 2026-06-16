const jogadores = [
    {
        nome: "Luffy",
        pontos: 1500,
        imagem: "images/luffy.png"
    },
    {
        nome: "Zoro",
        pontos: 1200,
        imagem: "images/zoro.png"
    },
    {
        nome: "Nami",
        pontos: 1000,
        imagem: "images/nami.png"
    },
    {
        nome: "Tixa",
        pontos: 100000000,
        imagem: "images/Tixa.jpg"
    }
];

// Eventos
document.getElementById("search").addEventListener("input", exibirRankingFiltrado);
document.getElementById("sort").addEventListener("change", exibirRankingFiltrado);

function exibirRankingFiltrado() {

    let filtrados = [...jogadores];

    // Busca
    const busca = document
        .getElementById("search")
        .value
        .toLowerCase();

    if (busca) {
        filtrados = filtrados.filter(j =>
            j.nome.toLowerCase().includes(busca)
        );
    }

    // Ordenação
    const ordem = document.getElementById("sort").value;

    filtrados.sort((a, b) =>
        ordem === "desc"
            ? b.pontos - a.pontos
            : a.pontos - b.pontos
    );

    const list = document.getElementById("ranking-list");

    list.innerHTML = "";

    filtrados.forEach((jogador, index) => {

        const li = document.createElement("li");

        li.classList.add("player-card");

        if(index === 0) li.classList.add("rank-1");
        if(index === 1) li.classList.add("rank-2");
        if(index === 2) li.classList.add("rank-3");

        let medalha = `#${index + 1}`;

        if(index === 0) medalha = "🥇";
        if(index === 1) medalha = "🥈";
        if(index === 2) medalha = "🥉";

        li.innerHTML = `
            <div class="rank-badge">
                ${medalha}
            </div>

            <img
                class="poster"
                src="${jogador.imagem}"
                alt="${jogador.nome}"
            >

            <div class="player-info">
                <h2>${jogador.nome}</h2>

                <p>
                    🏆 ${jogador.pontos.toLocaleString("pt-BR")} pontos
                </p>
            </div>
        `;

        list.appendChild(li);
    });

    atualizarEstatisticas();
}

function atualizarEstatisticas() {

    const ordenados = [...jogadores]
        .sort((a, b) => b.pontos - a.pontos);

    document.getElementById("totalPlayers").textContent =
        jogadores.length;

    document.getElementById("leaderName").textContent =
        ordenados[0].nome;

    document.getElementById("leaderPoints").textContent =
        ordenados[0].pontos.toLocaleString("pt-BR");
}

exibirRankingFiltrado();