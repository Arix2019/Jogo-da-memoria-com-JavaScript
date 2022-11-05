const input_player = document.querySelector('.input-login')
const btn_login = document.querySelector('.btn-login')
const form = document.querySelector('.login-form')


// btn_login.onclick = () => {
//     alert(input_player.value)
// }


// habilita o botão 'jogar'
const enableBtn = () => {
    const input_text = input_player.value

    if (input_text.length > 2) {
        btn_login.removeAttribute('disabled')
        return
    }

    btn_login.setAttribute('disabled', '')
}


const submitForm = (event) => {

    event.preventDefault() // interompe o evento automatico do form
    

    // salvar o valor informado no campo 'input' ->
    // no navegador: (Armazenamento local ou local storage)
    // Ex:
    // Chave: 'player' -> valor: 'input_value'
    localStorage.setItem('player', input_player.value)
    window.location = 'pages/game.html'
}



input_player.addEventListener('input', enableBtn)
form.addEventListener('submit', submitForm)