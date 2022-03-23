const display = document.getElementById('display');
const result = document.getElementById('igual');
const teclasNumericas = document.querySelectorAll('[id*=tecla]');
const teclasOperadoras = document.querySelectorAll('[id*=operador]');

let numeroNovo = true;
let operador;
let numeroAnterior;

const atualizarDisplay = (texto)  => {
    if(numeroNovo) {
        display.textContent = texto;
        numeroNovo = false;
    }
    else display.textContent += texto;
}

const inserirNumero = (event) => atualizarDisplay(event.target.textContent);

teclasNumericas.forEach((tecla) => tecla.addEventListener('click', inserirNumero));

const selecionaOperador = (event) => {
    numeroNovo = true;
    operador = event.target.textContent;
    numeroAnterior = display.textContent;
}

teclasOperadoras.forEach((tecla) => tecla.addEventListener('click', selecionaOperador));

const calcular = () => {
    const numeroAtual = display.textContent;
    var n1 = parseFloat(numeroAtual.replace(',', '.'));
    var n2 = parseFloat(numeroAnterior.replace(',', '.'));

    const resultado = eval(`${n1}${operador}${n2}`); //usando template string
    
    var resultadoFinal = parseFloat(resultado);
    numeroNovo = true;
    atualizarDisplay(resultadoFinal.toString().replace('.', ','));
}

result.addEventListener('click', calcular);

const limparDisplay = () => (display.textContent = "");

document.querySelector("#limparDisplay").addEventListener("click", limparDisplay);

const limparCalculo = () => {
  limparDisplay();
  novoNumero = true;
  operador = undefined;
  numeroAnterior = undefined;
};

document.querySelector("#limparCalculo").addEventListener("click", limparCalculo);

const removerUltimoNumero = () => 
    (display.textContent = display.textContent.slice(0,-1));

document.querySelector("#backspace").addEventListener("click", removerUltimoNumero);

const inverterSinal = () => {
    numeroNovo = true;
    atualizarDisplay(display.textContent * -1);
}

document.querySelector("#inverter").addEventListener("click", inverterSinal);

const adicionarDecimal = () => {
    (display.textContent = display.textContent.concat(","));
    numeroNovo = false;
}
document.querySelector("#decimal").addEventListener("click", adicionarDecimal);