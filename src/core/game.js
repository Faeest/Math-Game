export function Game(diffculty) {
    let result = {
        answer: null,
        question: null,
        answering: false,
        level: 0,
        gameOver: false,
        diffculty: diffculty,
        countDown: true,
        countingDown: false,
        countDownSeconds: 3,
        questionMaker() {
            let question = "1 + 1";
            let answer = 2;
            return { question, answer };
        },
    };
    return result;
}
