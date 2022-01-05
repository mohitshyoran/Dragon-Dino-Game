score = 0;
cross = true;
audio = new Audio('songs/music.mp3');
audio.play();
audiogo = new Audio('songs/gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function(e){
    console.log(e.keyCode);
    if(e.keyCode==38){
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(()=>{ 
            dino.classList.remove('animateDino');
        }, 700);
    }
    if(e.keyCode==39){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX+112+"px";
    }
    if(e.keyCode==37){
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX-112+"px";
    }
}  

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);

    if(offsetX <113 && offsetY < 52){
        gameOver.innerHTML = 'Game Over: Relod to Play Again';
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
        
    }
    else if(offsetX < 150 && cross){
        score += 10;
        updateScore(score);
        cross = false;
        setTimeout(()=>{
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.2;
            if(newDur > 3){
                obstacle.style.animationDuration = newDur + 's';
            }
        }, 500);
        
    }
}, 10);

function updateScore(score){
    scoreCount.innerHTML = "Your Score: "+score;
}