class Controller {
    constructor(canvas) {
        this.entities = [];
        this.score = 0;
        //this.canvas = canvas.link;
        //this.context = this.canvas.getContext('2d'); a 
        this.isRunning = false;
    }

    start() {
        this.entities = [];
        this.isRunning = true;
        this.score = 0;
        this.animate.call(this);
        document.getElementById('score').innerHTML = 0;
        this.animate.call(this);
    }

    stop() {

        this.isRunning = false;
    }
    animate(surface) {
        if (this.isRunning) {
            this.entities.forEach(item => item.draw(surface))
        }
    }
}