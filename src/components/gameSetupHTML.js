import DOMPurify from "dompurify";

const gameSetupHTML = `
<div class="game-setup">
    <div class="ships">
        <div><p>Ships:</p></div>
        <div id="ship1" class="ship" data-length="5" draggable="true" title="When selecting a ship, grab it by the green border and place it on the cell you want the ship to start at."></div>
        <div id="ship2" class="ship" data-length="4" draggable="true" title="When selecting a ship, grab it by the green border and place it on the cell you want the ship to start at."></div>
        <div id="ship3" class="ship" data-length="3" draggable="true" title="When selecting a ship, grab it by the green border and place it on the cell you want the ship to start at."></div>
        <div id="ship4" class="ship" data-length="3" draggable="true" title="When selecting a ship, grab it by the green border and place it on the cell you want the ship to start at."></div>
        <div id="ship5" class="ship" data-length="2" draggable="true" title="When selecting a ship, grab it by the green border and place it on the cell you want the ship to start at."></div> 
    </div>
    <div class="grid-container">
     <div>
        <p>Player</p>
        <p id="player-info"></p>
        <div class="player-grid">
            
        </div>
     </div>
     <div class="game-info-container">
        <p id="game-info"></p> 
    </div>
     <div>
     <p>CPU</p>
     <p id="cpu-info"></p>
        <div class="computer-grid">
            
        </div> 
    </div>
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
        <button id="randomize" title="Press Q on the keyboard to place ships randomly.">Randomize</button>
        <button id="restart" title="Press C on the keyboard to restart the setup page.">Restart</button>
        <button id="back-to-menu" title="Press Escape on the keyboard to go back to intro screen.">Back</div> 
    </div>
</div>
`;

export default DOMPurify.sanitize(gameSetupHTML);
