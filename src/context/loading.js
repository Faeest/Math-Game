import { Poppins } from "next/font/google";
import Image from "next/image";
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });
export default function Loading() {
    return (
        <main id="app" className={poppins.className + " bg-static-anti-flash overflow-hidden min-h-screen flex justify-center items-center"}>
            <div className="w-full" style={{ maxWidth: "150px" }}>
                <video src="/loading.webm" loop autoPlay muted className="w-full"></video>
                {/* <Image src="/loading.gif" width={"150"} height="150" /> */}
                <div style={{ marginTop: "-30px", textAlign: "center", fontWeight: "bold", color: "var(--onyx-500)" }}>Loading</div>
            </div>
        </main>
    );
}
