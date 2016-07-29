var fires = {};
var fireCounter = 0;

function addFire (i, j, inactive) {
    inactive = inactive !== undefined ? inactive : false;

    var id = ++fireCounter;
    fires[id] = new Fire(id, i, j, inactive);
}

function Fire(id, i, j, inactive) {

    this.id = id;
    this.i = i;
    this.j = j;

    //Set bomb on Map
    if (!inactive)
        map.map[this.i][this.j] -= 1;

    this.fireTime = 0.6;

    this.spriteTime = 0.1;
    this.spriteCount = this.spriteTime;
    this.animationIndex = 0;

    this.action = function () {
        this.fireTime -= dt;
        this.spriteCount -= dt;

        if(this.spriteCount <= 0) {
            this.spriteCount = this.spriteTime;
            this.animationIndex = (this.animationIndex + 1) % 6;
        }

        if(this.fireTime <= 0) {
            if (!inactive)
                map.map[this.i][this.j] += 1;
            delete fires[this.id];
        }
    };

    this.draw = function () {
        var spriteX = 60 + this.animationIndex*20;
        ctx.drawImage(imageResources.get('wsprite'), spriteX, 40, 20, 20, this.j*map.boxSize, this.i*map.boxSize, map.boxSize, map.boxSize);
    };

}