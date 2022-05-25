validaUsuarioLogado();

//INPUTS
let formulario = document.querySelector('#form-cadastro');
let inputId = document.querySelector('#input-id');
let inputDescricao = document.querySelector('#input-descricao');
let inputDetalhamento = document.querySelector('#input-detalhamento');

//BOTÂO
let botaoSalvar = document.querySelector('#btn-salvar-recados');
let botaoAtualizar = document.querySelector('#btn-atualizar');
let botaoCancelar = document.querySelector('#btn-cancelar');
let botaoSair = document.querySelector('#sair');

//TABELA
let tabelaRecados = document.querySelector('#tabela-registros');




//EVENTOS

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    adicionarNovoRegistro();
});

document.addEventListener('DOMContentLoaded', pegarDadosStorage);


function adicionarNovoRegistro() {

    let listaRecados = buscarRecadosNoStorage();

    let registroID = inputId.value;

    let existe = listaRecados.some((recados) => recados.registroID == registroID);

    if (existe) {
        alert("Já existe um recado cadastrado com esse ID !");
        inputId.value = '';
        inputId.focus();

        return
    }

    let descricao = inputDescricao.value;
    let detalhamento = inputDetalhamento.value;


    let recados = {
        registroID,
        descricao,
        detalhamento
    }

    listaRecados.push(recados);

    console.log(recados)

    salvarNaTabela(recados);
    limparCampos();
    salvarNoStorage(listaRecados);

}

function salvarNaTabela(dadosRecados) {

    let novaLinha = document.createElement('tr');
    let colunaId = document.createElement('td');
    let colunaDescricao = document.createElement('td');
    let colunaDetalhamento = document.createElement('td');
    let colunaAcoes = document.createElement('td');

    novaLinha.setAttribute('class', 'registros');
    novaLinha.setAttribute('id', dadosRecados.registroID);
    colunaId.innerHTML = dadosRecados.registroID;
    colunaDescricao.innerHTML = dadosRecados.descricao;
    colunaDetalhamento.innerHTML = dadosRecados.detalhamento;
    colunaAcoes.innerHTML = `
                            
    <button class="btn-editar" onclick="prepararEdicao(${dadosRecados.registroID})">Editar</button>
    <button class="btn-apagar" onclick="apagarRegistro(${dadosRecados.registroID})">Apagar</button>
    
    
    `

    novaLinha.appendChild(colunaId);
    novaLinha.appendChild(colunaDescricao);
    novaLinha.appendChild(colunaDetalhamento);
    novaLinha.appendChild(colunaAcoes);

    tabelaRecados.appendChild(novaLinha);

};

function limparCampos() {

    inputId.value = '';
    inputDescricao.value = '';
    inputDetalhamento.value = '';

};

function salvarNoStorage(listaRecados) {
    let indiceUsuarioLogado = sessionStorage.getItem("indiceUsuarioLogado");
    let listaUsuarios = JSON.parse(localStorage.getItem("listaUser"));

    listaUsuarios[indiceUsuarioLogado].recados = listaRecados;

    localStorage.setItem('listaUser', JSON.stringify(listaUsuarios));

};


function pegarDadosStorage() {

    let listaRecados = buscarRecadosNoStorage();

    if (listaRecados) {
        for (let registro of listaRecados) {
            salvarNaTabela(registro);
        }
    }

    return
};

function apagarRegistro(registroID) {

    let listaRecados = buscarRecadosNoStorage();
    let indiceEncontrado = listaRecados.findIndex((recados) => recados.registroID == registroID);

    let confirma = window.confirm(`Tem certeza que deseja remover o livro ID ${registroID} ?`);

    if (confirma) {

        let linhasTabela = document.querySelectorAll('.registros');

        for (const linha of linhasTabela) {

            if (linha.id == registroID) {
                tabelaRecados.removeChild(linha);
                listaRecados.splice(indiceEncontrado, 1);

                alert("Recado removido !");

            }

        }
        salvarNoStorage(listaRecados);
    } else {
        return
    }
};


function cancelarCampos() {
    limparCampos();
    botaoSalvar.setAttribute('style', 'display: inline-block');
    botaoAtualizar.setAttribute('style', 'display: none');
    botaoCancelar.setAttribute('style', 'display: none');
    inputId.removeAttribute('readonly');

};

function prepararEdicao(registroID) {

    botaoSalvar.setAttribute('style', 'display: none');
    botaoAtualizar.setAttribute('style', 'display: inline-block');
    botaoAtualizar.setAttribute('onclick', `atualizarRegistro(${registroID})`);
    botaoCancelar.setAttribute('style', 'display: inline-block');

    let listaRecados = buscarRecadosNoStorage();
    let recadoEncotrnado = listaRecados.find((recados) => recados.registroID == registroID);

    inputId.value = recadoEncotrnado.registroID
    inputDescricao.value = recadoEncotrnado.descricao;
    inputDetalhamento.value = recadoEncotrnado.detalhamento;
    inputId.setAttribute('readonly', 'true');
    inputId.focus();

};

function atualizarRegistro(registroID) {

    let novoID = inputId.value;
    let novaDescricao = inputDescricao.value;
    let novoDetalhamento = inputDetalhamento.value

    let recadoAtualizado = {
        registroID: novoID,
        descricao: novaDescricao,
        detalhamento: novoDetalhamento
    };

    let listaRecados = buscarRecadosNoStorage();
    let indiceEncontrado = listaRecados.findIndex((recados) => recados.registroID == registroID);

    listaRecados[indiceEncontrado] = recadoAtualizado;

    let linhasTabela = document.querySelectorAll('.registros');

    for (const linha of linhasTabela) {
        if (linha.id == registroID) {
            let colunas = linha.children;

            //equivale ao ID
            colunas[0].innerHTML = recadoAtualizado.registroID;

            //equivale a descricao
            colunas[1].innerHTML = recadoAtualizado.descricao

            //equivale ao detalhamento
            colunas[2].innerHTML = recadoAtualizado.detalhamento;

        }

    }

    salvarNoStorage(listaRecados);
    cancelarCampos();

}

botaoSair.addEventListener('click', sair);

botaoCancelar.addEventListener('click', cancelarCampos);

function sair() {
    sessionStorage.removeItem('indiceUsuarioLogado');
    window.location.href = "pagina-login.html";
}

function buscarRecadosNoStorage() {
    let indiceUsuarioLogado = sessionStorage.getItem("indiceUsuarioLogado");
    let listaUsuarios = JSON.parse(localStorage.getItem("listaUser"));

    return listaUsuarios[indiceUsuarioLogado].recados || [];
}

function validaUsuarioLogado() {
    let usuarioLogado = sessionStorage.getItem("indiceUsuarioLogado");

    if (!usuarioLogado) {
        alert("Você precisa estar logado para acessar os recursos dessa página!");
        window.location.href = 'pagina-login.html';
    }
}























