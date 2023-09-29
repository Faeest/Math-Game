export function Game(diffculty) {
    let result = {
        question: null,
        answer: null,
        level: 0,
        gameOver: false,
        diffculty: diffculty,
        countDown: true,
        countingDown: false,
        countDownSeconds: 3,
        questionMaker() {
            result.question = "1 + 1";
            result.answer = 2;
        },
    };
    return result;
}
