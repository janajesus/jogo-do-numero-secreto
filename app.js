let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('h2', 'Você tem 3 tentativas...');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
    exibirImagem('imgJogo');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns!');
        exibirTextoNaTela('h2', 'Você acertou...');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        exibirImagem('imgAcerto');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
        if(tentativas == 3){
            exibirTextoNaTela('h1', 'Calma Ludmilo!');
            exibirTextoNaTela('h2', 'Ultima tentativa...');
            exibirImagem('imgCalma');
        }
        if(tentativas > 3){
            exibirTextoNaTela('h1', 'Você perdeu!');
            exibirTextoNaTela('h2', 'Mais sorte da proxima vez...');
            exibirTextoNaTela('p', `O número secreto era ${numeroSecreto}`);
            exibirImagem('imgPerdeu');
            document.getElementById('reiniciar').removeAttribute('disabled');
        }
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}

function exibirImagem(idDaImagem) {
    let imagens = document.querySelectorAll('.container__imagem-jogo, .container__imagem-acerto, .container__imagem-perdeu, .container__imagem-calma');

    imagens.forEach(function(imagem) {
        imagem.style.display = 'none';
    });

    var imagemAtual = document.getElementById(idDaImagem);
    imagemAtual.style.display = 'block';
}

