var myGamePiece;

var myBackground;
var myObstacle;
var myObstacle2;
var myObstacle3;
var myObstacle4;
var myObstacle5;
var myObstacle6;
var myObstacle7;
var myObstacle8;
var myObstacle9;
var myObstacle10;
var pincho, pincho2, pincho3, pincho4, pincho5, pincho6,pincho7,pincho8;
var meta;
var interruptor = 1;
var interruptor2 = 1;
var interruptor3 = 1; 
var interruptor4 = 1;
var interruptor5 = 1;

function startGame() {
    myGameArea.start();
    myBackground = new component(500, 500, "black", 0, 0);
    myGamePiece = new component(20, 20, "blue", 10, 20);
    myObstacle = new component(400, 20, "green", 0, 60);
    myObstacle2 = new component(400, 20, "green", 100, 160);
    myObstacle3 = new component(20, 160, "green", 100, 180);
    myObstacle4 = new component(410, 20, "green", 0, 420);
    myObstacle5 = new component(20, 140, "green", 240, 280);
    myObstacle6 = new component(20, 120, "green", 380, 180);
    myObstacle7 = new component(5, 500, "red", 0, 0);
    myObstacle8 = new component(500, 5, "red", 0, 0);
    myObstacle9 = new component(500, 5, "red", 0, 495);
    myObstacle10 = new component(20, 500, "red", 495, 0);
    pincho = new component(20, 20, "red", 320, 80);
    pincho2 = new component(20, 20, "red", 220, 80);
    pincho3 = new component(20, 20, "red", 120, 80);
    pincho4 = new component(60, 60, "red", 420, 200);
    pincho5 = new component(20, 20, "red", 10, 200);
    pincho6 = new component(20, 20, "red", 10, 300);
    pincho7 = new component(60, 60, "red", 130, 210);
    pincho8 = new component(60, 40, "red", 230, 350);
    meta = new component(50, 54, "skyblue", 5, 441);

}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {

        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })


    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    },
    win: function () {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    if (myGamePiece.crashWith(myObstacle) || myGamePiece.crashWith(myObstacle2) || myGamePiece.crashWith(myObstacle3) || myGamePiece.crashWith(myObstacle4) || myGamePiece.crashWith(myObstacle5) || myGamePiece.crashWith(myObstacle6) || myGamePiece.crashWith(myObstacle7) || myGamePiece.crashWith(myObstacle8) || myGamePiece.crashWith(myObstacle9) || myGamePiece.crashWith(myObstacle10) || myGamePiece.crashWith(pincho) || myGamePiece.crashWith(pincho2) || myGamePiece.crashWith(pincho3) || myGamePiece.crashWith(pincho4) || myGamePiece.crashWith(pincho5) || myGamePiece.crashWith(pincho6) || myGamePiece.crashWith(pincho7) || myGamePiece.crashWith(pincho8)) {
        myGameArea.stop();
        document.getElementById("mensaje").removeAttribute("hidden");

    } else {
        if (myGamePiece.crashWith(meta)) {
            myGameArea.win();
            document.getElementById("mensaje2").removeAttribute("hidden");

        } else {
            myGameArea.clear();
            myGamePiece.speedX = 0;
            myGamePiece.speedY = 0;
            if (myGameArea.keys && myGameArea.keys[65]) { myGamePiece.speedX = -2; }
            if (myGameArea.keys && myGameArea.keys[68]) { myGamePiece.speedX = 2; }
            if (myGameArea.keys && myGameArea.keys[87]) { myGamePiece.speedY = -2; }
            if (myGameArea.keys && myGameArea.keys[83]) { myGamePiece.speedY = 2; }

            myBackground.newPos();
            myBackground.update();
            myGamePiece.newPos();
            myGamePiece.update();
            myObstacle.update();
            myObstacle2.update();
            myObstacle3.update();
            myObstacle4.update();
            myObstacle5.update();
            myObstacle6.update();
            myObstacle7.update();
            myObstacle8.update();
            myObstacle9.update();
            myObstacle10.update();
            pincho.update();
            pincho2.update();
            pincho3.update();


            if (interruptor == 1) {
                pincho.y += 2;
                pincho2.y += 2;
                pincho3.y += 2;
                if (pincho.y == 140) {
                    interruptor = 2;
                }

            }


            if (interruptor == 2) {
                pincho.y -= 2;
                pincho2.y -= 2;
                pincho3.y -= 2;
                if (pincho.y == 80) {
                    interruptor = 1;
                }


            }





            pincho4.update();

            if (interruptor3 == 1) {
                pincho4.y += 5;

                if (pincho4.y == 430) {
                    interruptor3 = 2;
                }

            }


            if (interruptor3 == 2) {
                pincho4.y -= 5;

                if (pincho4.y == 240) {
                    interruptor3 = 1;
                }


            }

            pincho5.update();
            pincho6.update();

            if (interruptor2 == 1) {

                pincho5.x += 2;
                pincho6.x += 2;
                if (pincho5.x == 80) {
                    interruptor2 = 2;
                }

            }


            if (interruptor2 == 2) {

                pincho5.x -= 2;
                pincho6.x -= 2;
                if (pincho5.x == 10) {
                    interruptor2 = 1;
                }


            }
            pincho7.update();
            

            if (interruptor4 == 1) {

                pincho7.x += 2.5;
                if (pincho7.x == 310) {
                    interruptor4 = 2;
                }

            }


            if (interruptor4 == 2) {

                pincho7.x -= 2.5;
                if (pincho7.x == 150) {
                    interruptor4 = 1;
                }


            }

            pincho8.update();
            if (interruptor5 == 1) {

                pincho8.x += 2.5;
                if (pincho8.x == 310) {
                    interruptor5 = 2;
                }

            }


            if (interruptor5 == 2) {

                pincho8.x -= 2.5;
                if (pincho8.x == 150) {
                    interruptor5 = 1;
                }


            }

            meta.update();

        }


    }
}
function reiniciar() {
    location.reload();
}
