/**
 * MyCrabSmall constructor.
 * @constructor
 * @param {CGFscene} scene The scene to which this tile belongs.
 */
function MyCrabSmall(scene){
    CGFobject.call(this,scene);
    this.scene = scene;

    this.height = 0.8;

    this.cylinder = new MyFullCylinder(this.scene,0.8,0.15,0.15,16,16);

    this.moving = false;
    this.finishedMoving = false;

    this.animation;
    this.init_time = 0;

    this.path;

    this.lastTransformation = mat4.create();
    mat4.identity(this.lastTransformation);

    this.moveAnimation();
}

MyCrabSmall.prototype = Object.create(CGFobject.prototype);
MyCrabSmall.prototype.constructor = MyCrabSmall;


MyCrabSmall.prototype.moveAnimation = function (){

    if (this.moving){
        var controlPoints = [];

        var x = 0;
        var y = 0;
        var z = 0;

        var seconds = 1;
        controlPoints.push(vec3.fromValues(x,y,z));


        y += 1;
        seconds++;

        controlPoints.push(vec3.fromValues(x,y,z));

        y += 0.5;
        z += -1;

        seconds++;
        controlPoints.push(vec3.fromValues(x,y,z));

        while (this.path.length > 0){
            var currentPath = this.path.pop();
            if (currentPath[0] <= 2){
                if (currentPath[1] == currentPath[0] + 3){
                    console.log("1a fila - baixo esquerda");
                    x += 2.5;
                    y += -1.5;

                }
                else if (currentPath[1] == currentPath[0] + 4){
                    console.log("1a fila - baixo direita");
                    x += 2.5;
                    y += 1.5;
                }
            }
            else if (currentPath[0] <= 6){
                if (currentPath[1] == currentPath[0] - 4){
                    console.log("2a fila - cima esquerda");
                    x += -2.5;
                    y += -1.5;

                }
                else if (currentPath[1] == currentPath[0] - 3){
                    console.log("2a fila - cima direita");
                    x += -2.5;
                    y += 1.5;
                }
                else if (currentPath[1] == currentPath[0] + 4){
                    console.log("2a fila - baixo esquerda");
                    x += 2.5;
                    y += -1.5;
                }
                else if (currentPath[1] == currentPath[0] + 5){
                    console.log("2a fila - baixo direita");
                    x += 2.5;
                    y += 1.5;
                }
            }
            else if (currentPath[0] <= 11){
                if (currentPath[1] == currentPath[0] - 5){
                    console.log("3a fila - cima esquerda");
                    x += -2.5;
                    y += -1.5;

                }
                else if (currentPath[1] == currentPath[0] - 4){
                    console.log("3a fila - cima direita");
                    x += -2.5;
                    y += 1.5;
                }
                else if (currentPath[1] == currentPath[0] - 1){
                    console.log("3a fila - só esquerda");
                    y += -3;
                }
                else if (currentPath[1] == currentPath[0] + 1){
                    console.log("3a fila - só direita");
                    y += 3;
                }
                else if (currentPath[1] == currentPath[0] + 4){
                    console.log("3a fila - baixo esquerda");
                    x += 2.5;
                    y += -1.5;
                }
                else if (currentPath[1] == currentPath[0] + 5){
                    console.log("3a fila - baixo direita");
                    x += 2.5;
                    y += 1.5;
                }
            }
            else if (currentPath[0] <= 15){
                if (currentPath[1] == currentPath[0] - 5){
                    console.log("4a fila - cima esquerda");
                    x += -2.5;
                    y += -1.5;

                }
                else if (currentPath[1] == currentPath[0] - 4){
                    console.log("4a fila - cima direita");
                    x += -2.5;
                    y += 1.5;
                }
                else if (currentPath[1] == currentPath[0] + 3){
                    console.log("4a fila - baixo esquerda");
                    x += 2.5;
                    y += -1.5;
                }
                else if (currentPath[1] == currentPath[0] + 4){
                    console.log("4a fila - baixo direita");
                    x += 2.5;
                    y += 1.5;
                }
            }
            else if (currentPath[0] <= 18){
                if (currentPath[1] == currentPath[0] - 4){
                    console.log("5a fila - cima esquerda");
                    x += -2.5;
                    y += -1.5;

                }
                else if (currentPath[1] == currentPath[0] - 3){
                    console.log("5a fila - cima direita");
                    x += -2.5;
                    y += 1.5;
                }
            }

            seconds++;
            controlPoints.push(vec3.fromValues(x,y,z));
        }

        y += -0.5;
        z += 1;

        seconds++;
        controlPoints.push(vec3.fromValues(x,y,z));

        y += -1;

        seconds++;
        controlPoints.push(vec3.fromValues(x,y,z));

        var id = "BigCrab";

        this.animation = new LinearAnimation(id, seconds, controlPoints);
    }

}


MyCrabSmall.prototype.makeMove = function (init_time, path){

    this.moving = true;
    this.init_time = init_time;
    this.path = path;

    this.moveAnimation();

}

MyCrabSmall.prototype.isMoving = function (){

    return this.moving;

}

MyCrabSmall.prototype.isFinishedMoving = function (){

    return this.finishedMoving;

}

MyCrabSmall.prototype.setFinishedMoving = function (finish){

    this.finishedMoving = finish;

}


/**
 * Display function of the scene to render this object.
 */
MyCrabSmall.prototype.display = function() {

    // this.scene.pushMatrix();
    this.cylinder.display();
    // this.scene.popMatrix();
}

MyCrabSmall.prototype.update = function(currTime) {

    var time = currTime;
    time = time - this.init_time;

    //to change from climbing down animation to walking one
    if (this.moving){
        if(time > this.animation.timeSpan){
            this.init_time = currTime;
            mat4.identity(this.lastTransformation);
            mat4.multiply(this.lastTransformation , this.lastTransformation,this.animationTransformation);
            this.finishedMoving = true;
            this.moving = false;
        }
    }


    //if (this.finishedMoving)
    //mat4.multiply(this.lastTransformation , this.lastTransformation,this.animationTransformation);
    this.animationTransformation = this.animation.update(time);

    var anim = mat4.create();
    mat4.identity(anim);
    mat4.multiply(anim, this.lastTransformation, this.animationTransformation);
    return anim;
}




/**
 * texCoords scaling (no effect)
 */
MyCrabSmall.prototype.scaleTexCoords = function(){}
