let adversarioSoma = 0;
let suaSoma = 0;

let qtdAs = 0;
let qtdAsAdversario = 0;

let cartaVirada;
let baralho;

let podePedir = true;

window.onload = function () {
    menu();
    criarBaralho();
    embaralhar();
    iniciar();
}

function menu() {
    let menu = document.createElement('div');



}

function criarBaralho() {
    let valores = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let naipes = ['H', 'C', 'D', 'S'];
    baralho = [];

    for (j of naipes) {
        for (i of valores) {
            baralho.push(i + "-" + j);

        }
    }
    console.log(baralho);
}

function embaralhar() {
    for (i in baralho) {
        let temp = baralho[i];
        // j recebe um valor aleatorio
        let j = Math.floor(Math.random() * baralho.length);
        // i recebe o valor da POSIÇÃO J
        //apenas modifiquei o valor da variavel i
        baralho[i] = baralho[j];
        // E a poisção j recebe temp que é o valor i
        // Ou seja trocaram de posição
        baralho[j] = temp;

    }
    console.log(baralho);
}

function iniciar() {
    iniciarOponente();
    acaoOponente();
    iniciarJogador();

    // quando voce clicar no botao vai acionar a função pedir (o mesmo pra função manter)
    document.getElementById('pedir').addEventListener('click', pedir);
    document.getElementById('manter').addEventListener('click', manter);


}

function iniciarOponente() {
    cartaVirada = baralho.pop(); // ser removida do final do array e adicionando ao cartaVriada
    adversarioSoma += getValor(cartaVirada);
    qtdAsAdversario += checkAs(cartaVirada);


}

function acaoOponente() {
    let imgCarta = document.createElement('img');
    let carta = baralho.pop(); // tira um cara do final do baralho
    imgCarta.src = './cards/' + carta + '.png';
    let adCarta = document.getElementById('cartas-adversario');
    adCarta.append(imgCarta);
    adversarioSoma += getValor(carta);
    qtdAsAdversario += checkAs(carta);

}

function vezOponente() {
    while (adversarioSoma < 21) {
        acaoOponente();
    }
}

function iniciarJogador() {
    for (let i = 0; i < 2; i++) {
        let imgCarta = document.createElement('img');
        let carta = baralho.pop(); // retirando carta do final do baralho
        imgCarta.src = './cards/' + carta + '.png';
        suaSoma += getValor(carta);
        qtdAs += checkAs(carta);
        let adCarta = document.getElementById('cartas-jogador');
        adCarta.append(imgCarta);

    }

}

function getValor(carta) {
    let numero = carta.split('-'); //Ou seja, se for 3-H, vai dividir onde tiver "-" e criar 2 elementos num array 
    let n = numero[0]; // pega o indice 0, que depois da divisao seria o numero, no caso de 3-H é o 3
    if (isNaN(n)) {
        if (n == 'A') {
            return 11;
        }
        return 10;
    }

    return parseInt(n);
}

function checkAs(carta) {
    if (carta[0] == 'A') {
        return 1;
    }
    return 0;
}

function controleDeAs(suaSoma, qtdAs) {
    if (suaSoma > 21 && qtdAs > 0) {
        suaSoma -= 10;
        qtdAs -= 1;
    }
    return suaSoma;
}

function pedir() {
    if (!podePedir) {
        return;
    }

    let imgCarta = document.createElement('img');
    let carta = baralho.pop();
    imgCarta.src = './cards/' + carta + '.png';
    suaSoma += getValor(carta);
    qtdAsAdversario += checkAs(carta);
    let adCarta = document.getElementById('cartas-jogador');
    adCarta.append(imgCarta);

    if (controleDeAs(suaSoma, qtdAs) > 21) {
        podePedir = false;
    }
}

function manter() {
    adversarioSoma = controleDeAs(adversarioSoma, qtdAsAdversario);
    suaSoma = controleDeAs(suaSoma, qtdAs);

    podePedir = false;

    let carta = document.getElementById('carta-virada');
    carta.src = "./cards/" + cartaVirada + '.png';

    let msg = document.getElementById('res');

    vezOponente();
    if (suaSoma > 21 && adversarioSoma > 21) {
        msg.innerText = 'Empate';
        msg.style.color = 'blue';
    }
    else if (suaSoma > 21 && adversarioSoma <= 21) {
        msg.innerText = 'Voce perdeu';
        msg.style.color = 'red';

    }
    else if (adversarioSoma > 21 && suaSoma <= 21) {
        msg.innerText = 'Voce ganhou';
        msg.style.color = 'green';

    }
    else if (suaSoma == adversarioSoma) {
        msg.innerText = 'Empate';
        msg.style.color = 'blue';
    }
    else if (adversarioSoma == 21) {
        msg.innerText = 'Voce perdeu';
        msg.style.color = 'red';

    }
    else if (suaSoma == 21) {
        msg.innerText = 'Voce ganhou';
        msg.style.color = 'green';
    }

    else if (adversarioSoma > suaSoma) {
        msg.innerText = 'Voce perdeu';
        msg.style.color = 'red';

    }

    else if (suaSoma > adversarioSoma) {
        msg.innerText = 'Voce ganhou';
        msg.style.color = 'green';
    }

    document.getElementById('soma-adversario').innerText = adversarioSoma;
    document.getElementById('sua-soma').innerText = suaSoma;

    reiniciar();

}

function reiniciar() {
    let reiniciar = document.querySelector('#reiniciar');
    reiniciar.classList.remove('hide'); // reinicia a pagina, location.reload();

}

