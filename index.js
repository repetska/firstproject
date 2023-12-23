let score = 0;
    let gameInterval;
    let gameDuration = 60; // тривалість гри у секундах

    function startGame() {
        score = 0;
        updateScore();
        document.getElementById('start-btn').disabled = true;
        document.getElementById('game-btn').style.display = 'block';
        gameInterval = setInterval(endGame, gameDuration * 1000);
        moveButton();
    }

    function moveButton() {
        let button = document.getElementById('game-btn');
        let maxX = window.innerWidth - button.clientWidth;
        let maxY = window.innerHeight - button.clientHeight;

        let randomX = Math.floor(Math.random() * maxX);
        let randomY = Math.floor(Math.random() * maxY);

        button.style.left = randomX + 'px';
        button.style.top = randomY + 'px';
    }

    function increaseScore() {
        score++;
        updateScore();
        moveButton();
    }

    function updateScore() {
        document.getElementById('score-value').innerText = score;
    }

    function endGame() {
        clearInterval(gameInterval);
        document.getElementById('start-btn').disabled = false;
        document.getElementById('game-btn').style.display = 'none';
        alert('Гра закінчена! Ваш результат: ' + score);
    }