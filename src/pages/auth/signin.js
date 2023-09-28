"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import Layout from "@/components/layout";
import googleSignIn from "@/firebase/auth/google";
import githubSignIn from "@/firebase/auth/github";
import Link from "next/link";
import { FaArrowRightFromBracket, FaArrowRightToBracket, FaGithub, FaGoogle } from "react-icons/fa6";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
function Signin() {
    const { lang } = useAppContext();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleProvider = async (event) => {
        let providers = [githubSignIn, googleSignIn];
        let aliases = ["github", "google"];
        let indexes = aliases.findIndex((e) => e == event.target.id);
        if (indexes < 0) return false; // inccorect provider argument
        let { result, error } = await providers[indexes]?.();
        if (error) return toast(error.code.replaceAll("-", " ").replaceAll("auth/", ""), { type: "error", theme: localStorage.theme }); //sign in failed
    };
    const handleForm = async (event) => {
        event.preventDefault();
        const { result, error } = await signIn(email, password);
        if (error) return toast(error.code.replaceAll("-", " ").replaceAll("auth/", ""), { type: "error", theme: localStorage.theme }); //sign in failed
    };
    return (
        <Layout>
            <h1 className="w-full text-center mt-10 text-4xl text-[--primary-light] font-medium">{lang?.auth?.[0] ?? "Login"}</h1>
            <form onSubmit={handleForm} className="mx-auto flex flex-wrap max-w-full px-[--margin] sm:max-w-[350px] justify-center">
                <label className="max-w-full" htmlFor="email">
                    <p className="dark:text-anti-flash pt-4 font-medium pb-1 text-onyx">{lang?.auth?.[2] ?? "Email"}</p>
                    <input
                        className="appearance-none placeholder:text-static-onyx/60 ring-4 dark:ring-0 ring-[--primary] bg-static-anti-flash text-onyx rounded-xl w-full py-3 px-3 leading-tight focus:outline-none focus:!ring-4 lighter-hover transition"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder="example@mail.com"
                    />
                </label>
                <label className="max-w-full" htmlFor="password">
                    <p className="dark:text-anti-flash pt-4 font-medium pb-1 text-onyx">{lang?.auth?.[3] ?? "Password"}</p>
                    <input
                        className="appearance-none placeholder:text-static-onyx/60 ring-4 dark:ring-0 ring-[--primary] bg-static-anti-flash text-onyx rounded-xl w-full py-3 px-3 leading-tight focus:outline-none focus:!ring-4 lighter-hover transition"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                    />
                </label>
                <div className="w-full" />
                <Link className="button rounded-lg text-onyx bg-[--primary-light] mt-4 mx-2 flex items-center gap-x-2" href={"/auth/signup"}>
                    <FaArrowRightToBracket />
                    {lang?.auth?.[1] ?? "Register"}
                </Link>
                <button className="button rounded-lg text-anti-flash bg-[--primary] mt-4 mx-2 flex items-center gap-x-2" type="submit">
                    <FaArrowRightFromBracket />
                    {lang?.auth?.[0] ?? "Login"}
                </button>
            </form>
            <button
                className="button rounded-lg text-onyx bg-[--primary-light] mt-4 w-fit mx-auto flex items-center gap-x-2"
                id="google"
                onClick={handleProvider}
            >
                <FaGoogle />
                {lang?.auth?.[4] ?? "Continue with Google"}
            </button>
            <button
                className="button rounded-lg text-onyx bg-[--primary-light] mt-4 w-fit mx-auto flex items-center gap-x-2"
                id="github"
                onClick={handleProvider}
            >
                <FaGithub />
                {lang?.auth?.[5] ?? "Continue with Github"}
            </button>
        </Layout>
    );
}

export default Signin;
