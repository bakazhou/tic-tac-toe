class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameOver = false;
        
        // 绑定DOM元素
        this.cells = document.querySelectorAll('.cell');
        this.statusElement = document.getElementById('status');
        this.restartButton = document.getElementById('restart');
        
        // 绑定事件
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleClick(cell));
        });
        this.restartButton.addEventListener('click', () => this.restart());
    }

    handleClick(cell) {
        const index = cell.dataset.index;
        
        // 如果格子已被占用或游戏结束，则返回
        if (this.board[index] || this.gameOver) return;
        
        // 更新棋盘状态
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        
        // 检查是否获胜
        if (this.checkWin()) {
            this.statusElement.textContent = `玩家 ${this.currentPlayer} 获胜！`;
            this.gameOver = true;
            return;
        }
        
        // 检查是否平局
        if (this.checkDraw()) {
            this.statusElement.textContent = '游戏平局！';
            this.gameOver = true;
            return;
        }
        
        // 切换玩家
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.statusElement.textContent = `轮到 ${this.currentPlayer} 下棋`;
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

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    restart() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameOver = false;
        this.cells.forEach(cell => cell.textContent = '');
        this.statusElement.textContent = `轮到 ${this.currentPlayer} 下棋`;
    }
}

// 初始化游戏
window.onload = () => new TicTacToe();