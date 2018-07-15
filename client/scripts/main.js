// confirms usage of canvas or WebGL in the console

let type = "WebGL";

if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

PIXI.utils.sayHello(type);




// Aliases
let Application = PIXI.Application,
    loader      = PIXI.loader,
    resources   = PIXI.loader.resources,
    Sprite      = PIXI.Sprite
;


// Create a Pixi Application
let app = new Application({ 
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
        "../sprites/sabers/saber.png",
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

    const saber = new Sprite(resources["../sprites/sabers/saber.png"].texture);
    const drone = new Sprite(resources["../sprites/drones/drone.png"].texture);

    drone.x = Math.floor(Math.random() * app.renderer.width);
    drone.y = Math.floor(Math.random() * app.renderer.height);

    app.stage.addChild(saber);
    app.stage.addChild(drone);

    app.ticker.add(() => {
        let mouse = app.renderer.plugins.interaction.mouse.global;
        saber.position.set(mouse.x, mouse.y)
    })
}