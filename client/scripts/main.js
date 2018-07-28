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
// app.renderer.resize(window.innerWidth, window.innerHeight);

// app.renderer.plugins.interaction.cursorStyles.default = "none";

const mouse = app.renderer.plugins.interaction.mouse.global;

let state, saber, drone, crosshair;





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

        "../sprites/drones/drone.png"
    ])
    .on("progress", loadProgressHandler)
    .load(setup)
;





function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url); 
    console.log("progress: " + loader.progress + "%"); 
}



function setup() {
    console.log("~~~ All files loaded ~~~");
    
    state     = play;
    saber     = new Sprite(resources["../sprites/sabers/pinkSaber.png"].texture);
    crosshair = new Sprite(resources["../sprites/sabers/crosshair.png"].texture);
    drone     = new Sprite(resources["../sprites/drones/drone.png"].texture);


    saber.scale.set(0.1);
    saber.anchor.set(0.525, 0.7);

    crosshair.scale.set(0.05);
    crosshair.anchor.set(0.54, 0.54);

    drone.anchor.set(0.5, 0.5);
    drone.scale.set(0.06);
    drone.x = randomInRange(50, app.renderer.width - 50);    
    drone.y = randomInRange(50, app.renderer.height - 50);
    drone.vx = 0.01;
    drone.vy = 0.01;
    drone.accel = 1.1;
    drone.friction = 0.85;
    drone.bounce = 0.2;

    mouse.x = app.screen.width / 2;
    mouse.y = app.screen.height / 2;

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
    updateSaberRotation();
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



function updateSaberRotation() {

    let angleRadians = Math.atan2(mouse.y - crosshair.y, mouse.x - crosshair.x);
    
    saber.rotation = angleRadians + Math.PI / 2;
}



function updateCrosshairPosition() {

    let distance = Math.sqrt( Math.pow(mouse.x - crosshair.x, 2) + Math.pow(mouse.y - crosshair.y, 2) );
    
    if (distance > 90) {
        crosshair.x = crosshair.x + (mouse.x - crosshair.x) * 0.1;
        crosshair.y = crosshair.y + (mouse.y - crosshair.y) * 0.1;
    }
}



function updateDronePosition() {

    // next

}



function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}