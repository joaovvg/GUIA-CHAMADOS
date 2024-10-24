// Carrega os chamados do localStorage ou inicia com um array vazio
let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

// Gera um código alfanumérico de 10 dígitos
function gerarCodigoChamado() {
    return Math.random().toString(36).substr(2, 10).toUpperCase();
}

// Função para lidar com a abertura de chamados
document.getElementById("formChamado")?.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const local = document.getElementById("local").value;
    const descricao = document.getElementById("descricao").value;

    const codigo = gerarCodigoChamado();
    const novoChamado = {
        nome,
        telefone,
        whatsapp,
        local,
        descricao,
        codigo,
        status: "Aberto"
    };

    chamados.push(novoChamado);
    localStorage.setItem("chamados", JSON.stringify(chamados)); // Salva os chamados no localStorage

    alert(`Chamado aberto com sucesso! Código: ${codigo}`);
    window.location.href = "index.html"; // Redireciona para a página principal
});

// Função para controlar o login do administrador
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário
    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    if (login === "administrador" && senha === "123456") {
        alert("Login bem-sucedido!");
        window.location.href = "gerencia.html"; // Redireciona para a página de gerenciamento
    } else {
        alert("Login ou senha incorretos. Tente novamente.");
    }
});

// Função para pesquisar o chamado na página de acompanhamento
document.getElementById("pesquisarChamado")?.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário
    const codigo = document.getElementById("codigo").value;
    const chamado = chamados.find(ch => ch.codigo === codigo);

    const detalhes = document.getElementById("detalhesChamado");
    detalhes.innerHTML = ""; // Limpa detalhes anteriores

    if (chamado) {
        // Exibe os detalhes do chamado
        detalhes.innerHTML = `
            <h2>Detalhes do Chamado</h2>
            <p><strong>Código:</strong> ${chamado.codigo}</p>
            <p><strong>Nome:</strong> ${chamado.nome}</p>
            <p><strong>Telefone:</strong> ${chamado.telefone}</p>
            <p><strong>Whatsapp:</strong> ${chamado.whatsapp}</p>
            <p><strong>Local:</strong> ${chamado.local}</p>
            <p><strong>Descrição:</strong> ${chamado.descricao}</p>
            <p><strong>Status:</strong> ${chamado.status}</p>
        `;
    } else {
        alert("Chamado não encontrado.");
    }
});

// Função para exibir chamados na página de gerenciamento
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("listaChamados")) {
        const listaChamados = document.getElementById("listaChamados");
        listaChamados.innerHTML = ""; // Limpa a lista anterior

        chamados.forEach((chamado) => {
            const divChamado = document.createElement("div");
            divChamado.className = "chamado";
            divChamado.innerHTML = `
                <h3>Código: ${chamado.codigo}</h3>
                <p><strong>Nome:</strong> ${chamado.nome}</p>
                <p><strong>Telefone:</strong> ${chamado.telefone}</p>
                <p><strong>Whatsapp:</strong> ${chamado.whatsapp}</p>
                <p><strong>Local:</strong> ${chamado.local}</p>
                <p><strong>Descrição:</strong> ${chamado.descricao}</p>
                <p><strong>Status:</strong> ${chamado.status}</p>
                <button onclick="arquivarChamado('${chamado.codigo}')">Arquivar Chamado</button>
                <button onclick="preencherStatus('${chamado.codigo}')">Preencher Status</button>
                <button onclick="responderChamado('${chamado.codigo}')">Responder Chamado</button>
            `;
            listaChamados.appendChild(divChamado);
        });
    }
});

// Função para arquivar chamado
function arquivarChamado(codigo) {
    chamados = chamados.filter(ch => ch.codigo !== codigo);
    localStorage.setItem("chamados", JSON.stringify(chamados));
    alert(`Chamado ${codigo} arquivado com sucesso.`);
    window.location.reload(); // Atualiza a lista
}

// Função para preencher status
function preencherStatus(codigo) {
    const status = prompt("Informe o novo status (em andamento/previsão para):");
    const data = status === "previsão para" ? prompt("Informe a data:") : "";

    const chamado = chamados.find(ch => ch.codigo === codigo);
    if (chamado) {
        chamado.status = status + (data ? ` - ${data}` : "");
        localStorage.setItem("chamados", JSON.stringify(chamados));
        alert(`Status do chamado ${codigo} atualizado para: ${chamado.status}`);
        window.location.reload(); // Atualiza a lista
    }
}

// Função para responder chamado
function responderChamado(codigo) {
    const resposta = prompt("Digite sua resposta:");
    const chamado = chamados.find(ch => ch.codigo === codigo);
    if (chamado) {
        chamado.resposta = resposta;
        localStorage.setItem("chamados", JSON.stringify(chamados));
        alert(`Resposta para o chamado ${codigo} registrada com sucesso.`);
        window.location.reload(); // Atualiza a lista
    }
    // Função para pesquisar o chamado na página de acompanhamento
document.getElementById("pesquisarChamado")?.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário
    const codigo = document.getElementById("codigo").value;
    const chamado = chamados.find(ch => ch.codigo === codigo);

    const detalhes = document.getElementById("detalhesChamado");
    detalhes.innerHTML = ""; // Limpa detalhes anteriores

    if (chamado) {
        // Exibe os detalhes do chamado
        detalhes.innerHTML = `
            <h2>Detalhes do Chamado</h2>
            <p><strong>Código:</strong> ${chamado.codigo}</p>
            <p><strong>Nome:</strong> ${chamado.nome}</p>
            <p><strong>Telefone:</strong> ${chamado.telefone}</p>
            <p><strong>Whatsapp:</strong> ${chamado.whatsapp}</p>
            <p><strong>Local:</strong> ${chamado.local}</p>
            <p><strong>Descrição:</strong> ${chamado.descricao}</p>
            <p><strong>Status:</strong> ${chamado.status}</p>
        `;
    } else {
        alert("Chamado não encontrado.");
    }
});
 // Carrega os chamados do localStorage ou inicia com um array vazio
let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
let chamadosArquivados = JSON.parse(localStorage.getItem("chamadosArquivados")) || [];

// Gera um código alfanumérico de 10 dígitos
function gerarCodigoChamado() {
    return Math.random().toString(36).substr(2, 10).toUpperCase();
}

// Função para lidar com a abertura de chamados
document.getElementById("formChamado")?.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const local = document.getElementById("local").value;
    const descricao = document.getElementById("descricao").value;

    const novoChamado = {
        codigo: gerarCodigoChamado(),
        nome,
        telefone,
        whatsapp,
        local,
        descricao,
        status: "Aberto"
    };

    chamados.push(novoChamado);
    localStorage.setItem("chamados", JSON.stringify(chamados));

    alert("Chamado aberto com sucesso! Código: " + novoChamado.codigo);
    document.getElementById("formChamado").reset();
});

// Função para acompanhar um chamado
document.getElementById("pesquisarChamado")?.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário
    const codigo = document.getElementById("codigo").value;
    const chamado = chamados.find(chamado => chamado.codigo === codigo);
    
    const detalhesChamado = document.getElementById("detalhesChamado");
    if (chamado) {
        detalhesChamado.innerHTML = `
            <h3>Detalhes do Chamado</h3>
            <p><strong>Código:</strong> ${chamado.codigo}</p>
            <p><strong>Nome:</strong> ${chamado.nome}</p>
            <p><strong>Telefone:</strong> ${chamado.telefone}</p>
            <p><strong>WhatsApp:</strong> ${chamado.whatsapp}</p>
            <p><strong>Local:</strong> ${chamado.local}</p>
            <p><strong>Descrição:</strong> ${chamado.descricao}</p>
            <p><strong>Status:</strong> ${chamado.status}</p>
        `;
    } else {
        detalhesChamado.innerHTML = "<p>Nenhum chamado encontrado com este código.</p>";
    }
});

// Função para gerenciar os chamados
function carregarChamadosGerencia() {
    const listaChamados = document.getElementById("listaChamados");
    listaChamados.innerHTML = ""; // Limpa a lista anterior

    chamados.forEach((chamado) => {
        const divChamado = document.createElement("div");
        divChamado.className = "chamado";
        divChamado.innerHTML = `
            <h3>Código: ${chamado.codigo}</h3>
            <p><strong>Nome:</strong> ${chamado.nome}</p>
            <p><strong>Telefone:</strong> ${chamado.telefone}</p>
            <p><strong>WhatsApp:</strong> ${chamado.whatsapp}</p>
            <p><strong>Local:</strong> ${chamado.local}</p>
            <p><strong>Descrição:</strong> ${chamado.descricao}</p>
            <p><strong>Status:</strong> ${chamado.status}</p>
            <button onclick="arquivarChamado('${chamado.codigo}')">Arquivar Chamado</button>
            <button onclick="responderChamado('${chamado.codigo}')">Responder Chamado</button>
        `;
        
        const separador = document.createElement("div");
        separador.className = "separador";
        
        listaChamados.appendChild(divChamado);
        listaChamados.appendChild(separador);
    });
}

// Função para arquivar um chamado
function arquivarChamado(codigo) {
    const index = chamados.findIndex(chamado => chamado.codigo === codigo);
    if (index !== -1) {
        // Altera o status do chamado para Arquivado
        chamados[index].status = "Arquivado";

        // Adiciona o chamado à lista de arquivados
        chamadosArquivados.push(chamados[index]);
        
        // Remove o chamado da lista de chamados abertos
        chamados.splice(index, 1);
        
        // Atualiza o localStorage
        localStorage.setItem("chamados", JSON.stringify(chamados));
        localStorage.setItem("chamadosArquivados", JSON.stringify(chamadosArquivados));
        
        alert("Chamado arquivado com sucesso!");
        
        // Atualiza a lista de chamados
        carregarChamadosGerencia(); 
    }
}

// Função para carregar chamados arquivados
function carregarChamadosArquivados() {
    const listaArquivados = document.getElementById("listaArquivados");
    listaArquivados.innerHTML = ""; // Limpa a lista anterior

    chamadosArquivados.forEach((chamado) => {
        const divChamado = document.createElement("div");
        divChamado.className = "chamado";
        divChamado.innerHTML = `
            <h3>Código: ${chamado.codigo}</h3>
            <p><strong>Nome:</strong> ${chamado.nome}</p>
            <p><strong>Telefone:</strong> ${chamado.telefone}</p>
            <p><strong>WhatsApp:</strong> ${chamado.whatsapp}</p>
            <p><strong>Local:</strong> ${chamado.local}</p>
            <p><strong>Descrição:</strong> ${chamado.descricao}</p>
            <p><strong>Status:</strong> ${chamado.status}</p>
        `;
        
        const separador = document.createElement("div");
        separador.className = "separador";
        
        listaArquivados.appendChild(divChamado);
        listaArquivados.appendChild(separador);
    });
}



}
