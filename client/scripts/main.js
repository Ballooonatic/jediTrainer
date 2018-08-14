// confirms usage of canvas or WebGL in the console

let type = "WebGL";

if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

PIXI.utils.sayHello(type);





// Aliases
const Application = PIXI.Application,
    loader        = PIXI.loader,
    resources     = PIXI.loader.resources,
    Sprite        = PIXI.Sprite
;


// Create a Pixi Application
const app = new Application({ 
    width:       window.innerWidth,  // default: 800
    height:      window.innerHeight, // default: 600
    antialias:   false,              // default: false
    transparent: false,              // default: false
    resolution:  1                   // default: 1
});



// Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

app.stage = new PIXI.display.Stage();

app.renderer.backgroundColor = 0x2d1d1d;

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;

// makes the mouse invisible
app.renderer.plugins.interaction.cursorStyles.default = "none";



const mouse = app.renderer.plugins.interaction.mouse.global;


let state, saber, saberRotationSpeed, prevRotation, drone, crosshair;

let topY = app.screen.height;
let topX = app.screen.width;

let i = 0;






loader
    .add([
        "../sprites/sabers/blueSaber.png",
        "../sprites/sabers/greenSaber.png",
        "../sprites/sabers/orangeSaber.png",
        "../sprites/sabers/pinkSaber.png",
        "../sprites/sabers/purpleSaber.png",
        "../sprites/sabers/redSaber.png",
        "../sprites/sabers/tealSaber.png",
        "../sprites/sabers/yellowSaber.png",

        "../sprites/sabers/crosshair.png",

        "../sprites/drones/drone.png",
        "../sprites/drones/buum.png",

        "../sprites/drones/laser.png",
        "../sprites/drones/laserReflected.png",
    ])
    .on("progress", loadProgressHandler)
    .load(setup)
;





function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url); 
    console.log("progress: " + loader.progress + "%"); 
}



function setup() {
    console.log("~~~ All files loaded ~~~", "\n\n\n");
    
    state     = play;
    saber     = new Sprite(resources["../sprites/sabers/pinkSaber.png"].texture);
    crosshair = new Sprite(resources["../sprites/sabers/crosshair.png"].texture);
    drone     = new Sprite(resources["../sprites/drones/drone.png"].texture);


    saber.scale.set(0.1);
    saber.anchor.set(0.5, 0.7);

    crosshair.scale.set(0.05);
    crosshair.anchor.set(0.54, 0.54);

    drone.anchor.set(0.5, 0.5);
    drone.scale.set(0.06);
    drone.x = randomInRange(50, topX - 50);    
    drone.y = randomInRange(50, topY - 50);
    drone.vx = 0.01;
    drone.vy = 0.01;
    drone.radius = drone.width / 2;
    drone.bounce = -0.9;
    drone.hitArea = new PIXI.Circle(drone.x, drone.y, drone.radius);
    
    mouse.x = topX / 2;
    mouse.y = topY / 2;

    app.stage.addChild(saber);
    app.stage.addChild(crosshair);
    app.stage.addChild(drone);

    createSaberTrail();
    
    app.ticker.add(delta => gameLoop(delta));
}



function gameLoop(delta) {
    state(delta);
}



function play(delta) {
    saber.position.set(mouse.x, mouse.y);
    updateSaberRotation(delta);
    updateCrosshairPosition();
    updateDronePosition();
}






function createSaberTrail(){
    const layer = new PIXI.display.Layer();
    layer.useRenderTexture = true;
    // this flag is required, or you'll get
    // "glDrawElements: Source and destination textures of the draw are the same."
    layer.useDoubleBuffer = true;
    
    const trailSprite = new PIXI.Sprite(layer.getRenderTexture());
    trailSprite.alpha = 0.7;
    layer.addChild(trailSprite);
    
    app.stage.addChild(layer);
    
    const showLayer = new PIXI.Sprite(layer.getRenderTexture());
    app.stage.addChild(showLayer);

    layer.addChild(saber);
}




function updateSaberRotation(delta) {

    let angleRadians = Math.atan2(mouse.y - crosshair.y, mouse.x - crosshair.x);
    
    saber.rotation = angleRadians + Math.PI / 2;

    if (prevRotation) {
        saberRotationSpeed = (saber.rotation - prevRotation) / delta;
    }

    prevRotation = saber.rotation;

}




function updateCrosshairPosition() {

    let distance = Math.sqrt( Math.pow(mouse.x - crosshair.x, 2) + Math.pow(mouse.y - crosshair.y, 2) );
    
    if (distance > 90) {
        crosshair.x = crosshair.x + (mouse.x - crosshair.x) * 0.1;
        crosshair.y = crosshair.y + (mouse.y - crosshair.y) * 0.1;
    }
}




function updateDronePosition() {

    drone.hitArea.x = drone.x;
    drone.hitArea.y = drone.y;

    drone.x += drone.vx;
    drone.y += drone.vy;



    if (mouse.x > drone.x) { drone.vx += 0.01 }
    if (mouse.x < drone.x) { drone.vx -= 0.01 }
    if (mouse.y > drone.y) { drone.vy += 0.01 }
    if (mouse.y < drone.y) { drone.vy -= 0.01 }


    if (drone.x < drone.radius) {
        drone.vx *= drone.bounce;
        drone.x = drone.radius;
        drone.bounce = Math.random() - 1.5
    }
    if (drone.x > topX - drone.radius) {
        drone.vx *= drone.bounce;
        drone.x = topX - drone.radius;
        drone.bounce = Math.random() - 1.5
    }
    if (drone.y < drone.radius) {
        drone.vy *= drone.bounce;
        drone.y = drone.radius;
        drone.bounce = Math.random() - 1.5
    }
    if (drone.y > topY - drone.radius) {
        drone.vy *= drone.bounce;
        drone.y = topY - drone.radius;
        drone.bounce = Math.random() - 1.5
    }


    if (saberDroneCollision()) {
        console.log("hit!", ++i)
    }
    

}




function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}