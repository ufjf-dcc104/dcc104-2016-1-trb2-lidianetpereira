var bombs = {};

function getBomb (i, j) {
    var id = i + "-" + j;
    if (bombs.hasOwnProperty(id) && bombs[id] != undefined) {
        return bombs[id];
    } else {
        return null;
    }
}

function addBomb (i, j, player) {
    var id = i+"-"+j;
    bombs[id] = new Bomb(id, i, j, player);
}

function Bomb(id, i, j, player) {

    this.id = id;
    this.i = i;
    this.j = j;
    this.player = player;
    this.power = this.player.bombPower;

    //Set bomb on Map
    map.map[this.i][this.j] = 3;

    this.exploded = false;

    this.explodeTime = 2;

    this.spriteTime = 0.7;
    this.spriteCount = this.spriteTime;
    this.animationIndex = 0;

    this.action = function () {
        this.explodeTime -= dt;
        this.spriteCount -= dt;

        if(this.spriteCount <= 0) {
            this.spriteCount = this.spriteTime;
            this.animationIndex = (this.animationIndex + 1) % 3;
        }


        if(this.explodeTime <= 0)
            this.explode();
    };

    var setFire = function (i, j){
        var willContinue = true;

        switch(map.map[i][j]) {
            case 2:
                var bonus = getBonus(i, j);
                if(bonus != null)
                    bonus.delete();
                addFire(i, j);
                break;
            case 3:
                var bomb = getBomb(i,j);
                if(bomb != null)
                    bomb.explode();
                break;
            case 4:
                if(Math.random() < 0.10)
                    addBonus(i,j);
                else
                    map.map[i][j] = 0;
                addFire(i, j, true);
                willContinue = false;
                break;
            case 5:
                willContinue = false;
                break;

            default:
                addFire(i, j);
                break;
        }

        return willContinue;
    };

    this.explode = function () {
        if (!this.exploded) {
            this.exploded = true;
            map.map[this.i][this.j] = 0;
            addFire(this.i, this.j);
            
            //down
            for(var i = this.i+1; i <= this.i+this.power; i++)
                if(!setFire(i, this.j))
                    break;

            //up
            for(var i = this.i-1; i >= this.i-this.power; i--)
                if(!setFire(i, this.j))
                    break;

            //right
            for(var j = this.j+1; j <= this.j+this.power; j++)
                if(!setFire(this.i, j))
                    break;

            //left
            for(var j = this.j-1; j >= this.j-this.power; j--)
                if(!setFire(this.i, j))
                    break;
            
            this.player.bombsCount++;
            delete bombs[this.id];
        }
    };

    this.draw = function () {
        var spriteX = this.animationIndex*20;
        ctx.drawImage(imageResources.get('wsprite'), spriteX, 40, 20, 20, this.j*map.boxSize, this.i*map.boxSize, map.boxSize, map.boxSize);
    };

}