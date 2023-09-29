import Layout from "@/components/layout";
import { useAppContext } from "@/context/AppContext";
import { Game } from "@/core/game";
import { useEffect, useState } from "react";
export default function Games() {
    const { lang } = useAppContext();
    const [gameInstance, setGameInstance] = useState(null);
    let time, timeForward, answerAction, score;
    const startGame = () => {
        setGameInstance(Game());
    };
    useEffect(() => {
        if (gameInstance && gameInstance.countDown && !gameInstance.countingDown) {
            setGameInstance({ ...gameInstance, countingDown: true });
            setTimeout(() => {
                setGameInstance({ ...gameInstance, countDown: false, countingDown: false });
            }, gameInstance.countDownSeconds * 1000);
        }
    }, [gameInstance]);
    return (
        <Layout>
            {gameInstance ? (
                gameInstance.countDown ? (
                    <div className={"w-full grow countdown p-5 flex justify-center items-center text-2xl md:text-4xl text-[--primary-dark] dark:text-[--primary-light] font-bold"}>Starting in {gameInstance.countDownSeconds} seconds</div>
                ) : (
                    <>LOL</>
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
