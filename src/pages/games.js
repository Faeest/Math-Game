import Layout from "@/components/layout";
import { useAppContext } from "@/context/AppContext";
import { Game } from "@/core/game";
import gsap from "gsap";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { BsTriangleFill } from "react-icons/bs";
import { FaFlag } from "react-icons/fa6";
export default function Games() {
    const { lang } = useAppContext();
    const [gameInstance, setGameInstance] = useState(null);
    const [bank, setBank] = useState([]);
    const input = useRef();
    const questionElement = useRef();
    const tl = gsap.timeline();
    const clearAll = () => {
        setGameInstance(null);
        setBank([]);
    };
    const skip = () => {
        setGameInstance({ ...gameInstance, answering: true });
    };
    const animate = (answer = false) => {
        tl.clear()
            .set("#app-container", { backgroundColor: answer ? "2a9d8f00" : "#d6282800" })
            .to("#app-container", { duration: 0.3, backgroundColor: answer ? "#2a9d8f55" : "#d6282855" })
            .to("#app-container", { duration: 0.3, backgroundColor: answer ? "#2a9d8f00" : "#d6282800" });
    };
    const wrongAnimation = () => {
        if (!questionElement.current) return;
        gsap.fromTo(
            questionElement.current,
            0.01,
            { x: () => _.random(-5, -20), rotate: () => _.random(-1, -5) },
            { x: () => _.random(5, 20), rotate: () => _.random(1, 5), clearProps: "x", repeat: 20 }
        );
    };
    const answering = (event) => {
        if (event.keyCode != 13 || gameInstance.answering) return;
        if (parseFloat(gameInstance.answer) == input.current.value && !isNaN(input.current.value)) {
            let addedScore = gameInstance.scoreDecider(gameInstance.question, input.current.value);
            animate(true);
            setBank([
                ...bank,
                {
                    question: gameInstance.question,
                    answer: gameInstance.answer,
                    userAnswer: input.current.value,
                    score: addedScore,
                },
            ]);
            setGameInstance({ ...gameInstance, answering: true, score: gameInstance.score + addedScore });
        } else {
            animate();
            wrongAnimation();
        }
    };
    const startGame = () => {
        let diff = document?.querySelector("input[name=difficulty]:checked")?.dataset?.difficulty;
        setGameInstance(Game(Number(diff) || 1));
    };
    useEffect(() => {
        const updateGameInstance = (data = {}) => setGameInstance({ ...gameInstance, ...data });
        if (gameInstance) {
            if (gameInstance.countDown && !gameInstance.countingDown) {
                updateGameInstance({ countingDown: true });
                setTimeout(
                    () =>
                        updateGameInstance({
                            countDown: false,
                            countingDown: false,
                            answering: true,
                        }),
                    gameInstance.countDownSeconds * 1000
                );
            }
            if (gameInstance.answering) {
                updateGameInstance({
                    answering: false,
                    ...gameInstance.questionMaker(),
                });
            }
        }
    }, [gameInstance]);
    return (
        <Layout>
            {gameInstance ? (
                gameInstance.countDown ? (
                    <div
                        className={
                            "w-full grow countdown p-5 flex justify-center items-center text-2xl md:text-4xl text-[--primary-dark] dark:text-[--primary-light] font-bold"
                        }
                    >
                        Starting in {gameInstance.countDownSeconds} seconds
                    </div>
                ) : (
                    <div id="game-container" className="flex flex-col w-full max-h-full gap-y-6 items-center p-[--margin]">
                        <div
                            ref={questionElement}
                            className="w-full mt-10 text-center text-4xl md:text-6xl text-[--primary-dark] font-semibold dark:text-[--primary-light]"
                        >
                            {!gameInstance.answering || gameInstance.question ? gameInstance.question : ""}
                        </div>
                        <div className="flex flex-wrap w-full max-sm:max-w-[400px] sm:w-[400px] sm:px-10 justify-center h-fit cursor-pointer md:mt-20 items-stretch">
                            <div className="flex w-full">
                                <div
                                    onClick={clearAll}
                                    className="button rounded-none rounded-tl-md px-4 z-50 ring-4 dark:ring-0 bg-static-anti-flash dark:bg-[#d62828] ring-[--primary] flex justify-center items-center"
                                >
                                    <FaFlag className="text-[#d62828] dark:text-anti-flash" />
                                </div>
                                <input
                                    ref={input}
                                    onKeyUp={answering}
                                    className="appearance-none shrink min-w-[100px] grow font-semibold z-40 text-center placeholder:text-static-onyx/60 ring-4 dark:ring-0 ring-[--primary] bg-static-anti-flash text-onyx rounded-none py-3 px-3 leading-tight focus:outline-none lighter-hover transition"
                                    type="text"
                                    inputMode="numeric"
                                />
                                <div
                                    onClick={skip}
                                    className="button rounded-none rounded-tr-md px-4 z-50 ring-4 dark:ring-0 bg-static-anti-flash dark:bg-[#d62828] ring-[--primary] flex justify-center items-center"
                                >
                                    <BsTriangleFill className="text-[#d62828] rotate-90 dark:text-anti-flash" />
                                </div>
                            </div>
                            <div className="w-full transition grow dark:bg-[--primary] bg-anti-flash rounded-b-md py-1 dark:py-[7px] text-xl cursor-default font-semibold text-onyx dark:text-anti-flash text-center px-4 ring-4 dark:ring-0 ring-[--primary] z-50">
                                {gameInstance.score ?? 0}
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div className="flex flex-col w-full gap-y-6 max-h-full items-center p-[--margin]">
                    <div className="w-full text-center text-xl sm:text-4xl font-semibold pt-8 text-onyx dark:text-anti-flash">
                        {lang?.games?.[0] ?? "Choose Mode :"}
                    </div>
                    <div className="flex flex-wrap justify-center pt-8">
                        <div className="menu-parent">
                            <input id="classic" name="mode" className={`peer hidden`} type="radio" />
                            <label className="peer-[#classic]:peer-checked:games-radio-checked games-radio-1" htmlFor="classic">
                                Classic
                            </label>
                            <input defaultChecked id="survival" name="mode" className={`peer hidden`} type="radio" />
                            <label className="peer-[#survival]:peer-checked:games-radio-checked games-radio-1" htmlFor="survival">
                                Survival
                            </label>
                            <input id="inverted" name="mode" className={`peer hidden`} type="radio" />
                            <label className="peer-[#inverted]:peer-checked:games-radio-checked games-radio-1" htmlFor="inverted">
                                Inverted
                            </label>
                        </div>
                        {/*  */}
                        <div className="devider w-full grow border border-[--primary] max-sm:hidden"></div>
                        {/*  */}
                        <div className="menu-parent">
                            <input data-difficulty={1} id="easy" name="difficulty" className={`peer hidden`} type="radio" />
                            <label className="peer-[#easy]:peer-checked:games-radio-checked games-radio-2" htmlFor="easy">
                                Easy
                            </label>
                            <input data-difficulty={2} defaultChecked id="normal" name="difficulty" className={`peer hidden`} type="radio" />
                            <label className="peer-[#normal]:peer-checked:games-radio-checked games-radio-2" htmlFor="normal">
                                Normal
                            </label>
                            <input data-difficulty={3} id="hard" name="difficulty" className={`peer hidden`} type="radio" />
                            <label className="peer-[#hard]:peer-checked:games-radio-checked games-radio-2" htmlFor="hard">
                                hard
                            </label>
                        </div>
                    </div>
                    {/* <div className="w-full border-2 border-[rgba(var(--primary-rgb))] mt-10"></div> */}
                    <div onClick={startGame} className="button bg-[--primary] text-anti-flash cursor-pointer mt-10">
                        Start!
                    </div>
                </div>
            )}
        </Layout>
    );
}
