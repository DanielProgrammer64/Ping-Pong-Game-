// para inicio de tudo, se tratando de um jogo simples em JavaScript
// existe a necessidade de criar a área da tela, no caso, utilizaremos o canvas:

//! <------------------------- Trecho inicial ------------------------->

// vale ressaltar que ele precisa ser chamado no html:

const canvas = document.getElementById("canvas"); // pegando o id do elemento do html
const ctx = canvas.getContext("2d"); // o canvas suporta dois formatos, o 2d e o 3d, então é necessário que adicionemos o contexto que vamos usar

// usado na linha de divisa do campo:

const lineWidth = 20, // vamos definir uma função com o número da espessura da linha de acordo com o que quisermos.
  gapX = 10, // vamos definir esses valores para uma forma padrão de 10, para usar nas raquetes.
  gapY = window.innerWidth - 30;
const y = window.innerHeight / 2.5; // colocamos este comando para adaptar a posição das raquetes para o meio do campo.

//! <------------------------- Criando os Objetos para cada parte da construção ------------------------->

// objeto campo
const campo = {
  // dentro do objeto vamos colocar suas propriedades
  width: window.innerWidth,
  height: window.innerHeight,
  Draw: function () {
    // para isso, vamos pegar o techo que desenha o campo
    ctx.fillStyle = "black"; // vamos usar essa propriedade para definir a cor da quadra
    ctx.fillRect(0, 0, this.width, this.height); // o comando fillRect serve pra criar o retângulo da nossa quadra.

    // 'this' serve para se referir ao próprio objeto

    // podemos usar o método fillRect para deixar tudo mais adaptável, logo, usamos o InnerWidth e o InnerHeight.
  },
};

// objeto bola
const Ball = {
  x: window.innerWidth / 2,
  y: 523,
  radius: 30,
  Draw: function () {
    ctx.fillStyle = "#ccff33";
    // para criarmos a bola, precisaremos usar outro comando, pois fillRect serve apenas pra retângulos
    // para isso vamos usar o comando arc.

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, false); // o último valor é sempre o mesmo se tratando de objetos circulares
    ctx.fill();
  },
};

// no momento que estamos escrevendo isso, o placar está sobrepondo a bola, não é isso que queremos, então
// vamos adicionar o Placar a um objeto:

const Placar = {
  // vamos adicionar as propriedades, considerando que no game em específico, há de ser o Player contra o computador
  // vamos adicionar 2 placares:
  Player: 0,
  Bot: 0,

  Draw: function () {
    ctx.font = "bold 80px square deal"; // fonte
    ctx.textAlign = "center"; // alinhando para o centro
    ctx.texBaseline = "top"; // a base do texto está em cima do mesmo
    ctx.fillStyle = "#fff"; // cor do placar
    ctx.fillText(this.Player, campo.width / 2.1, 70);

    // o comando superior, serve basicamente mostrar o número de pontos, nesse caso 0, adicionamos a largura da janela, dividida por
    // 2.1, para que o texto fique perto da linha de divisa, mas não em cima dela, com a altura vertcial de 70 pixels, para ela ficar
    // um pouco mais abaixo.

    ctx.fillText(this.Bot, campo.width / 1.9, 70); // o outro lado

    // usamos o this.player e o this.Bot, para que conforme o valor da pontuação aumentar, o valor impresso seja o valor de pontos marcados. 
  },
};

// objeto linha
const linha = {
  width: lineWidth,
  height: campo.height,
  Draw: function () {
    ctx.fillStyle = "#ffffff"; // já que se trata de uma quadra vamos adicionar uma divisa, branca pra dar o destaque.

    ctx.fillRect(
      window.innerWidth / 2 - lineWidth / 2, // definimos que, o tamanho da reta tem que ser a largura do espaço disponível na janela, dividido por 2, menos o valor
      // da váriavel Linewidth = 20, divido por 2, ou seja, esse código serve pra colocar a linha no meio da tela.

      0,
      this.width,
      this.height
    );
  },
};

// objeto raquete esquerda

const LeftPaddle = {
  x: gapX,
  y: y,
  width: lineWidth,
  height: 200,
  Draw: function () {
    // desenhando a raquete esquerda
    ctx.fillStyle = "cyan"; // cor da raquete: Ciano
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

// objeto raquete direita
const RightPaddle = {
  x: campo.width - linha.width - gapX,
  y: y,
  width: lineWidth,
  height: 200,
  Draw: function () {
    // desenhando a raquete direita
    ctx.fillStyle = "red"; // cor da raquete: Vermelha
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

//! <------------------------- configurando o funcionamento ------------------------->

// o function setup vai servir basicamente como o grande configurador do funcionamento do nosso game
function Setup() {
  canvas.width = ctx.width = window.innerWidth; // window serve para configurar a janela, e innerWidth serve para adaptar o tamanho da janela para o tamanho disponível
  canvas.height = ctx.height = window.innerHeight; // a mesma coisa porém para a altura.

  // também precisamos fazer essa mesma definição para o ctx, mas podemos colocar os dois juntos, ao invés de repetir o comando
}

//! <------------------------- Desenhando o espaço ------------------------->

function Draw() {
  campo.Draw(); // o código que antes estava aqui, e servia para criar o campo, é trocado de posição, agora, está inserido dentro do objeto.
  Placar.Draw(); // <---
  linha.Draw(); // <---
  Ball.Draw(); // o mesmo para estes:
  LeftPaddle.Draw(); // <---
  RightPaddle.Draw(); // <---

  // ao chamar o placar antes do Ball, vamos definir basicamente que a bola deve sobrepor o placar, ou seja, passar por cima. 
  // a intenção também é que a bola passe por cima da linha de marcação, então chamamos ela primeiro.
}

Setup();
Draw();

// após a edição da programação e deste arquivo JavaScript, vamos para o Css, que é a parte de decorações
// depois deste projeto, vamos fazer mais outro protótipo semelhante para testar atalhos... </>
