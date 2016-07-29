function Player1() {

    this.x = 37;
    this.y = 37;
    this.width = 21;
    this.height = 21;

    this.speed = 100;

    this.dead = false;

    //Bonus
    this.bombPower = 1;
    this.bombsCount = 1;
    //--

    this.bombDelay = 0.5;
    this.delayCount = this.bombDelay;

    //sprite
    this.faceOffset = 0; // ( 0 - Down, 1 - Left, 2 - Right, 3 - Up)
    this.animationOrder = [1, 0, 2, 0]; // ( 0 - Idle, 1 - Moving 1, 2 - Moving 2)
    this.animationIndex = 0;

    this.spriteTime = 0.1;
    this.spriteCount = this.spriteTime;

    this.cdebugx1 = 0;
    this.cdebugy1 = 0;
    this.cdebugx2 = 0;
    this.cdebugy2 = 0;

    this.action = function () {
        
        this.spriteCount -= dt;

        if(this.dead) {
            if(this.spriteCount <= 0 && this.animationIndex < 7) {
                this.spriteCount = this.spriteTime;
                this.animationIndex = this.animationIndex + 1;
            }
            return;
        }

        if(!playing)
            return;

        this.delayCount -= dt;

        if (keyboard.pressed('up') || keyboard.pressed('down') ) {

            var mi = Math.floor(this.y / map.boxSize);
            var mj1 = Math.floor(this.x / map.boxSize);
            var mj2 = Math.floor((this.x + this.width) / map.boxSize);

            if (keyboard.pressed('up')){
                this.faceOffset = 3;

                if (map.map[mi - 1][mj1] >= 3 || map.map[mi - 1][mj2] >= 3) {
                    var dy = Math.min(this.speed * dt,
                        this.y - (mi * map.boxSize));

                    this.y -= dy - 0.1;
                } else
                    this.y -= this.speed * dt;
            } else if (keyboard.pressed('down')){
                this.faceOffset = 0;

                if (map.map[mi + 1][mj1] >= 3 || map.map[mi + 1][mj2] >= 3) {
                    var dy = Math.min(this.speed * dt,
                        (mi + 1) * map.boxSize - (this.y + this.height));

                    this.y += dy - 0.1;
                } else
                    this.y += this.speed * dt;
            }

            //Collision Debug
            this.cdebugx1 = mj1*map.boxSize;
            this.cdebugy1 = mi*map.boxSize;
            this.cdebugx2 = mj2*map.boxSize;
            this.cdebugy2 = mi*map.boxSize;

        } else if (keyboard.pressed('right') || keyboard.pressed('left')) {

            var mi1 = Math.floor(this.y / map.boxSize);
            var mi2 = Math.floor((this.y + this.height) / map.boxSize);
            var mj = Math.floor(this.x / map.boxSize);

            if (keyboard.pressed('right')) {
                this.faceOffset = 2;

                if (map.map[mi1][mj + 1] >= 3 || map.map[mi2][mj + 1] >= 3) {
                    var dx = Math.min(this.speed * dt,
                        (mj + 1) * map.boxSize - (this.x + this.width));

                    this.x += dx - 0.1;
                } else
                    this.x += this.speed * dt;
            } else if (keyboard.pressed('left')) {
                this.faceOffset = 1;

                if (map.map[mi1][mj - 1] >= 3 || map.map[mi2][mj - 1] >= 3) {
                    var dx = Math.min(this.speed * dt,
                        this.x - (mj * map.boxSize));

                    this.x -= dx - 0.1;
                } else
                    this.x -= this.speed * dt;
            }

            //Collision Debug
            this.cdebugx1 = mj*map.boxSize;
            this.cdebugy1 = mi1 *map.boxSize;
            this.cdebugx2 = mj*map.boxSize;
            this.cdebugy2 = mi2*map.boxSize;
        } else {
            this.spriteCount = this.spriteTime;
            this.animationIndex = 1; //Idle
        }

        if(this.spriteCount != this.spriteTime) {
            if(this.spriteCount <= 0) {
                this.spriteCount = this.spriteTime;
                this.animationIndex = (this.animationIndex + 1) % 4;
            }
        }

        var mi = Math.floor((this.y + (this.height / 2)) / map.boxSize);
        var mj = Math.floor((this.x + (this.width / 2)) / map.boxSize);

        if(map.map[mi][mj] < 0) {
            this.dead = true;
            return;
        }

        if(map.map[mi][mj] == 2) {
            var bonus = getBonus(mi, mj);
            if(bonus != null) {
                bonus.consume(this);
            }
        }

        if(keyboard.pressed('dot') && this.bombsCount > 0 && this.delayCount < 0) {

            if(map.map[mi][mj] == 0) {
                this.delayCount = this.bombDelay;
                this.bombsCount--;
                addBomb(mi, mj, this);
            }
        }

    };

    this.draw = function () {
        var drawX = this.x - 2;
        var drawY = this.y - 16;

        if (this.dead) {
            var SpriteX = this.animationIndex * 20;
            ctx.drawImage(imageResources.get('bomber'), SpriteX, 30, 20, 30, drawX, drawY, 25, 37.5);
        } else {
            var SpriteX = this.faceOffset * 60 + this.animationOrder[this.animationIndex] * 20;
            ctx.drawImage(imageResources.get('bomber'), SpriteX, 0, 20, 30, drawX, drawY, 25, 37.5);
        }

        if (debug) {
            ctx.fillStyle = "pink";
            ctx.fillRect(this.x, this.y, this.width, this.height);

            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 4;
            ctx.strokeRect(this.cdebugx1, this.cdebugy1, 32, 32);
            ctx.strokeStyle = "grey";
            ctx.lineWidth = 2;
            ctx.strokeRect(this.cdebugx2, this.cdebugy2, 32, 32);
        }
    };

}
