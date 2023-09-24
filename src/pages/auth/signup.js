"use client";
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";
import Link from "next/link";
import { FaArrowRightFromBracket, FaArrowRightToBracket } from "react-icons/fa6";
function SignUp() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    const handleForm = async (event) => {
        event.preventDefault();

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error);
        }

        // else successful
        return router.push("/");
    };
    return (
        <Layout>
            <h1 className="w-full text-center mt-10 text-4xl text-[--primary-light] font-medium">Register</h1>
            <form onSubmit={handleForm} className="mx-auto flex flex-wrap max-w-full px-[--margin] sm:max-w-[350px] justify-center">
                <label className="max-w-full" htmlFor="email">
                    <p className="dark:text-anti-flash pt-4 font-medium pb-1 text-onyx">Email</p>
                    <input className='appearance-none placeholder:text-static-onyx/60 ring-4 dark:ring-0 ring-[--primary] bg-static-anti-flash text-onyx rounded-xl w-full py-3 px-3 leading-tight focus:outline-none focus:!ring-4 lighter-hover transition' onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                </label>
                <label className="max-w-full" htmlFor="password">
                    <p className="dark:text-anti-flash pt-4 font-medium pb-1 text-onyx">Password</p>
                    <input className='appearance-none placeholder:text-static-onyx/60 ring-4 dark:ring-0 ring-[--primary] bg-static-anti-flash text-onyx rounded-xl w-full py-3 px-3 leading-tight focus:outline-none focus:!ring-4 lighter-hover transition' onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                </label>
                <Link className="button rounded-lg text-onyx bg-[--primary-light] mt-4 mx-2 flex items-center gap-x-2" href={'/auth/signin'}><FaArrowRightFromBracket />Login</Link>
                <button className="button rounded-lg text-anti-flash bg-[--primary] mt-4 flex items-center gap-x-2" type="submit"><FaArrowRightToBracket />Register</button>
            </form>
        </Layout>
    );
}

export default SignUp;
