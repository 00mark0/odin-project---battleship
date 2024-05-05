import DOMPurify from "dompurify";

const gameMenuHTML = `
<div class="game-menu">
    <div class="menu-title">Battleship</div>
    <div class="menu-item">
        <label for="player-name">Player Name:</label>
        <input type="text" id="player-name" name="player-name" required>
    </div>
    <div class="menu-item">
        <label for="difficulty">Difficulty:</label>
        <select id="difficulty" name="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        </select>
    </div>
    <div class="menu-item">
        <button id="start-game">Start Game</button>
    </div>
</div>
`;

export default DOMPurify.sanitize(gameMenuHTML);
