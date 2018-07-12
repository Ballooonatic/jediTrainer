(()=>{ // Don't be a fool, wrap your tool!

function resizeWindow(){
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
}

function init() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d')
    resizeWindow();
}

init();




})()