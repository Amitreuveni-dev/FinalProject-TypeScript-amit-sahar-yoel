class GameMap {
    width: number;
    height: number;
}
class Tank {
    location: {x: number; y: number};
    size: number;
}
class PlayerTank extends Tank {

}
class EnemyTank extends Tank {

}
class Wall {
    width: number;
    heigth: number;
    x: number;
    y: number;
}