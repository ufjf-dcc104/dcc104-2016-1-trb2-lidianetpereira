function Keyboard() {

    var self = this;

    this.buttons = {
        32 : 'space',
        37 : 'left',
        38 : 'up',
        39 : 'right',
        40 : 'down',
        65 : 'a',
        68 : 'd',
        83 : 's',
        87 : 'w',
        190: 'dot'
    };

    this.inputStatus = {};

    for (var button in this.buttons) {
        this.inputStatus[this.buttons[button]] = false;
    }

    this.pressed = function (name) {
        return this.inputStatus[name];
    };

    addEventListener("keydown", function (event) {
        var code = event.which || event.keyCode;
        if (self.buttons[code]) {
            event.preventDefault();
            self.inputStatus[self.buttons[code]] = true;
        }
    });

    addEventListener("keyup", function (event) {
        var code = event.which || event.keyCode;
        if (self.buttons[code]) {
            event.preventDefault();
            self.inputStatus[self.buttons[code]] = false;
        }
    });

}