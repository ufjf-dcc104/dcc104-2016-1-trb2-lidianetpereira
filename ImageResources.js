function ImageResources(){
    this.resourcesCount = 0;
    this.resourcesLoaded = 0;
    this.images = {};

    this.loaded = (function(that){
        return function(){
            console.log("Imagem carregada!");
            that.resourcesLoaded++;
        };
    })(this);

    this.addImage = function(key, url){
        this.resourcesCount++;
        var img =  new Image();
        img.onload = this.loaded;
        img.src = url;
        this.images[key] = img;
    };

    this.isReady = function(){
        return (this.resourcesCount === this.resourcesLoaded);
    };

    this.get = function(key){
        return this.images[key];
    };
}