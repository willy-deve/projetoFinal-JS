
/////////////// CRIAÇÂO DAS VARIAVEIS ///////////////

let campoEmail = document.getElementById('emaillogin');
let labelEmail = document.getElementById('label-input-email');
let validEmail = false;

let campoSenha = document.getElementById('senhalogin');
let labelSenha = document.getElementById('label-input-senha');
let validSenha = false;

let campoConfirmaSenha = document.getElementById('repita-senha');
let labelConfirmaSenha = document.getElementById('label-input-cofirme-senha');
let validConfirmaSenha = false;


let botao = document.getElementById('btn-cadastro');
let formulario = document.getElementById('formulario-cadastro');

let contas = localStorage.getItem('listaUser');
let user = JSON.parse(contas);

let sucesso = document.getElementById('sucesso');
let error = document.getElementById('error');

let repetMail = true;



/////////////// EVENTOS /////////////// 

campoEmail.addEventListener('keyup', verificaEmail);
campoSenha.addEventListener('keyup', verificaSenha);
campoConfirmaSenha.addEventListener('keyup', confirmaSenha);

formulario.addEventListener('submit', (e) => {

    e.preventDefault();

    verificaCampos();
});

//botao.addEventListener('click', verificaCampos);





/////////////// FUNÇÔES PARA VALIDAR EMAIL E SENHA ///////////////


function verificaEmail() {


    if (campoEmail.value.length < 10) {

        labelEmail.setAttribute('style', 'color: red');
        labelEmail.innerHTML = ('E-mail: *Insira no minimo 10 caracteres');
        campoEmail.setAttribute('style', 'display: block; margin-bottom: 15px; widht: 400px; border-color: red;');

        validEmail = false;

    } else {
        labelEmail.setAttribute('style', 'color: green');
        labelEmail.innerHTML = ('E-mail: ');
        campoEmail.setAttribute('style', 'display: block; margin-bottom: 15px; widht: 400px; border-color: green;');

        validEmail = true;
    };

    user.forEach((item) => {

        if (campoEmail.value === item.emailCadastro) {

            error.setAttribute('style', 'display: block')
            error.innerHTML = 'Já existe um e-mail cadastrado'

            repetMail = false
        } else {
            repetMail = true
        }

    });

};



function verificaSenha() {

    if (campoSenha.value.length < 3) {

        labelSenha.setAttribute('style', 'color: red');
        labelSenha.innerHTML = ('Senha: *Insira no minimo 8 caracteres');
        campoSenha.setAttribute('style', 'display: block; margin-bottom: 15px; widht: 400px; border-color: red;');

        validSenha = false;

    } else {

        labelSenha.setAttribute('style', 'color: green');
        labelSenha.innerHTML = ('Senha: ');
        campoSenha.setAttribute('style', 'display: block; margin-bottom: 15px; widht: 400px; border-color: green;');

        validSenha = true;
    }
};





function confirmaSenha() {

    if (campoSenha.value !== campoConfirmaSenha.value) {

        labelConfirmaSenha.setAttribute('style', 'color: red');
        labelConfirmaSenha.innerHTML = ('Senha: *A senhas não correspondem');
        campoConfirmaSenha.setAttribute('style', 'display: block; margin-bottom: 15px; widht: 400px; border-color: red;');

        validConfirmaSenha = false;

    } else {

        labelConfirmaSenha.setAttribute('style', 'color: green');
        labelConfirmaSenha.innerHTML = ('Senhas correspondem: ');
        campoConfirmaSenha.setAttribute('style', 'display: block; margin-bottom: 15px; widht: 400px; border-color: green;');

        validConfirmaSenha = true;

    }
};


/////////////// FUNÇÂO PARA VALIDAR O CADASTRO ///////////////

function verificaCampos() {

    if (validEmail && validSenha && validConfirmaSenha && repetMail) {

        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

        listaUser.push(

            {
                emailCadastro: campoEmail.value,
                senhaCadastro: campoSenha.value,
                recados: []
            }
        );

        localStorage.setItem('listaUser', JSON.stringify(listaUser));



        sucesso.setAttribute('style', 'display: block');
        sucesso.innerHTML = 'Cadastrando usuário...'


        error.setAttribute = ('style', 'display: none');
        error.innerHTML = '';

        setTimeout(() => {

            window.location.href = 'pagina-login.html'

        }, 2000)



    } else {

        error.setAttribute('style', 'display: block');
        error.innerHTML = 'Campos incorretos. Por favor verifique se os campos !'

        sucesso.innerHTML = '';
        sucesso.setAttribute('style', 'display: none');

        return
    }
};






