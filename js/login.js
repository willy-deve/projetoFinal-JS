
let email = document.querySelector('#emaillogin');
let labelEmail = document.querySelector('#label-input-email');

let senha = document.querySelector('#senhalogin');
let labelSenha = document.querySelector('#label-input-senha');

let error = document.querySelector('#error');

let formulario = document.querySelector('#formulario-cadastro');



formulario.addEventListener('submit', (e) => {

    e.preventDefault();

    entrar();
});

function entrar() {

    let listaUser = buscarUsuarioNoStorage();



    /* let userValid = {

        email: '',
        senha: ''
    } */

    /* listaUser.forEach((item) => {

        if (email.value == item.emailCadastro && senha.value == item.senhaCadastro) {
            userValid = {

                email: item.emailCadastro,
                senha: item.senhaCadastro
            }
        }
    }); */
    let indiceUsuarioEncontrado = listaUser.findIndex((usuario) => {
        if (usuario.emailCadastro === email.value && usuario.senhaCadastro === senha.value) {
            return usuario
        }
    });



    if (indiceUsuarioEncontrado !== -1) {
        sessionStorage.setItem("indiceUsuarioLogado", indiceUsuarioEncontrado);
        window.location.href = "pagina-recados.html";
    } else {
        email.setAttribute("style", "color: red");
        labelEmail.setAttribute("style", "border-color: red");
        senha.setAttribute("style", "color: red");
        labelSenha.setAttribute("style", "border-color: red");
        error.setAttribute("style", "display: block");
        error.innerHTML = "Usuário ou senha incorretos";
        email.focus();
    }





}

function buscarUsuarioNoStorage() {

    return JSON.parse(localStorage.getItem('listaUser')) || [];
}