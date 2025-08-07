# 🚀 Project Roadmap: Tank Game - MVC Architecture (Updated Design)

This document provides a clear roadmap for your updated tank game, where there's a vertical wall (barrier) in the middle of the board that **players cannot pass through**, but **bullets can hit and explode/disappear**.

Your team should follow these steps, task by task. Keep all logic in a single `.ts` file (no `export/import`).

---

📆 Phase 1: Game Rules & Design
🌟 Goal:
✔️ 2-player tank game, grid-based (10x10)

✔️ Center vertical wall splitting map top to bottom

✔️ Players can move tanks

🔲 Players can shoot (not implemented yet)

🔲 Bullets interact with walls and enemies (not implemented yet)

💡 Key Rules:
✔️ Grid is 10x10 (we used 11x11 but same idea)

✔️ Wall blocks tanks

✔️ Each player controls their tank (only player 1 implemented)

🔲 Space/Enter to shoot (not implemented)

🔲 Bullets explode/remove tanks (not implemented)

📆 Phase 2: Folder & File Structure
🔲 All code currently in one file (no file separation yet)

📆 Phase 3: HTML + SCSS Grid Setup
✔️ Created 10x10 grid (actually 11x11)

✔️ Each cell has .cell class

✔️ Center wall marked with .wall class

✔️ Basic HTML structure with <header>, <main>, <footer>

📆 Phase 4: GameMap Class
✔️ GameMap class that generates the grid with data-row and data-col

✔️ Center wall cells marked

✔️ Function to check cell availability

📆 Phase 5: Tank Classes
✔️ Tank class with position, direction, and move() method

✔️ Checks if next cell is free before moving

✔️ Moves tank on the board visually

🔲 PlayerTank with keyboard input for 2 players (only 1 player input so far)

🔲 shoot() method not implemented

📆 Phase 6: Bullet Class
🔲 Not implemented yet

📆 Phase 7: Game Class
🔲 Not implemented yet

📆 Phase 8: UX & Styling
✔️ Basic colors for tanks, walls, and cells

🔲 Improved styling, images not added yet

🔲 Positioning tanks and bullets with CSS grid area (not done yet)

📆 Final Goals:
🔲 Two tanks can move and shoot (only one tank movement so far)

🔲 Bullets hit walls and tanks (not done)

✔️ Center wall blocks tanks

🔲 Game ends when one player wins, UI cleanup
