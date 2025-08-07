# 🚀 Project Roadmap: Tank Game - MVC Architecture (Updated Design)

This document provides a clear roadmap for your updated tank game, where there's a vertical wall (barrier) in the middle of the board that **players cannot pass through**, but **bullets can hit and explode/disappear**.

Your team should follow these steps, task by task. Keep all logic in a single `.ts` file (no `export/import`).

---

## 📆 Phase 1: Game Rules & Design

### 🌟 Goal:

A 2-player tank game, grid-based (10x10), with a **center wall** splitting the map top to bottom. Players can move and shoot. Bullets interact with walls and enemies.

### 💡 Key Rules:

* Grid is 10x10 
* Player 1 starts on left side, Player 2 on right
* Vertical wall blocks tanks (but bullets can hit it)
* Each player controls their tank (arrows / WASD)
* Space/Enter to shoot bullets
* Bullets explode on wall, or remove enemy tank

---

## 📆 Phase 2: Folder & File Structure

```
/project-root
  /src
    index.html
    style.scss
    main.ts
  /assets
    tank1.png
    tank2.png
```

---

## 📆 Phase 3: HTML + SCSS Grid Setup ✅

### HTML Structure:

```html
<body>
  <header>Tank Game</header>
  <main></main>
  <footer>Use arrows/WASD to move, space/enter to shoot</footer>
</body>
```

### SCSS Goals:

* Create 10x10 grid with `grid-template`
* Add `.cell` class to every square
* Middle wall (`.wall`) will be styled with different color

### Wall Placement:

* Vertical wall at `col 5` from `row 1` to `row 10`
* Can use `.wall` class on each relevant `.cell`

---

## 📆 Phase 4: GameMap Class ✅

### Responsibilities:

* Generate the grid
* Mark center vertical wall
* Add `data-row` and `data-col` to each cell

### Example:

```ts
class GameMap {
  constructor(public container: HTMLElement) {
    this.renderGrid();
  }

  renderGrid(): void {
    for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 10; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.row = String(row);
        cell.dataset.col = String(col);
        if (col === 5) cell.classList.add("wall");
        this.container.appendChild(cell);
      }
    }
  }
}
```

---

## 📆 Phase 5: Tank Classes

### Base Class: `Tank`

* position (row, col) ✅
* direction (up/down/left/right) ✅
* method: `move()` ✅
* method: `shoot()`

### PlayerTank extends Tank

* Listens to keyboard events (WASD / arrows) ✅
* Can shoot bullets

---

## 📆 Phase 6: Bullet Class

### Properties:

* Position ✅
* Direction ✅
* Active (true/false) ✅

### Methods:

* `move()` every 100ms ✅
* `checkCollision()` with wall or tank
* If bullet hits wall -> disappears
* If bullet hits tank -> removes tank

---

## 📆 Phase 7: Game Class

### Manages:

* Game state
* Creating players
* Bullet updates with `setInterval`
* Victory conditions

---

## 📆 Phase 8: UX & Styling

* Tanks with background images or color
* Bullets as small divs
* Wall styled with dark color
* Use `grid-area` to place tanks & bullets

---

## 📆 Final Goals:

* 2 tanks can move and shoot
* Bullets hit walls or enemies
* Wall in middle blocks players
* Game ends when one player wins
* No bugs, clean UI, all code in 1 file
