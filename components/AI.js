HUMAN_PLAYER = 'o';
AI_PLAYER = 'x';

class Player {
   constructor(numberCharsToWin, max) {
      this.numberCharsToWin = numberCharsToWin;
      this.max = max;
   }

   emptySquares(board) {
      var empty = [];
      for (let i = 0; i < this.max; i++) {
         for (let j = 0; j < this.max; j++) {
            if (!board[i][j])
               empty.push([i, j]);
         }
      }
      return empty;
   }

   onCheckWin(board, simbol, index) {
      if (!index) {
         for (let i = 0; i < this.max; i++) {
            for (let j = 0; j < this.max; j++) {
               if (this.checkGameStatus(i, j, board, simbol))
                  return true;
            }
         }
      } else {
         return this.checkGameStatus(index[0], index[1], board, simbol);
      }
      return false;
   }

   checkGameStatus(i, j, board, simbol) {
      if (
         this.checkHorizontal(i, j, board, simbol) ||
         this.checkVertical(i, j, board, simbol) ||
         this.checkHorizontalVertical(i, j, board, simbol) ||
         this.checkVerticalHorizontal(i, j, board, simbol)
      ) {
         return true;
      }
      return false;
   }

   checkVertical(i, j, board, simbol) {
      let status = { x: 0, o: 0 };
      var player = simbol;
      var z = i - this.max, index = i + this.max;
      for (z; z < index; z++) {
         if (z < 0 || z >= this.max) continue;
         if (board[z][j] === player) {
            status[player] += 1;
         } else {
            status[player] = 0;
         }
         if (status[player] === this.numberCharsToWin) {
            return true;
         }
      }

      return false;
   }

   checkHorizontal(i, j, board, simbol) {
      let status = { x: 0, o: 0 };
      var player = simbol
      var z = j - this.max, index = j + this.max;

      for (z; z < index; z++) {
         if (z < 0 || z >= this.max) continue;

         if (board[i][z] === player) {
            status[player] += 1;
         } else {
            status[player] = 0;
         }
         if (status[player] === this.numberCharsToWin) {
            return true;
         }
      }

      return false;
   }

   checkHorizontalVertical(i, j, board, simbol) {
      let status = { x: 0, o: 0 }
      var player = simbol;
      var y = i, indexy = i + 5;
      var z = j, index = j + 5;
      while (true) {
         if (y > 0 && z > 0) {
            y -= 1;
            z -= 1;
         } else if (indexy > this.max && index > this.max) {
            indexy -= 1;
            index -= 1;
         } else if (indexy > this.max) {
            indexy = this.max;
         } else if (index > this.max) {
            index = this.max;
         }
         else {
            break;
         }
      }

      for (z, y; z < index, y < indexy; z++ , y++) {
         if (z < 0 || y < 0 || z > this.max || y > this.max) continue;
         if (board[y][z] === player) {
            status[player] += 1;
         } else {
            status[player] = 0;
         }
         if (status[player] === this.numberCharsToWin) {
            return true;
         }
      }

      return false;
   }

   checkVerticalHorizontal(i, j, board, simbol) {
      let status = { x: 0, o: 0 }
      var player = simbol;
      var y = i + 5, indexy = i - 5;
      var z = j - 5, index = j + 5;

      for (y, z; y < indexy, z < index; y-- , z++) {
         if (z < 0 || y < 0 || z >= this.max || y >= this.max) continue;
         if (board[y][z] === player) {
            status[player] += 1;
         } else {
            status[player] = 0;
         }
         if (status[player] === this.numberCharsToWin) {
            return true;
         }
      }

      return false;
   }

   minimax(newBoard, player, index) {
      let availableSpots = this.emptySquares(newBoard);
      if (this.onCheckWin(newBoard, HUMAN_PLAYER, index)) {
         return { score: -10 }
      } else if (this.onCheckWin(newBoard, AI_PLAYER, index)) {
         return { score: 10 }
      } else if (availableSpots.length === 0) {
         return { score: 0 }
      }

      let moves = [];

      for (let i = 0; i < availableSpots.length; i++) {
         let move = {};
         move.index = { i: availableSpots[i][0], j: availableSpots[i][1] }
         newBoard[availableSpots[i][0]][availableSpots[i][1]] = player;

         if (player === AI_PLAYER) {
            let result = this.minimax(newBoard, HUMAN_PLAYER, availableSpots[i]);
            move.score = result.score;
         } else {
            let result = this.minimax(newBoard, AI_PLAYER, availableSpots[i]);
            move.score = result.score;
         }

         newBoard[availableSpots[i][0]][availableSpots[i][1]] = '';
         moves.push(move);
      }

      let bestMove;

      if (player === AI_PLAYER) {
         let bestScore = -10000;
         for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
               bestScore = moves[i].score;
               bestMove = i;
            }
         }
      } else {
         let bestScore = 10000;
         for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
               bestScore = moves[i].score;
               bestMove = i;
            }
         }
      }
      return moves[bestMove];
   }
}
export default Player;