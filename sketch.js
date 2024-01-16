let walls, blocks, ball;
let blockImages = [];
let blackoutDuration = 60;
let blackoutTimer = 0;
let backgroundImages = [];
let currentBackgroundIndex = 0;

function preload() {
  for (let i = 1; i <= 35; i++) {
    blockImages.push(loadImage(`imatges/Blocks${i}.png`));
  }

  // Agrega varias imágenes de fondo al array

  backgroundImages.push(loadImage('imatges/Background1.jpg'));
  backgroundImages.push(loadImage('imatges/Background2.jpg'));
  backgroundImages.push(loadImage('imatges/Background3.jpg'));
  backgroundImages.push(loadImage('imatges/Background4.jpg'));
  backgroundImages.push(loadImage('imatges/Background5.jpg'));
  backgroundImages.push(loadImage('imatges/Background6.jpg'));
  backgroundImages.push(loadImage('imatges/Background7.jpg'));
  backgroundImages.push(loadImage('imatges/Background8.jpg'));
  backgroundImages.push(loadImage('imatges/Background9.jpg'));
  backgroundImages.push(loadImage('imatges/Background10.jpg'));
  backgroundImages.push(loadImage('imatges/Background11.jpg'));
  backgroundImages.push(loadImage('imatges/Background12.jpg'));
  backgroundImages.push(loadImage('imatges/Background13.jpg'));
  backgroundImages.push(loadImage('imatges/Background14.jpg'));
  backgroundImages.push(loadImage('imatges/Background15.jpg'));
  backgroundImages.push(loadImage('imatges/Background16.jpg'));
  backgroundImages.push(loadImage('imatges/Background17.jpg'));

  // Añade más imágenes de fondo según sea necesario
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  walls = new Group();
  walls.collider = "static";

  noStroke();
  fill(0, 0);

  new walls.Sprite(width / 2, height, width, 2);
  new walls.Sprite(0, height / 2, 2, height);
  new walls.Sprite(width, height / 2, 2, height);
  new walls.Sprite(width / 2, 0, width, 2);


  blocks = new Group();

  ball = new Ball(width / 2, height / 2, 40);
  noStroke();
  fill(0, 0, 0);
}

function draw() {
  image(backgroundImages[currentBackgroundIndex], 0, 0, width, height);

  handleBlackout();

  ball.gravity();
  ball.update();
  ball.edges();
  ball.friction();
  ball.render();
}

function mouseMoved() {
  if (frameCount > 120) {
    ball.attract();
  }
}

function createBlocks() {
  for (let i = 0; i < 5; i++) {
    let block = createSprite(ball.p.x, ball.p.y, 70, 45);

    let randomImage = random(blockImages);
    block.addImage(randomImage);

    if (random(2) < 1) {
      block.rotationSpeed = 15;
    } else {
      block.rotationSpeed = -15;
    }

    blocks.add(block);
  }
}

class Ball {
  constructor(x, y, size) {
    this.p = createVector(x, y);
    this.size = size;
    this.v = createVector(0, 0);
    this.a = createVector(0, 0);
  }

  gravity() {
    this.a.add(createVector(0, 1));
  }

  update() {
    this.v.add(this.a);
    this.p.add(this.v);

    let speed = this.v.mag();
    let growthRate = map(speed, 0, 10, 0, 0.4);
    this.size += growthRate;

    this.size = constrain(this.size, 10, 2300);

    this.a.setMag(0);
  }

  edges() {
    if (this.p.y + this.size / 2 >= height) {
      this.p.y = height - this.size / 2;
      this.v.y *= -1;
      createBlocks();
      triggerBlackout();
    }
    if (this.p.y - this.size / 2 < 0) {
      this.p.y = 0 + this.size / 2;
      this.v.y *= -1;
      createBlocks();
      triggerBlackout();
    }
    if (this.p.x - this.size / 2 < 0) {
      this.p.x = 0 + this.size / 2;
      this.v.x *= -1;
      createBlocks();
      triggerBlackout();
    }
    if (this.p.x + this.size / 2 > width) {
      this.p.x = width - this.size / 2;
      this.v.x *= -1;
      createBlocks();
      triggerBlackout();
    }
  }

  friction() {
    this.v.mult(0.98);
  }

  attract() {
    const mouse = createVector(mouseX, mouseY);
    const fromBallToMouse = p5.Vector.sub(this.p, mouse);
    fromBallToMouse.normalize();
    fromBallToMouse.mult(-2);
    this.a.add(fromBallToMouse);
  }

  render() {
    ellipse(this.p.x, this.p.y, this.size);
  }
}

function handleBlackout() {
  if (blackoutTimer > 0) {
    fill(0);
    rect(0, 0, width, height);
    blackoutTimer--;

    if (blackoutTimer === 0) {
      currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
    }
  }
}

function triggerBlackout() {
  blackoutTimer = blackoutDuration;
}











//creador de blocks sense imatges
// let walls, ball, blocks;
//
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//
//   walls = new Group();
//   walls.collider = "static";
//
//   noStroke();
//   fill(0, 0, 100, 0);
//
//   new walls.Sprite(width / 2, height, width, 2);
//   new walls.Sprite(0, height / 2, 2, height);
//   new walls.Sprite(width, height / 2, 2, height);
//   new walls.Sprite(width / 2, 0, width, 2);
//
//   ball = new Ball(width / 2, height / 2, 40);
//   noStroke();
//   fill(0, 0, 0);
//
//   blocks = new Group();
//
// }
//
// function draw() {
//   background(220);
//
//   ball.gravity();
//   ball.update();
//   ball.edges();
//   ball.friction();
//   ball.render();
//
// }
//
// function mouseMoved() {
//   if (frameCount > 120) {
//     ball.attract();
//   }
// }
//
// function createBlock(x, y) {
//   let block = createSprite(x, y, 50, 25);
//
//   if (random(2) < 1) {
//     block.rotationSpeed = 15;
//   } else {
//     block.rotationSpeed = -15;
//   }
//
//   blocks.add(block);
// }
//
// class Ball {
//   constructor(x, y, size) {
//     this.p = createVector(x, y);
//     this.size = size;
//     this.v = createVector(0, 0);
//     this.a = createVector(0, 0);
//   }
//
//   gravity() {
//     this.a.add(createVector(0, 1));
//   }
//
//   update() {
//     this.v.add(this.a);
//     this.p.add(this.v);
//
//     let speed = this.v.mag();
//     let growthRate = map(speed, 0, 10, 0, 0.2);
//     this.size += growthRate;
//
//     this.size = constrain(this.size, 10, 900);
//
//     this.a.setMag(0);
//   }
//
//   edges() {
//     if (this.p.y + this.size / 2 >= height) {
//       this.p.y = height - this.size / 2;
//       this.v.y *= -1;
//       createBlock(this.p.x, height - this.size);
//     }
//     if (this.p.y - this.size / 2 < 0) {
//       this.p.y = 0 + this.size / 2;
//       this.v.y *= -1;
//       createBlock(this.p.x, 0 + this.size);
//     }
//     if (this.p.x - this.size / 2 < 0) {
//       this.p.x = 0 + this.size / 2;
//       this.v.x *= -1;
//       createBlock(0 + this.size, this.p.y);
//     }
//     if (this.p.x + this.size / 2 > width) {
//       this.p.x = width - this.size / 2;
//       this.v.x *= -1;
//       createBlock(width - this.size, this.p.y);
//     }
//   }
//
//   friction() {
//     this.v.mult(0.98);
//   }
//
//   attract() {
//     const mouse = createVector(mouseX, mouseY);
//     const fromBallToMouse = p5.Vector.sub(this.p, mouse);
//     fromBallToMouse.normalize();
//     fromBallToMouse.mult(-2);
//     this.a.add(fromBallToMouse);
//   }
//
//   render() {
//     ellipse(this.p.x, this.p.y, this.size);
//   }
// }



// creador de imagtges sense collisions
// let walls, blocks, ball;
// let blockImages = [];
//
// function preload() {
//
//   for (let i = 1; i <= 5; i++) {
//     blockImages.push(loadImage(`imatges/whatsapp${i}.png`));
//   }
// }
//
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   // colorMode(HSB, 360, 100, 100); brillantor, saturació,hue
//
//   walls = new Group();
//   walls.collider = "static";
//
//   noStroke();
//   fill(0, 0, 100, 0);
//
//   new walls.Sprite(width / 2, height, width, 2);
//   new walls.Sprite(0, height / 2, 2, height);
//   new walls.Sprite(width, height / 2, 2, height);
//   new walls.Sprite(width / 2, 0, width, 2);
//
//   blocks = new Group();
//
//
//   ball = new Ball(50, 50, 40);
//   noStroke();
//   fill(255, 0, 0);
//
//
//   function createBlocks() {
//     for (let i = 0; i < 5; i++) {
//       let block = createSprite(
//         ball.p.x,
//         ball.p.y,
//         50,
//         25
//       );
//
//
//       let randomImage = random(blockImages);
//       block.addImage(randomImage);
//
//       if (random(2) < 1) {
//         block.rotationSpeed = 15;
//       } else {
//         block.rotationSpeed = -15;
//       }
//
//       blocks.add(block);
//     }
//   }
//
//
//   createBlocks();
//   setInterval(createBlocks, 5000);
// }
//
// function draw() {
//   background(220);
//
//
//   ball.gravity();
//   ball.update();
//   ball.edges();
//   ball.friction();
//   ball.render();
// }
//
// function mouseMoved() {
//   if (frameCount > 120) {
//     ball.attract();
//   }
// }
//
// class Ball {
//   constructor(x, y, size) {
//     this.p = createVector(x, y);
//     this.size = size;
//     this.v = createVector(0, 0);
//     this.a = createVector(0, 0);
//   }
//
//   gravity() {
//     this.a.add(createVector(0, 1));
//   }
//
//   update() {
//     this.v.add(this.a);
//     this.p.add(this.v);
//
//
//     let speed = this.v.mag();
//     let growthRate = map(speed, 0, 10, 0, 0.2);
//     this.size += growthRate;
//
//     this.size = constrain(this.size, 10, 900);
//
//     this.a.setMag(0);
//   }
//
//   edges() {
//     if (this.p.y + this.size / 2 >= height) {
//       this.p.y = height - this.size / 2;
//       this.v.y *= -1;
//     }
//     if (this.p.x - this.size / 2 < 0) {
//       this.p.x = 0 + this.size / 2;
//       this.v.x *= -1;
//     }
//     if (this.p.x + this.size / 2 > width) {
//       this.p.x = width - this.size / 2;
//       this.v.x *= -1;
//     }
//   }
//
//   friction() {
//     this.v.mult(0.98);
//   }
//
//   attract() {
//     const mouse = createVector(mouseX, mouseY);
//     const fromBallToMouse = p5.Vector.sub(this.p, mouse);
//     fromBallToMouse.normalize();
//     fromBallToMouse.mult(-2);
//     this.a.add(fromBallToMouse);
//   }
//
//   render() {
//     ellipse(this.p.x, this.p.y, this.size);
//   }
// }





// let walls, blocks;
// let blockImage; // Variable para almacenar la imagen del bloque
//
// function preload() {
//   // Carga la imagen del bloque antes de iniciar el programa
//   blockImage = loadImage('imatges/whatsapp.png');
// }
//
// function setup() {
//   createCanvas(600, 600);
//   colorMode(HSB, 360, 100, 100);
//
//   walls = new Group();
//   walls.collider = "static";
//   new walls.Sprite(width / 2, height, width, 2);
//   new walls.Sprite(0, height / 2, 2, height);
//   new walls.Sprite(width, height / 2, 2, height);
//   new walls.Sprite(width / 2, 0, width, 2);
//
//   blocks = new Group();
//
//   // Función para crear bloques
//   function createBlocks() {
//     for (let i = 0; i < 20; i++) {
//       let block = createSprite(
//         random(width * 0.3, width * 0.7),
//         random(height * 0.3, height * 0.7),
//         50,
//         25
//       );
//
//       // Asigna la imagen del bloque al sprite en lugar de un color
//       block.addImage(blockImage);
//
//       if (random(2) < 1) {
//         block.rotationSpeed = 15;
//       } else {
//         block.rotationSpeed = -15;
//       }
//
//       blocks.add(block);
//     }
//   }
//
//   // Llama a createBlocks inicialmente y luego cada 5000 milisegundos (5 segundos)
//   createBlocks();
//   setInterval(createBlocks, 5000);
// }
//
// function draw() {
//   background(150);
//
//   // Dibuja los sprites, incluidos los bloques
// }




// let ball;
//
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   ball = new Ball(50, 50, 40)
//   noStroke()
//   fill(255, 0, 0)
// }
//
// function draw() {
//   background(220); // try removing this line and see what happens!
//   ball.gravity()
//   ball.update()
//   ball.edges()
//   ball.friction()
//   ball.render()
// }
//
// function mouseMoved() {
//   if (frameCount > 120) {
//        ball.attract()
//   }
// }
//
// class Ball{
//   constructor(x, y, size) {
//     this.p = createVector(x, y)
//     this.size = size
//     this.v = createVector(0, 0)
//     this.a = createVector(0, 0)
//   }
//
//   gravity() {
//     this.a.add(createVector(0, 1))
//   }
//
//   update() {
//     this.v.add(this.a)
//     this.p.add(this.v)
//     this.a.setMag(0)
//   }
//
//   edges() {
//     if (this.p.y + this.size / 2 >= height) {
//       this.p.y = height - this.size /2
//       this.v.y *= -1
//     }
//     if (this.p.x - this.size / 2 < 0) {
//       this.p.x = 0 + this.size /2
//       this.v.x *= -1
//     }
//     if (this.p.x + this.size / 2 > width) {
//       this.p.x = 0 - this.size /2
//       this.v.x *= -1
//     }
//   }
//
//   friction() {
//     this.v.mult(0.98)
//   }
//
//   attract() {
//     const mouse = createVector(mouseX, mouseY);
//     const fromBallToMouse = p5.Vector.sub(this.p, mouse)
//     fromBallToMouse.normalize()
//     fromBallToMouse.mult(-2)
//     this.a.add(fromBallToMouse)
//   }
//
//   render() {
//     ellipse(this.p.x, this.p.y, this.size)
//   }
// }






//
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   ball = new Ball(50, 50, 40);
//   noStroke();
//   fill(255, 0, 0);
// }
//
// function draw() {
//   background(220);
//
//   // Actualizar la física de la pelota
//   ball.gravity();
//   ball.update();
//   ball.edges();
//   ball.friction();
//
//   // Cambiar el cursor cuando el mouse está sobre la pelota
//   if (ball.isHovered() && !ball.isDragging()) {
//     cursor('grab');
//   } else {
//     cursor('default');
//   }
//
//   // Dragging de la pelota
//   if (ball.isDragging()) {
//     ball.followCursor();
//   }
//
//   // Dibujar la pelota
//   ball.render();
// }
//
// class Ball {
//   constructor(x, y, size) {
//     this.p = createVector(x, y);
//     this.size = size;
//     this.v = createVector(0, 0);
//     this.a = createVector(0, 0);
//     this.draggingState = false;
//     this.restingState = false;
//     this.scalingEnabled = true; // Nueva propiedad para controlar la escala
//   }
//
//   gravity() {
//     if (!this.restingState) {
//       this.a.add(createVector(0, 1));
//     }
//   }
//
//   update() {
//     if (!this.isDragging() && !this.restingState) {
//       this.v.add(this.a);
//       this.p.add(this.v);
//       this.a.setMag(0);
//     }
//
//     // Verificar si la pelota está en reposo en el suelo y habilitar o deshabilitar la escala
//     if (this.p.y + this.size / 2 >= height && this.v.mag() === 0) {
//       this.restingState = true;
//       this.scalingEnabled = false;
//     } else {
//       this.scalingEnabled = true;
//     }
//   }
//
//   edges() {
//     if (this.p.y + this.size / 2 >= height) {
//       this.p.y = height - this.size / 2;
//       this.v.y *= -1;
//     }
//     if (this.p.x - this.size / 2 < 0) {
//       this.p.x = 0 + this.size / 2;
//       this.v.x *= -1;
//     }
//     if (this.p.x + this.size / 2 > width) {
//       this.p.x = width - this.size / 2;
//       this.v.x *= -1;
//     }
//   }
//
//   friction() {
//     this.v.mult(0.98);
//   }
//
//   // Comprobar si el mouse está sobre la pelota
//   isHovered() {
//     const d = dist(mouseX, mouseY, this.p.x, this.p.y);
//     return d < this.size / 2;
//   }
//
//   // Comprobar si se está arrastrando la pelota
//   isDragging() {
//     return this.draggingState;
//   }
//
//   // Iniciar el arrastre de la pelota
//   startDragging() {
//     if (this.isHovered()) {
//       this.draggingState = true;
//       this.v.mult(0); // Detener la velocidad al inicio del arrastre
//     }
//   }
//
//   // Detener el arrastre de la pelota
//   stopDragging() {
//     this.draggingState = false;
//     this.restingState = false; // Resetear el estado de reposo
//
//     // Ajustar la velocidad después de soltar la pelota
//     if (this.v.mag() > 0.5) {
//       this.v.mult(0.5); // Reducir la velocidad para controlar el rebote
//     }
//   }
//
//   // Mover la pelota hacia el cursor cuando se está arrastrando
//   followCursor() {
//     this.p.x = mouseX;
//     this.p.y = mouseY;
//   }
//
//   render() {
//     if (this.scalingEnabled) {
//       ellipse(this.p.x, this.p.y, this.size);
//     } else {
//       ellipse(this.p.x, this.p.y, this.size * 0.5); // Ajusta el factor de escala según sea necesario
//     }
//   }
// }
//
// function mousePressed() {
//   ball.startDragging();
// }
//
// function mouseReleased() {
//   ball.stopDragging();
// }




// let ball;
//
// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   ball = new Ball(50, 50, 40);
//   noStroke();
//   fill(255, 0, 0);
// }
//
// function draw() {
//   background(220);
//
//   // Actualizar la física de la pelota
//   ball.gravity();
//   ball.update();
//   ball.edges();
//   ball.friction();
//
//
//   // Cambiar el cursor cuando el mouse está sobre la pelota
//   if (ball.isHovered() && !ball.isDragging()) {
//     cursor('grab');
//   } else {
//     cursor('default');
//   }
//
//   // Dragging de la pelota
//   if (ball.isDragging()) {
//     ball.followCursor();
//   }
//
//   // Dibujar la pelota
//   ball.render();
// }
//
// class Ball {
//   constructor(x, y, size) {
//     this.p = createVector(x, y);
//     this.size = size;
//     this.v = createVector(0, 0);
//     this.a = createVector(0, 0);
//     this.draggingState = false;
//     this.restingState = false;
//   }
//
//   gravity() {
//     if (!this.restingState) {
//       this.a.add(createVector(0, 1));
//     }
//   }
//
//   update() {
//     if (!this.isDragging() && !this.restingState) {
//       this.v.add(this.a);
//       this.p.add(this.v);
//       this.a.setMag(0);
//     }
//   }
//
//   edges() {
//     if (this.p.y + this.size / 2 >= height) {
//       this.p.y = height - this.size / 2;
//       this.v.y *= -1;
//     }
//     if (this.p.x - this.size / 2 < 0) {
//       this.p.x = 0 + this.size / 2;
//       this.v.x *= -1;
//     }
//     if (this.p.x + this.size / 2 > width) {
//       this.p.x = width - this.size / 2;
//       this.v.x *= -1;
//     }
//   }
//
//   friction() {
//     this.v.mult(0.98);
//   }
//
//
//   // Comprobar si el mouse está sobre la pelota
//   isHovered() {
//     const d = dist(mouseX, mouseY, this.p.x, this.p.y);
//     return d < this.size / 2;
//   }
//
//   // Comprobar si se está arrastrando la pelota
//   isDragging() {
//     return this.draggingState;
//   }
//
//   // Iniciar el arrastre de la pelota
//   startDragging() {
//     if (this.isHovered()) {
//       this.draggingState = true;
//       this.v.mult(0); // Detener la velocidad al inicio del arrastre
//     }
//   }
//
//   // Detener el arrastre de la pelota
//   stopDragging() {
//     this.draggingState = false;
//     this.restingState = false; // Resetear el estado de reposo
//
//     // Ajustar la velocidad después de soltar la pelota
//     if (this.v.mag() > 0.5) {
//       this.v.mult(0.5); // Reducir la velocidad para controlar el rebote
//     }
//   }
//
//   // Mover la pelota hacia el cursor cuando se está arrastrando
//   followCursor() {
//     this.p.x = mouseX;
//     this.p.y = mouseY;
//   }
//
//   render() {
//     ellipse(this.p.x, this.p.y, this.size);
//   }
// }
//
// function mousePressed() {
//   ball.startDragging();
// }
//
// function mouseReleased() {
//   ball.stopDragging();
// }
