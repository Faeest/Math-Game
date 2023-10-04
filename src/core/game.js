import { random } from "lodash";

export function Game(difficulty = 1) {
    let result = {
        answer: null,
        question: null,
        answering: false,
        level: 0,
        gameOver: false,
        diffculty: difficulty,
        countDown: true,
        countingDown: false,
        countDownSeconds: 3,
        questionMaker() {
            let questionDifficulty = random(result.diffculty, result.diffculty + 1, false);
            let question = "1 + 1";
            let answer = 2;
            return { question, answer, questionDifficulty };
        },
    };
    return result;
}

// ! 1. question maker
// ! 2. difficulty change the question level
// ? 3. score equation
// ? 4. upload record and the answer
// ? 5. remove game instance
