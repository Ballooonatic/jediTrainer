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

app.renderer.backgroundColor = 0x2d1d1d;

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);





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
    
    const mouse = app.renderer.plugins.interaction.mouse.global;
    const saber = new Sprite(resources["../sprites/sabers/pinkSaber.png"].texture);
    const drone = new Sprite(resources["../sprites/drones/drone.png"].texture);



    saber.scale.set(0.1);
    saber.anchor.set(0.5, 0.9);


    drone.anchor.set(0.5, 0.5);
    drone.scale.set(0.06);
    drone.x = randomInRange(50, app.renderer.width - 50);    
    drone.y = randomInRange(50, app.renderer.height - 50);


    app.stage.addChild(saber);
    app.stage.addChild(drone);

    app.ticker.add(() => {
        saber.position.set(mouse.x, mouse.y);
        // saber.rotation += 0.25;
        // updateSaberRotation();
    })
}



function updateSaberRotation() {
    // either rotate based on previous mouse coords, with a velocity based on what angle the saber is at
    // or create a cursor that determines the angle of the saber by the coords of your mouse
}    



function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}