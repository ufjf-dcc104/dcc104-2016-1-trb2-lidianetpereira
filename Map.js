function Map() {

    this.map = [[5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                [5, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
                [5, 0, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5],
                [5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
                [5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5],
                [5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
                [5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5],
                [5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
                [5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5],
                [5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
                [5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 0, 5],
                [5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 5],
                [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]];

    this.boxSize = 32;//in pixels

    this.width = 15 * this.boxSize;
    this.height = 13 * this.boxSize;


    this.draw = function () {

        for (var i = 0; i < 13; i++) {
            for (var j = 0; j < 15; j++) {
                var x = j * this.boxSize;
                var y = i * this.boxSize;

                switch (this.map[i][j]) {
                    case 0: //ground
                        ctx.drawImage(imageResources.get('wsprite'), 0, 21, 19, 18, x, y, this.boxSize, this.boxSize);
                        break;
                    case 2: //Item
                        if (debug) {
                            ctx.fillStyle = "green";
                            ctx.fillRect(x, y, this.boxSize, this.boxSize);
                        }
                        break;
                    case 3: //bomb
                        ctx.drawImage(imageResources.get('wsprite'), 0, 21, 19, 18, x, y, this.boxSize, this.boxSize);
                        if (debug) {
                            ctx.fillStyle = "blue";
                            ctx.fillRect(x, y, this.boxSize, this.boxSize);
                        }
                        break;
                    case 4: //destructable
                        ctx.drawImage(imageResources.get('wsprite'), 100, 21, 19, 18, x, y, this.boxSize, this.boxSize);
                        break;
                    case 5://indestructable
                        ctx.drawImage(imageResources.get('wsprite'), 20, 20, 20, 20, x, y, this.boxSize, this.boxSize);
                        break;
                    default:
                        ctx.drawImage(imageResources.get('wsprite'), 0, 21, 19, 18, x, y, this.boxSize, this.boxSize);
                        if(debug && this.map[i][j] < 0) { //Fire
                            ctx.fillStyle = "red";
                            ctx.fillRect(x, y, this.boxSize, this.boxSize);
                            break;
                        }
                }
            }
        }
    };

}