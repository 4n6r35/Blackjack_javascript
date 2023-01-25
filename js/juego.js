/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds 
 * 2C = Two of Hearts
 * 2C = Two of Spades
 */


let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']
let puntosjugador = 0;
let puntoscomputador = 0;


//REFERENCIA DEL HTML
const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputador = document.querySelector('#computador-cartas')
const small = document.querySelectorAll('small');
const btnDetener = document.querySelector('#btnDetener');


// Creacion de una nueva baraja
const crearDeak = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos)
            deck.push(i + tipo);
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo)
        }
    }

    //console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeak();

// Funcion para tomar carta

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck'
    }
    const carta = deck.pop();
    return carta;
}

//pedirCarta();
const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}

//Turnos del computador

const turnoComputador = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
        puntoscomputador = puntoscomputador + valorCarta(carta);
        small[1].innerText = puntoscomputador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `./cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputador.append(imgCarta);
        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntoscomputador < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntoscomputador === puntosMinimos) {
            alert('Nadie gana :(');
        } else if (puntosMinimos > 21) {
            alert('Ha ganado la computadora')
        } else if (puntoscomputador > 21) {
            alert('Jugador Gana')
        }
    }, 1000);
}

// Funcion para generar cartas al iniciar juego
const cartasI = () => {
    const carta1 = pedirCarta();
    puntosjugador = puntosjugador + valorCarta(carta1);
    small[0].innerText = puntosjugador;

    const imgCarta1 = document.createElement('img');
    imgCarta1.src = `./cartas/${carta1}.png`;
    imgCarta1.classList.add('carta');
    divCartasJugador.append(imgCarta1);

    const carta2 = pedirCarta();
    puntosjugador = puntosjugador + valorCarta(carta2);
    small[0].innerText = puntosjugador;

    const imgCarta2 = document.createElement('img');
    imgCarta2.src = `./cartas/${carta2}.png`;
    imgCarta2.classList.add('carta');
    divCartasJugador.append(imgCarta2);


    const carta = pedirCarta();
    puntoscomputador = puntoscomputador + valorCarta(carta);
    small[1].innerText = puntoscomputador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `./cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasComputador.append(imgCarta);

}

cartasI();


// Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosjugador = puntosjugador + valorCarta(carta);
    small[0].innerText = puntosjugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `./cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosjugador > 21) {
        console.warn('Has perdido');
        btnPedir.disabled = true;
        btnDetener.disabled = true,
            turnoComputador(puntosjugador);
    } else if (puntosjugador === 21) {
        console.warn('21, Genial has ganado');
        btnPedir.disabled = true;
        btnDetener.disabled = true,
            turnoComputador(puntosjugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true,
        btnDetener.disabled = true,

        turnoComputador(puntosjugador);
});


btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = []
    deck = crearDeak();


    puntosjugador = 0;
    puntoscomputador = 0;

    small[0].innerText = 0;
    small[1].innerText = 0;

    divCartasComputador.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});


