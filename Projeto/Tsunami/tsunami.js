let contMovOndas = 0;
let x = 0;
let amplitudeSlider, frequenciaSlider;//sliders
let velocidade = 3; //velocidade do tsunami
let cidade, cidadeDestruida;//imagens
let tsunamiAtivo = false;//verificação do tsunami
let iniciarDesastre, paraDesastre;//botões

function preload() {
  cidade = loadImage('Captura de ecrã 2024-05-31 152118.png');  
  cidadeDestruida = loadImage('Captura de ecrã 2024-05-31 152135.png');
}
function iniciarTsunami() {
  tsunamiAtivo = true;
}

function pararTsunami() {
  tsunamiAtivo = false;
}
function setup() {
  createCanvas(600, 400);
  amplitudeSlider = createSlider(0, 400, 200);
  frequenciaSlider = createSlider(0, 400, 200);

//botão para o inicio do Tsunami
  iniciarDesastre = createButton('Iniciar Tsunami');
  iniciarDesastre.position(400, height + 30);
  iniciarDesastre.mousePressed(iniciarTsunami);
//botão que para o Tsunami
  paraDesastre = createButton('Parar Tsunami');
  paraDesastre.position(520, height + 30);
  paraDesastre.mousePressed(pararTsunami);
}

function draw() {
  let amplitude = amplitudeSlider.value();
  let frequencia = frequenciaSlider.value();

  if (tsunamiAtivo) {
    image(cidadeDestruida, 0, 0, width, height);
    desenharOndas(amplitude, frequencia);
  } else {
    image(cidade, 0, 0, width, height);
  }
}

function desenharOndas(amplitude, frequencia) {
  //desenha o Tsunami
  translate(0, height / 2);
  beginShape();
  vertex(0, height / 2);
  fill(0, 0, 255);
  for (let i = 0; i < width; i++) {
    let y = amplitude * sin(TWO_PI * (i + x) / frequencia);
    vertex(i, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);
  x += velocidade;
  if (x > width) {
  // Se a onda alcançar o final da tela, reinicia o deslocamento horizontal
    x = 0;
  }
}
