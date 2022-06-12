let game;
let net;
let ui;
let points;
let upgrades;
let units;
let tree

window.onload = () => {
    points = new Points();
    units = new Units();
    game = new Game();
    net = new Net();
    upgrades = new Upgrades();
    ui = new Ui();
}