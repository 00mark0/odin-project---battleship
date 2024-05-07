import DOMPurify from "dompurify";

const gameSetupHTML = `
<div class="game-setup">
    <div class="grid-container">
     <div>
        <p id="player-name">Player</p>
        <div class="player-grid">
            
        </div>
     </div>
     <div>
     <p>CPU</p>
        <div class="computer-grid">
            
        </div> 
    </div>
    </div>
    <div class="ships">
        <div id="ship1" class="ship" data-length="5" draggable="true"></div>
        <div id="ship2" class="ship" data-length="4" draggable="true"></div>
        <div id="ship3" class="ship" data-length="3" draggable="true"></div>
        <div id="ship4" class="ship" data-length="3" draggable="true"></div>
        <div id="ship5" class="ship" data-length="2" draggable="true"></div> 
    </div>
    <div class="add-name">
        <label for="name-input">Enter your name:</label>
        <input type="text" id="name-input" name="name-input">
        <button id="add-name">Add Name</button>
    </div>
    <div class="menu-item">
        <label for="difficulty">Difficulty:</label>
        <select id="difficulty" name="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        </select>
    </div>
    <div class="buttons">
        <button id="rotate">Rotate</button>
        <button id="start">Start Game</button>
        <button id="restart">Restart</button>
        <button id="back-to-menu">Back</div> 
    </div>
</div>
`;

export default DOMPurify.sanitize(gameSetupHTML);
