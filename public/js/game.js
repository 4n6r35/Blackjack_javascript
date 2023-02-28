/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds 
 * 2C = Two of Hearts
 * 2C = Two of Spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']
let puntosjugador1 = 0;
let puntosjugador2 = 0;
let puntoscomputador = 0;


//REFERENCIA DEL HTML
const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnPedirp = document.querySelector('#btnPedirp');
const divCartasJugador1 = document.querySelector('#jugador-cartas');
const divCartasJugador2 = document.querySelector('#jugador-cartas2');
const divCartasComputador = document.querySelector('#computador-cartas');

///Puntos del Jugador
const small = document.querySelectorAll('small');
const btnDetener = document.querySelector('#btnDetener');
const btnDetenerd = document.querySelector('#btnDetenerd');


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
///[Carta Dealer]
const turnoComputador = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
        puntoscomputador = puntoscomputador + valorCarta(carta);
        small[0].innerText = puntoscomputador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `../assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputador.append(imgCarta);


        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntoscomputador < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if (puntoscomputador === puntosMinimos) {
            alert('Nadie gana :(');
            // ReiniciarJuego();
        } else if (puntosMinimos > 21 || puntosMinimos < puntoscomputador && puntoscomputador < 21) {
            alert('Ha ganado la computadora');
            // ReiniciarJuego();
        } else if (puntoscomputador > 21) {
            alert('Jugador Gana');
            // ReiniciarJuego();
        }
    }, 1000);

}


// Funcion para generar cartas al iniciar juego
const cartasI = () => {
    //Cartas dealer
    const carta = pedirCarta();
    puntoscomputador = puntoscomputador + valorCarta(carta);
    small[0].innerText = puntoscomputador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `../assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasComputador.append(imgCarta);

    //Cartas jugador 1
    const carta1 = pedirCarta();
    puntosjugador1 = puntosjugador1 + valorCarta(carta1);
    small[1].innerText = puntosjugador1;

    const imgCartaj1_1 = document.createElement('img');
    imgCartaj1_1.src = `../assets/cartas/${carta1}.png`;
    imgCartaj1_1.classList.add('carta');
    divCartasJugador1.append(imgCartaj1_1);

    const carta2 = pedirCarta();
    puntosjugador1 = puntosjugador1 + valorCarta(carta2);
    small[1].innerText = puntosjugador1;

    const imgCartaj1_2 = document.createElement('img');
    imgCartaj1_2.src = `../assets/cartas/${carta2}.png`;
    imgCartaj1_2.classList.add('carta');
    divCartasJugador1.append(imgCartaj1_2);

    //Cartas jugador 2
    const cartaj2_1 = pedirCarta();
    puntosjugador2 = puntosjugador2 + valorCarta(cartaj2_1);
    small[2].innerText = puntosjugador2;

    const imgCartaj2_1 = document.createElement('img');
    imgCartaj2_1.src = `../assets/cartas/${cartaj2_1}.png`;
    imgCartaj2_1.classList.add('carta');
    divCartasJugador2.append(imgCartaj2_1);

    const cartaj2_2 = pedirCarta();
    puntosjugador2 = puntosjugador2 + valorCarta(cartaj2_2);
    small[2].innerText = puntosjugador2;

    const imgCartaj2_2 = document.createElement('img');
    imgCartaj2_2.src = `../assets/cartas/${cartaj2_2}.png`;
    imgCartaj2_2.classList.add('carta');
    divCartasJugador2.append(imgCartaj2_2);

}
cartasI();

// Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosjugador1 = puntosjugador1 + valorCarta(carta);
    small[1].innerText = puntosjugador1;

    const imgCartaJ1 = document.createElement('img');
    imgCartaJ1.src = `../assets/cartas/${carta}.png`;
    imgCartaJ1.classList.add('carta');
    divCartasJugador1.append(imgCartaJ1);

    if (puntosjugador1 > 21) {
        console.warn('Has perdido');
        btnPedir.disabled = true;
        btnDetener.disabled = true,
            turnoComputador(puntosjugador1);

    } else if (puntosjugador1 === 21) {
        console.warn('21, Genial has ganado');
        btnPedir.disabled = true;
        btnDetener.disabled = true,
            turnoComputador(puntosjugador1);
    }
});

btnPedirp.addEventListener('click', () => {
    const cartaj2 = pedirCarta();
    puntosjugador2 = puntosjugador2 + valorCarta(cartaj2);
    small[2].innerText = puntosjugador2;

    const imgCartaJ2 = document.createElement('img');
    imgCartaJ2.src = `../assets/cartas/${cartaj2}.png`;
    imgCartaJ2.classList.add('carta');
    divCartasJugador2.append(imgCartaJ2);

    if (puntosjugador2 > 21) {
        console.warn('Jugador 2 ha perdido')
        btnPedirp.disabled = true;
        btnDetenerd.disabled = true;
        turnoComputador(puntosjugador2)

    } else if (puntosjugador2 === 21) {
        console.warn('21, Genial has ganado');
        btnPedirp.disabled = true;
        btnDetenerd.disabled = true,
            turnoComputador(puntosjugador2);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true,
        btnDetener.disabled = true,

        turnoComputador(puntosjugador1);
});

btnDetenerd.addEventListener('click', () => {
    btnPedirp.disabled = true,
        btnDetenerd.disabled = true,

        turnoComputador(puntosjugador1);
});

btnNuevo.addEventListener('click', (event) => {


    ReiniciarJuego();

});


// const ReiniciarJuego = (event) => {


//     console.log(event);

//     puntosjugador1 = 0;
//     puntosjugador2 = 0;
//     puntoscomputador = 0;

//     small[0].innerText = 0;
//     small[1].innerText = 0;
//     small[2].innerText = 0;

//     divCartasComputador.innerHTML = '';
//     divCartasJugador1.innerHTML = '';
//     divCartasJugador2.innerHTML = '';

//     btnPedir.disabled = false;
//     btnPedirp.disabled = false;
//     btnDetener.disabled = false;
//     btnDetenerd.disabled = false;

//     console.clear();

//     crearDeak();
//     cartasI();

// }


