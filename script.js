const tabuleiro = document.getElementById('tabuleiro');
const status = document.getElementById('status');
let jogadorAtual = 'X';
let jogoTerminou = false;

function verificarVencedor() {
  const cells = document.querySelectorAll('[data-celula]');
  const combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combinacao of combinacoesVencedoras) {
    const [a, b, c] = combinacao;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      return cells[a].textContent;
    }
  }

  if ([...cells].every(cell => cell.textContent)) {
    return 'desenho';
  }

  return null;
}

function salvarEstadoDoJogo() {
  const cells = document.querySelectorAll('[data-celula]');
  cells.forEach((cell, index) => {
    localStorage.setItem(`celula_${index}`, cell.textContent);
  });
  localStorage.setItem('jogadorAtual', jogadorAtual);
  localStorage.setItem('jogoTerminou', jogoTerminou.toString());
}



function carregarEstadoDoJogo() {
  const cells = document.querySelectorAll('[data-celula]');
  cells.forEach((cell, index) => {
    const valor = localStorage.getItem(`celula_${index}`);
    if (valor) {
      cell.textContent = valor;
    }
  });
  jogadorAtual = localStorage.getItem('jogadorAtual') || 'X';
  jogoTerminou = localStorage.getItem('jogoTerminou') === 'true';
  status.textContent = jogoTerminou ? '' : `É a vez do jogador ${jogadorAtual}`;
}



function clicarCelula(e) {
  if (jogoTerminou) return;
  const cell = e.target;
  const cellIndex = Array.from(cell.parentNode.children).indexOf(cell);
  if (cell.textContent === '') {
    cell.textContent = jogadorAtual;
    localStorage.setItem(`celula_${cellIndex}`,jogadorAtual);
    const vencedor = verificarVencedor();
    if (vencedor) {
      jogoTerminou = true;
      status.textContent = vencedor === 'desenho' ? 'Deu velha :( ' : `O jogador ${vencedor} venceu!`;
    } else {
      jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
      status.textContent = `É a vez do jogador ${jogadorAtual}`;
    }
    salvarEstadoDoJogo();
  }
}

function reiniciarJogo() {
  const cells = document.querySelectorAll('[data-celula]');
  cells.forEach((cell, index) => {
    cell.textContent = '';
    localStorage.setItem(`celula_${index}`,'');
  });
  jogadorAtual = 'X';
  jogoTerminou = false;
  status.textContent = `É a vez do jogador ${jogadorAtual}`;
  salvarEstadoDoJogo();
}

tabuleiro.addEventListener('click', clicarCelula);
document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);

salvarEstadoDoJogo();