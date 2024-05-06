import DOMPurify from "dompurify";

const gameMenuHTML = `
<div class="game-menu">
    <div class="menu-title">Battleship</div>
    <div class="menu-item">
        <button id="start-game">Start Game</button>
    </div>
</div>
`;

export default DOMPurify.sanitize(gameMenuHTML);
