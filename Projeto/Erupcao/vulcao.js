let imgInicio;
let particulas = [];
let botaoIniciar, botaoParar;
let erupcaoAtiva = false;
let chuvaAtiva = false;

let chuva = [];
let quantidade = 300;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Carregar as imagens
  imgInicio = loadImage('eupcaofundo.jpg');

  // Criar o botão para iniciar a erupção
  botaoIniciar = createButton('Iniciar Erupção');
  botaoIniciar.position(10, 10);
  botaoIniciar.mousePressed(iniciarErupcao);

  // Criar o botão para parar a erupção
  botaoParar = createButton('Parar Erupção');
  botaoParar.position(150, 10);
  botaoParar.mousePressed(pararErupcao);

  // Inicializar a chuva de lava
  for (let i = 0; i < quantidade; i++) {
    chuva.push({
      x: random(-50, width),
      y: random(height),
      velocidade: random(5),
      fase: random(TWO_PI) // Para movimento senoidal/two pi é o valor dobrado de pi
    });
  }
}
function iniciarErupcao() {
  erupcaoAtiva = true;
  chuvaAtiva = true;
}

function pararErupcao() {
  erupcaoAtiva = false;
  chuvaAtiva = false;
}

function draw() {
  background(255);
  image(imgInicio, 0, 0, width, height);

  // Desenhar a chuva de lava
  if (chuvaAtiva) {
    for (let i = 0; i < chuva.length; i++) {
      let gota = chuva[i];
      let espessura = map(gota.velocidade, 0, 4, 0.5, 3);
      let tamanho = map(gota.velocidade, 0, 4, 5, 15);
      strokeWeight(espessura);
      stroke(255, 100, 0); // Cor da lava
      line(gota.x, gota.y, gota.x, gota.y + tamanho);
      gota.x += sin(gota.fase) * 2; // Movimento senoidal
      gota.y += gota.velocidade + 5;
      gota.x += 1;

      if (gota.y > height) {
        gota.y = -20;
        gota.x = random(-50, width);
      }
    }
  }

  // Atualizar e desenhar partículas de erupção
  if (erupcaoAtiva) {
    let numNovasParticulas = 50; // Número de novas partículas por quadro
    for (let i = 0; i < numNovasParticulas; i++) {
      let p = new Particula(width / 2, 100);
      particulas.push(p);
    }
  }

  for (let i = particulas.length - 1; i >= 0; i--) {
    particulas[i].atualizar();
    particulas[i].mostrar();
    if (particulas[i].terminou()) {
      particulas.splice(i, 1); // Remover partícula quando acaba
    }
  }
}



class Particula {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-10, 10); // Distorção do eixo x de onde as partículas vão
    this.vy = random(-5, -1); // Distorção do eixo y de onde as partículas vão
    this.alpha = 255;
  }

  atualizar() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  mostrar() {
    noStroke();
    fill(255, 100, 0, this.alpha);
    ellipse(this.x -30, this.y + 160, 30); // Local de saida da lava
  }

  terminou() {
    return this.alpha < 0;
  }
}
