import Layout from "@/components/layout";
import { useAppContext } from "@/context/AppContext";
import { Game } from "@/core/game";
import { useEffect, useReducer, useRef, useState } from "react";
export default function Games() {
    const { lang } = useAppContext();
    const [gameInstance, setGameInstance] = useState(null);
    const [bank, setBank] = useState([]);
    const input = useRef();
    const answering = (event) => {
        if (event.code != "Enter" || gameInstance.answering) return;
        if (parseFloat(gameInstance.answer) == input.current.value) {
            console.log("good");
        }
    };
    const startGame = () => {
        setGameInstance(Game());
    };
    const updateGameInstance = (data = {}) => setGameInstance({ ...gameInstance, ...data });
    useEffect(() => {
        if (gameInstance) {
            if (gameInstance.countDown && !gameInstance.countingDown) {
                updateGameInstance({ countingDown: true });
                setTimeout(() => updateGameInstance({ countDown: false, countingDown: false, answering: true }), gameInstance.countDownSeconds * 1000);
            }
            if (gameInstance.answering) {
                updateGameInstance({ answering: false, ...gameInstance.questionMaker() });
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
                    <div className="flex flex-col w-full max-h-full gap-y-6 items-center p-[--margin]">
                        <div className="w-full mt-10 text-center text-3xl md:text-6xl text-[--primary-dark] font-semibold dark:text-[--primary-light]">
                            {!gameInstance.answering ? gameInstance.question : ""}
                        </div>
                        <input
                            ref={input}
                            onKeyUp={answering}
                            className="appearance-none w-[200px] text-center md:mt-20 placeholder:text-static-onyx/60 ring-4 dark:ring-0 ring-[--primary] bg-static-anti-flash text-onyx rounded-xl py-3 px-3 leading-tight focus:outline-none focus:!ring-4 lighter-hover transition"
                            type="text"
                        />
                    </div>
                )
            ) : (
                <div className="flex flex-col w-full max-h-full gap-y-6 items-center p-[--margin]">
                    <div className="w-full text-center text-xl sm:text-2xl font-medium pt-8 text-onyx dark:text-anti-flash">
                        {lang?.games?.[0] ?? "Choose Mode :"}
                    </div>
                    <div className="flex w-full flex-wrap justify-center gap-10">
                        <input id="classic" name="mode" className={`peer hidden`} type="radio" />
                        <label className="peer-[#classic]:peer-checked:games-radio-checked games-radio" htmlFor="classic">
                            Classic
                        </label>
                        <input name="mode" className={`picker`} type="radio" />
                    </div>
                    <div className="w-full text-center text-xl sm:text-2xl font-medium pt-8 text-onyx dark:text-anti-flash">
                        {lang?.games?.[1] ?? "Choose Difficulty :"}
                    </div>
                    <div className="flex w-full flex-wrap justify-center gap-10">
                        <input name="diffculty" className={`picker`} type="radio" />
                        <input name="diffculty" className={`picker`} type="radio" />
                        <input name="diffculty" className={`picker`} type="radio" />
                    </div>
                    <div onClick={startGame} className="button bg-[--primary] text-anti-flash mt-10 cursor-pointer">
                        Start!
                    </div>
                </div>
            )}
        </Layout>
    );
}
