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
            let operation = random(2, questionDifficulty + 2, false);
            let sign = ["+", "-", "*", "/"];
            let parenthesisPossibility = questionDifficulty == 1 ? 0 : questionDifficulty == 2 ? 10 : questionDifficulty == 3 ? 15 : 20;
            let operationMaker = (operation) => {
                let res = [];
                for (let i = 0; i < operation; i++) {
                    let parenthesis = random(0, 100, false) < parenthesisPossibility;
                    if (parenthesis && operation - 2 >= 2) {
                        res.push("(" + operationMaker(operation - 2) + ")");
                    } else {
                        let maxNumber = questionDifficulty == 1 ? 20 : questionDifficulty == 2 ? 40 : questionDifficulty == 3 ? 60 : 80;
                        let minNumber = questionDifficulty == 1 ? 1 : questionDifficulty == 2 ? -5 : questionDifficulty == 3 ? -20 : -40;
                        res.push(random(minNumber, maxNumber, false));
                    }
                    if (questionDifficulty == 1) {
                        res.push(sign[random(0, 1, false)]);
                    } else if (questionDifficulty == 2) {
                        let change = random(0, 100, false);
                        let signIndex = change > 90 ? 3 : change > 80 ? 2 : change > 40 ? 1 : 0;
                        res.push(sign[signIndex]);
                    } else if (questionDifficulty == 3) {
                        let change = random(0, 100, false);
                        let signIndex = change > 85 ? 3 : change > 70 ? 2 : change > 35 ? 1 : 0;
                        res.push(sign[signIndex]);
                    } else {
                        let change = random(0, 100, false);
                        let signIndex = change > 80 ? 3 : change > 60 ? 2 : change > 30 ? 1 : 0;
                        res.push(sign[signIndex]);
                    }
                }
                res.pop();
                res = res.map((e) => (e < 0 ? "(" + e + ")" : e));
                return res.join(" ");
            };
            console.log(operationMaker(operation), operation);
            let question = "1 + 1";
            let answer = 2;
            return { question, answer, questionDifficulty };
        },
    };
    return result;
}

// ! scoring system
// ! timer
// ! test
// ? upload record and the answer
// ? remove game instance
