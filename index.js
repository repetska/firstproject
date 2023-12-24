let score = 0;
    let gameInterval;
    let gameDuration = 60; 
    let timer;

    function startGame() {
        score = 0;
        updateScore();
        document.getElementById('start-btn').disabled = true;
        document.getElementById('game-btn').style.display = 'block';
        document.getElementById('restart-btn').style.display = 'none';
        timer = gameDuration;
        updateTimer();
        gameInterval = setInterval(updateTimer, 1000);
        moveButton();
        playMusic();
        clearStars();
    }

    function updateTimer() {
        document.getElementById('timer-value').innerText = timer;
        if (timer === 0) {
            endGame();
        } else {
            timer--;
        }
    }

    function playMusic() {
        document.getElementById('background-music').play();
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
        spawnStars();
        moveButton();
    }

    function updateScore() {
        document.getElementById('score-value').innerText = score;
    }

    function endGame() {
        clearInterval(gameInterval);
        document.getElementById('start-btn').disabled = false;
        document.getElementById('game-btn').style.display = 'none';
        document.getElementById('restart-btn').style.display = 'block';
        stopMusic();
        saveHighScore();
        displayHighScores();
        alert('Гра закінчена! Ваш результат: ' + score);
    }

    function stopMusic() {
        document.getElementById('background-music').pause();
        document.getElementById('background-music').currentTime = 0;
    }

    function spawnStars() {
        for (let i = 0; i < 5; i++) {
            createStar();
        }
    }

    function createStar() {
        let star = document.createElement('div');
        star.className = 'star';
        document.getElementById('game-container').appendChild(star);

        let button = document.getElementById('game-btn');
        let rect = button.getBoundingClientRect();
        let starX = rect.left + Math.random() * rect.width;
        let starY = rect.top + Math.random() * rect.height;

        star.style.left = starX + 'px';
        star.style.top = starY + 'px';

        setTimeout(() => {
            star.remove();
        }, 500);
    }

    function clearStars() {
        let stars = document.getElementsByClassName('star');
        while (stars.length > 0) {
            stars[0].parentNode.removeChild(stars[0]);
        }
    }

    function restartGame() {
        clearInterval(gameInterval);
        document.getElementById('game-btn').style.display = 'none';
        document.getElementById('restart-btn').style.display = 'none';
        startGame();
    }

    function saveHighScore() {
        let highScores = localStorage.getItem('highScores') ? JSON.parse(localStorage.getItem('highScores')) : [];
        highScores.push(score);
        highScores.sort((a, b) => b - a);
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }

    function displayHighScores() {
        let highScores = localStorage.getItem('highScores') ? JSON.parse(localStorage.getItem('highScores')) : [];
        let highScoresElement = document.getElementById('high-scores-value');
        highScoresElement.innerText = highScores.join(', ');
    }