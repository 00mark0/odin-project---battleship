import DOMPurify from "dompurify";

const gameSetupHTML = `
<div class="game-setup">
    <div class="grid-container">
        <div class="player-grid"></div>
        <div class="computer-grid"></div> 
    </div>
    <div class="ships">
        <div class="ship" data-length="5" draggable="true"></div>
        <div class="ship" data-length="4" draggable="true"></div>
        <div class="ship" data-length="3" draggable="true"></div>
        <div class="ship" data-length="3" draggable="true"></div>
        <div class="ship" data-length="2" draggable="true"></div> 
    </div>
    <div class="buttons">
        <button id="rotate">Rotate</button>
        <button id="start">Start Game</button>
        <button id="back-to-menu">Back</div> 
    </div>
</div>
`;

export default DOMPurify.sanitize(gameSetupHTML);
