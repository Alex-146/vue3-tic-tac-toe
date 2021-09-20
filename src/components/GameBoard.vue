<template>
  <div v-if="hasWinner">
    <h1>{{ winner }}</h1>
    <button @click="restart">Restart</button>
  </div>
  <div class="board">
    <button
      v-for="(value, index) in board"
      :key="index"
      @click="handleClick(index)"
    >{{ value }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: [],
      winner: ""
    }
  },
  created() {
    this.restart()
  },
  methods: {
    getEmptyIndexes() {
      return this.board
        .map((value, i) => ({ value, i }))
        .filter(({ value }) => !value)
        .map(({ i }) => i)
    },
    getRandomizedIndex() {
      const empty = this.getEmptyIndexes()
      const index = Math.floor(Math.random() * empty.length)
      return empty[index]
    },
    isEmptyAt(index) {
      return !this.board[index]
    },
    playerTurnAt(index) {
      this.board[index] = "X"
      this.calculateWinner()
    },
    enemyRandomTurn() {
      if (this.hasWinner) return

      const rnd = this.getRandomizedIndex()
      this.board[rnd] = "O"
      this.calculateWinner()
    },
    checkWinner() {
      const winLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      const equal3 = (a, b, c) => {
        return !!a && a === b && a === c
      }

      for (let i = 0; i < winLines.length; i++) {
        const [a, b, c] = winLines[i]
        if (equal3(this.board[a], this.board[b], this.board[c])) {
          return `${this.board[a]} Wins!`
        }
      }
      if (this.board.every(value => value)) return "Tie!"
      return ""
    },
    calculateWinner() {
      this.winner = this.checkWinner()
    },
    handleClick(index) {
      if (this.hasWinner) return

      if (this.isEmptyAt(index)) {
        this.playerTurnAt(index)
        this.enemyRandomTurn()
      }
    },
    restart() {
      this.board = Array(9).fill("")
      this.winner = ""
    }
  },
  computed: {
    hasWinner() {
      return this.winner.length > 0
    }
  }
}
</script>

<style>
:root {
  --square-size: 100px;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, var(--square-size));
  grid-template-rows: repeat(3, var(--square-size));
}
</style>