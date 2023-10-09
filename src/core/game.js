import { random, round } from "lodash";

export function Game(difficulty = 1) {
    let result = {
        score: 0,
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
            let operation = random(2, questionDifficulty + 1, false);
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
            let res = operationMaker(operation);
            console.log(res, eval(res), operation);
            let question = res;
            let answer = eval(res);
            return { question, answer, questionDifficulty };
        },
        scoreDecider(question = "1 + 1", userAnswer = "2") {
            let factor = [];
            let splittedQ = question.split(" ");
            let operators = [
                splittedQ.filter((e) => e == "+"),
                splittedQ.filter((e) => e == "-"),
                splittedQ.filter((e) => e == "*"),
                splittedQ.filter((e) => e == "/"),
            ];
            factor.push({
                // ? f(x) = (x*2)^2
                value: userAnswer.length,
                pow: 2,
                multiplier: 2,
            }); // ! by it's answer length
            factor.push({
                // ? f(x) = (x*2)^3
                value: userAnswer.includes(".") ? userAnswer.split(".")[0].length : userAnswer.length,
                pow: 3,
                multiplier: 2,
            }); // ! by it's number before comma
            factor.push({
                // ? f(x) = (x*2)^3
                value: userAnswer.includes(".") ? userAnswer.split(".")[1].length : 0,
                pow: 3,
                multiplier: 2,
            }); // ! by it's number after comma
            factor.push({
                // ? f(x) = x*80
                value: question.replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "").length,
                multiplier: 80,
            }); // ! by it's length
            factor.push({
                // ? f(x) = x*100
                value: operators[0].length,
                multiplier: 100,
            }); // ! by it's + operator
            factor.push({
                // ? f(x) = x*200
                value: operators[1].length,
                multiplier: 200,
            }); // ! by it's - operator
            factor.push({
                // ? f(x) = x*500
                value: operators[2].length,
                multiplier: 500,
            }); // ! by it's * operator
            factor.push({
                // ? f(x) = x*1200
                value: operators[3].length,
                multiplier: 1200,
            }); // ! by it's / operator
            let summary = factor.map((e) => {
                let res = e.value;
                if (!e.value || (!e.multiplier && !e.pow)) return 0;
                if (e.multiplier) res = res * e.multiplier;
                if (e.pow) res = round(Math.pow(res, e.pow));
                return userAnswer.startsWith("-") ? res * 1.2 : res; // ! multiplier if minus
            });
            console.log(summary);
            summary = summary.reduce((a, c) => a + c);
            summary = Math.round(summary);
            console.log(summary);
            return summary;
        },
    };
    return result;
}

// ! scoring system
// ! timer
// ! test
// ? upload record and the answer
// ? remove game instance
