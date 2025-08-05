class Player {
    location: {x: number; y:number}
    width: number;
    height: number;
    speed: number;
    playerElement!: HTMLElement;

    constructor(startX: number, startY: number) {
        this.location = {x: startX, y:startY};
        this.width = 30;
        this.height = 30;
        this.speed = 5;
    }

    render(container: HTMLElement) {
        this.playerElement = document.createElement("div");
        this.playerElement.className = "game-player";

        container.appendChild(this.playerElement);
    }

   move(moveX: number, moveY: number) {
        this.location.x += moveX;
        this.location.y += moveY;

        this.updatePosition();
    }

    updatePosition() {
        this.playerElement.style.left = this.location.x + "px";
        this.playerElement.style.top = this.location.y + "px";
    }
}

const player = new Player(0, 0);
console.log(player);
