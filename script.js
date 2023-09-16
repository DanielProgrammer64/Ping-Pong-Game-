// para inicio de tudo, se tratando de um jogo simples em JavaScript
// existe a necessidade de criar a área da tela, no caso, utilizaremos o canvas:

//! <------------------------- Trecho inicial ------------------------->
// vale ressaltar que ele precisa ser chamado no html:

const canvas = document.querySelector("canvas"); // pegando o id do elemento do html
ctx = canvas.getContext("2d"); // o canvas suporta dois formatos, o 2d e o 3d, então é necessário que adicionemos o contexto que vamos usar
gapX = 10; // vamos definir esses valores para uma forma padrão de 10, para usar nas raquetes.

// mouse
const mouse = { x: 0, y: 0 };

//! <------------------------- Criando os Objetos para cada parte da construção ------------------------->

// objeto campo
const campo = {
  // dentro do objeto vamos colocar suas propriedades
  w: window.innerWidth,
  h: window.innerHeight,
  Draw: function () {
    // para isso, vamos pegar o techo que desenha o campo
    ctx.fillStyle = "black"; // vamos usar essa propriedade para definir a cor da quadra
    ctx.fillRect(0, 0, this.w, this.h); // o comando fillRect serve pra criar o retângulo da nossa quadra.

    // 'this' serve para se referir ao próprio objeto

    // podemos usar o método fillRect para deixar tudo mais adaptável, logo, usamos o InnerWidth e o InnerHeight.
  },
};

// objeto linha
const linha = {
  w: 15,
  h: campo.h,
  Draw: function () {
    ctx.fillStyle = "#ffffff"; // já que se trata de uma quadra vamos adicionar uma divisa, branca pra dar o destaque.
    ctx.fillRect(
      campo.w / 2 - this.w / 2, // no objeto campo, está definido que o espaço dele ocupa todo o espaço da janela, para posicionar a linha, usamos o tamanho do campo dividido por 2
      // menos a largura da linha que é igual à 15 / 2
      0,
      this.w,
      this.h
    );
  },
};

// objeto raquete esquerda

// a raquete esquerda será a raquete do jogador.
// para que a mesma nos obedeça, vamos colocar uma função mouse.

const RaqueteEsquerda = {
  x: gapX,
  y: 0,
  w: linha.w,
  h: 200,
  _move: function () {
    this.y = mouse.y - this.h / 2; // este trecho serve para definir que a barra deve se movimentar junto com o mouse e que o mouse deve ficar no meio da raquete.
  },
  Draw: function () {
    //desenhando a raquete esquerda
    ctx.fillStyle = "Cyan"; // cor: ciano
    ctx.fillRect(this.x, this.y, this.w, this.h);

    // chamamos a função dentro do Draw();
    this._move();
  },
};

// objeto raquete direita

// a raquete direita é a do computador.
// para que a mesma funcione ela precisa de um, algoritmo.
// usando a mesma função, porém, o computador será orientado pela bola.

const RaqueteDireita = {
  x: campo.w - linha.w - gapX,
  y: 0,
  w: linha.w,
  h: 200,
  speed: 4,
  _move: function () {
    if (this.y + this.h / 2 < Ball.y + Ball.r) {
      this.y += this.speed;
    } else {
      this.y -= this.speed;
    }
    // devemos adaptar o código para que o Player tenha chance contra a máquina
  },

  __speedUp: function () {
    this.speed += 1.5; // usamos essa medida reduzida para que o computador seja mais lento, tornando o jogo justo.
  },

  Draw: function () {
    // desenhando a raquete direita
    ctx.fillStyle = "red"; // cor da raquete: Vermelha
    ctx.fillRect(this.x, this.y, this.w, this.h);

    // chamamos a função novamente.
    this._move();
  },
};

// no momento que estamos escrevendo isso, o placar está sobrepondo a bola, não é isso que queremos, então
// vamos adicionar o Placar a um objeto:

const Placar = {
  // vamos adicionar as propriedades, considerando que no game em específico, há de ser o Player contra o computador
  // vamos adicionar 2 placares:
  Player: 0,
  Bot: 0,
  increasePlayer: function () {
    this.Player++; // adicionando pontos ao Player.
  },
  increaseBot: function () {
    this.Bot++; // adicionando pontos à Máquina.
  },
  Draw: function () {
    ctx.font = "bold 70px square deal"; // fonte
    ctx.textAlign = "center"; // localização
    ctx.textBaselinha = "top"; // base do texto
    ctx.fillStyle = "WHITE"; // cor
    ctx.fillText(this.Player, campo.w / 2.2, 80); // posições exatas
    ctx.fillText(this.Bot, campo.w / 1.8, 80);

    // o comando superior, serve basicamente mostrar o número de pontos, nesse caso 0, adicionamos a largura da janela, dividida por
    // 2.1, para que o texto fique perto da linha de divisa, mas não em cima dela, com a altura vertcial de 70 pixels, para ela ficar
    // um pouco mais abaixo.

    // usamos o this.player e o this.Bot, para que conforme o valor da pontuação aumentar, o valor impresso seja o valor de pontos marcados.
  },
};

// objet bola
const Ball = {
  x: campo.w / 2,
  y: campo.h / 2,
  r: 20,
  speed: 5,
  directionX: 1,
  directionY: 1,
  ___CalculatePosition: function () {
    // verifica se o jogador 1 fez um ponto (x > largura do campo)
    if (this.x > campo.w - this.r - RaqueteDireita.w - gapX) {
      // verifica se a raquete direita está na posição y da bola
      if (
        this.y + this.r > RaqueteDireita.y &&
        this.y - this.r < RaqueteDireita.y + RaqueteDireita.h
      ) {
        // rebate a bola intervertendo o sinal de X
        this._reverseX();
      } else {
        // pontuar o jogador 1
        Placar.increasePlayer();
        this._pointUp();
      }
    }

    // verifica se o jogador 2 fez um ponto (x < 0)
    if (this.x < this.r + RaqueteEsquerda.w + gapX) {
      // verifica se a raquete esquerda está na posição y da bola
      if (
        this.y + this.r > RaqueteEsquerda.y &&
        this.y - this.r < RaqueteEsquerda.y + RaqueteEsquerda.h
      ) {
        // rebate a bola intervertendo o sinal de X
        this._reverseX();
      } else {
        // pontuar o jogador 2
        Placar.increaseBot();
        this._pointUp();
      }
    }

    // verifica as laterais superior e inferior do campo
    if (
      (this.y - this.r < 0 && this.directionY < 0) ||
      (this.y > campo.h - this.r && this.directionY > 0)
    ) {
      // rebate a bola invertendo o sinal do eixo Y
      this._reverseY();
    }
  },
  _reverseX: function () {
    this.directionX *= -1;
  },
  _reverseY: function () {
    this.directionY *= -1;
  },

  //vamos criar uma função para que conforme os pontos são feitos, a velocidade do game aumente.
  __speedUp: function () {
    this.speed += 2; // o que ocorre aqui é o acréscimo de dois pontos de velocidade a mais na bola, coforme os pontos são feitos.
  },

  _pointUp: function () {
    this.__speedUp();
    RaqueteDireita.__speedUp();

    this.x = campo.w / 2;
    this.y = campo.h / 2;
  },
  _move: function () {
    // usamos isso para fazer a bola se mover ao longo do campo
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
  }, // chamamos esta função dentro do Draw, para que seja executada dentro de um único bloco.

  Draw: function () {
    ctx.fillStyle = "#ccff33";
    // para criarmos a bola, precisaremos usar outro comando, pois fillRect serve apenas pra retângulos
    // para isso vamos usar o comando arc.
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.fill();

    this.___CalculatePosition();
    this._move();
  },
};

//! <------------------------- configurando o funcionamento ------------------------->

// o function setup vai servir basicamente como o grande configurador do funcionamento do nosso game
function setup() {
  canvas.width = ctx.width = campo.w; // window serve para configurar a janela, e innerWidth serve para adaptar o tamanho da janela para o tamanho disponível
  canvas.height = ctx.height = campo.h; // a mesma coisa porém para a altura.

  // também precisamos fazer essa mesma definição para o ctx, mas podemos colocar os dois juntos, ao invés de repetir o comando
}

function Draw() {
  campo.Draw(); // o código que antes estava aqui, e servia para criar o campo, é trocado de posição, agora, está inserido dentro do objeto.
  linha.Draw(); // o mesmo para estes:
  RaqueteEsquerda.Draw();
  RaqueteDireita.Draw();
  Placar.Draw();
  Ball.Draw();

  // ao chamar o placar antes do Ball, vamos definir basicamente que a bola deve sobrepor o placar, ou seja, passar por cima.
  // a intenção também é que a bola passe por cima da linha de marcação, então chamamos ela primeiro.
}

// a função deste trecho é basicamente definir um frame animado com o fim de se obter um resultado mais suave.

window.animateFrame = (function () {
  // API do canvas que vai servir para gerar o efeito de animação suave.
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function main() {
  animateFrame(main);
  Draw();
}

setup();
main();

// vamos criar a configuração do mouse
canvas.addEventListener("mousemove", function (D) {
  mouse.x = D.pageX;
  mouse.y = D.pageY;

  console.log(mouse); // se usarmos este comando por exemplo, conforme movimentarmos o mouse vemos as coordenadas na tela.
});

// após a edição da programação e deste arquivo JavaScript, vamos para o Css, que é a parte de decorações
// depois deste projeto, vamos fazer mais outro protótipo semelhante para testar atalhos... </>

//! Dia 05/09/23, código reescrito pelo código original ter sido corrompido graças a quantidade imensa de laços inescapáveis.
