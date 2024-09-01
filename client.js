const socket = io();

const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

let currentPlayer = 'player1'; // Começa com player1

// Atualiza a posição de um jogador
function movePlayer(player, x, y) {
    player.style.left = `${x}px`;
    player.style.top = `${y}px`;
}

// Move o jogador com base nas teclas pressionadas
function movePlayerWithKeys(player, direction) {
    const step = 10; // Quantidade de pixels para cada movimento
    let currentX = parseInt(player.style.left || '0', 10);
    let currentY = parseInt(player.style.top || '0', 10);

    switch (direction) {
        case 'up':
            currentY -= step;
            break;
        case 'down':
            currentY += step;
            break;
        case 'left':
            currentX -= step;
            break;
        case 'right':
            currentX += step;
            break;
    }

    movePlayer(player, currentX, currentY);
    socket.emit('move', { x: currentX, y: currentY, player: currentPlayer });
}

// Lida com eventos de teclado
function onKeyDown(event) {
    if (currentPlayer === 'player1') {
        switch (event.key) {
            case 'ArrowUp':
                movePlayerWithKeys(player1, 'up');
                break;
            case 'ArrowDown':
                movePlayerWithKeys(player1, 'down');
                break;
            case 'ArrowLeft':
                movePlayerWithKeys(player1, 'left');
                break;
            case 'ArrowRight':
                movePlayerWithKeys(player1, 'right');
                break;
        }
    } else if (currentPlayer === 'player2') {
        switch (event.key) {
            case 'w':
                movePlayerWithKeys(player2, 'up');
                break;
            case 's':
                movePlayerWithKeys(player2, 'down');
                break;
            case 'a':
                movePlayerWithKeys(player2, 'left');
                break;
            case 'd':
                movePlayerWithKeys(player2, 'right');
                break;
        }
    }
}

// Lida com eventos de movimento de toque
function onTouchMove(event) {
    const touch = event.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    if (currentPlayer === 'player1') {
        movePlayer(player1, x, y);
        socket.emit('move', { x, y, player: 'player1' });
    } else if (currentPlayer === 'player2') {
        movePlayer(player2, x, y);
        socket.emit('move', { x, y, player: 'player2' });
    }
}

// Adiciona ouvintes de eventos
document.addEventListener('keydown', onKeyDown);
document.addEventListener('touchmove', onTouchMove);

// Atualiza a posição dos jogadores com base nas mensagens recebidas do servidor
socket.on('move', (data) => {
    if (data.player === 'player1') {
        movePlayer(player1, data.x, data.y);
    } else if (data.player === 'player2') {
        movePlayer(player2, data.x, data.y);
    }
});
