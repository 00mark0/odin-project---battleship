import DOMPurify from "dompurify";

const gameMenuHTML = `
<div class="game-menu">
    <div class="menu-title">Battleship</div>
    <p id="press-key">Press any key to continue</p>
    <footer><a href="https://www.pexels.com/photo/starry-sky-998641/">Photo by Francesco Ungaro</a></footer>
</div>
`;

export default DOMPurify.sanitize(gameMenuHTML);
