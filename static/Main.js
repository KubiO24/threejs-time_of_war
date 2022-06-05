let game;
let net;
let ui;
let points;
let upgrades;

window.onload = () => {
    game = new Game();
    net = new Net();
    ui = new Ui();
    points = new Points();
    upgrades = new Upgrades();
}