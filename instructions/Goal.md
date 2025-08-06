🚀 Project Roadmap: Tank Game - MVC Architecture (Level 3)
This document outlines a clear, step-by-step roadmap to build your game successfully, using clean architecture and teamwork.
Make sure everyone on your team reads and follows this structure.

📦 Tech Stack
HTML – for the structure and layout

SCSS – for styling and grid design

TypeScript – for all game logic (no import/export yet)

DOM – used instead of Canvas

No localStorage yet – will be added later

✅ PHASE 1: PLANNING & DESIGN
🎯 Goal:
Build a grid-based tank game, where the player moves, shoots, and interacts with the environment.

🧠 Tasks:
 Define game rules (player movement, enemy behavior, shooting, collisions)

 Create a flowchart of the game loop and events

 Sketch layout: header, game board (main), footer

 Agree on visual style (grid size, tile size, tank colors)

✅ PHASE 2: PROJECT STRUCTURE
🧱 Files and Folders:
bash
Copy
Edit
/src
  index.html
  style.scss
  main.ts
/assets
  tank.png
🧠 Tasks:
 Set up basic HTML with header, main, and footer

 Style the layout with SCSS to avoid scrolling

 Create a 10x10 grid using display: grid inside <main>

 Add base styling: colors, button styles, fonts

✅ PHASE 3: CLASS STRUCTURE (OOP)
👷 Classes to Create:
Class	Responsibility
GameMap	Create the grid and map structure
Tank	Base tank class with position and direction
PlayerTank	Inherits from Tank, controlled by keyboard
EnemyTank	Inherits from Tank, moves autonomously
Bullet	Moves in a direction and checks for collision
Game	Manages game state, win/lose conditions

Note: Keep all classes in one .ts file until you learn import/export.

🧠 Tasks:
 Create GameMap class to build the grid via loops

 Store tile positions using data-row and data-col

 Add the player tank to the grid

 Make the tank move with arrow keys

 Add a shoot key (spacebar) to generate bullets

✅ PHASE 4: GAME FUNCTIONALITY
💥 Game Mechanics:
 Movement with arrow keys (left/right/up/down)

 Shooting with spacebar (add bullet div that moves)

 Bullet collision with wall or enemy

 Add walls to the grid using CSS classes

 Add enemy tanks and basic movement

 Add win/lose condition (e.g., all enemies destroyed)

✅ PHASE 5: GAME DESIGN (UI & UX)
🖌️ Tasks:
 Style tanks using background images or colors

 Style bullets with animations (CSS transitions or position updates)

 Show score or level in the header

 Use different colors or shapes for player vs. enemy

✅ PHASE 6: POLISH & DOCUMENT
🧹 Tasks:
 Clean up and comment your code

 Organize code into logical sections

 Add instructions in the header/footer

 Prepare for localStorage (coming soon)

 Create a README.md with explanation and screenshot

✅ PHASE 7: TEAM COLLABORATION (Git)
👥 Tasks:
 Create a GitHub repository

 Each member creates a branch for their task (ex: feature/movement)

 Use commits with meaningful messages

 Merge via pull requests or coordinated pushes

🏁 Final Goal:
Build a fully playable tank game using MVC structure, TypeScript OOP, and a responsive grid layout, with teamwork, good design, and no bugs!