class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameOver = false;
        
        this.boardElement = document.getElementById('board');
        this.statusElement = document.getElementById('status');
        this.restartButton = document.getElementById('restart');
        
        this.initializeBoard();
        this.restartButton.addEventListener('click', () => this.restart());
    }

    initializeBoard() {
        this.boardElement.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('click', () => this.makeMove(i));
            this.boardElement.appendChild(cell);
        }
    }

    makeMove(index) {
        if (this.board[index] || this.gameOver) return;
        
        this.board[index] = this.currentPlayer;
        this.boardElement.children[index].textContent = this.currentPlayer;
        
        if (this.checkWin()) {
            this.statusElement.textContent = `玩家 ${this.currentPlayer} 获胜！`;
            this.gameOver = true;
            return;
        }
        
        if (this.board.every(cell => cell)) {
            this.statusElement.textContent = '平局！';
            this.gameOver = true;
            return;
        }
        
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.statusElement.textContent = `轮到 ${this.currentPlayer} 玩家`;
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横向
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // 纵向
            [0, 4, 8], [2, 4, 6]             // 对角线
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] &&
                   this.board[a] === this.board[b] &&
                   this.board[a] === this.board[c];
        });
    }

    restart() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.statusElement.textContent = `轮到 ${this.currentPlayer} 玩家`;
        Array.from(this.boardElement.children).forEach(cell => {
            cell.textContent = '';
        });
    }
}

// 初始化游戏
new TicTacToe(); 