const body = document.querySelector('title')
const grid = document.querySelector('.grid')
const playerName = document.querySelector('.player')
const playerTimer = document.querySelector('.timer')



// array com os nomes das imagens
const characters = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer',
]


let firstCard = ''
let secondCard = ''


const resetCharacter = (msg, time) => {

    setTimeout(() => {

        firstCard.classList.remove('reveal-card')
        secondCard.classList.remove('reveal-card')
        console.log(msg)
        
        firstCard = ''
        secondCard = ''   

    }, time) 

}

const checkEndGame = () => {
    const disabledcard = document.querySelectorAll('.disable-card')

    if ( disabledcard.length === 20 ) {
        clearInterval(this.loop) //para com a contagem de tempo
        alert(`Parabéns ${playerName.innerText} - Você concluiu o desafio em: ${playerTimer.innerText} segundos.`)
    }
}


const checkSameCards = () => {
    firstCharacter  = firstCard.getAttribute('data-character')
    secondCharacter = secondCard.getAttribute('data-character')

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disable-card')        
        secondCard.firstChild.classList.add('disable-card')        
        
        console.log('Acertô, miserávi!')

        firstCard = ''
        secondCard = ''  

        checkEndGame()
        
    } else {
        
        resetCharacter('Errou!', 500)
    }
}

// cria o card de imagem
const createCard = (character) => {

    // cria elementos do tipo 'div'
    const card  = document.createElement('div')
    const front = document.createElement('div')
    const back  = document.createElement('div')

    
    // adicionanado a classe a div criada
    card.className  = 'card'
    front.className = 'face front'
    back.className  = 'face back'

    front.style.backgroundImage = `url('../imgs/${character}.png')`

    // montando o card
    card.appendChild(front)
    card.appendChild(back)

    
    // evento de clique no card
    // 'target' representa o elemento que foi clicado
    // 'parentNode' representa o elemento 'pai' do 'target'
    // 'classList.add()' adiciona uma nova classe (.reveal-card)
    card.onclick = ({ target }) => {

        // não faz nehuma ação caso o card ja tenha uma classe
        if (target.parentNode.className.includes('reveal-card')) {
            return
        }

        if (firstCard === '') {
            target.parentNode.classList.add('reveal-card')
            firstCard = target.parentNode

        } else if (secondCard === '') {
            target.parentNode.classList.add('reveal-card')
            secondCard = target.parentNode

            checkSameCards()
        }
        
    }

    card.setAttribute('data-character', character)


    // retorna o card criado
    return card
}



const loadGame = () => {

    // adiciona 2 cópias da array 'characters' a variavel 'duplicateCharacteres'
    const duplicateCharacteres = [...characters, ...characters]

    // randomiza o aparecimento dos cards
    const sortArrayCharacteres = duplicateCharacteres
                                 .sort(() => Math.random() - 0.5)


    sortArrayCharacteres.forEach((arrayCharacter) => {
        const card = createCard(arrayCharacter)
        grid.appendChild(card)
    })

}


const startTimer = () => {

    this.loop = setInterval(() => {
        const disabledcard = document.querySelectorAll('.disable-card')
        
        // Number(converte para inteiro)
        const currentTime = Number(playerTimer.innerText)
        playerTimer.innerText = currentTime + 1

    }, 1000)

}


window.onload = () => {
    const getPlayerName = localStorage.getItem('player')

    body.innerText = `Bem Vindo(a): ${getPlayerName}`

    playerName.innerText = `${getPlayerName}`

    startTimer()
    loadGame()

 
}
