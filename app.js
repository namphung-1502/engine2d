let e;
window.onload = function() {
    e = new Engine();
    e.start();
}

window.onresize = function() {
    e.resize();
}