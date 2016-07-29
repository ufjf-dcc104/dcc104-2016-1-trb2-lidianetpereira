var bonuses = {};

function getBonus (i, j) {
    var id = i + "-" + j;
    if (bonuses.hasOwnProperty(id) && bonuses[id] != undefined) {
        return bonuses[id];
    } else {
        return null;
    }
}

function addBonus (i, j) {
    var id = i+"-"+j;

    var type = Math.floor(Math.random() * 3);

    bonuses[id] = new Bonus(id, i, j, type);
}

function Bonus(id, i, j, type) {

    this.id = id;
    this.i = i;
    this.j = j;
    this.type = type;

    //Set bonus on Map
    map.map[this.i][this.j] = 2;

    this.draw = function () {
        var spriteX = this.type*20;
        ctx.drawImage(imageResources.get('wsprite'), spriteX, 0, 20, 20, this.j*map.boxSize, this.i*map.boxSize, map.boxSize, map.boxSize);
    };

    this.consume = function (player) {

        switch(bonuses[id].type) {
            case 0: //bomb power
                player.bombPower += 1;
                break;
            case 1: //More bombs
                player.bombsCount += 1;
                break;
            case 2:
                player.speed += 15;
                break;
        }

        this.delete();
    };

    this.delete = function () {
        map.map[this.i][this.j] = 0;
        delete bonuses[this.id];
    };

}