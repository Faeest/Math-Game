import Layout from "@/components/layout";
import { useAppContext } from "@/context/AppContext";
import signOut from "@/firebase/auth/signout";
import update from "@/firebase/profile";
import Upload from "@/firebase/upload";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { toast } from "react-toastify";
export default function Profile() {
    const { lang, user } = useAppContext();
    const fileInput = useRef();
    const usernameInput = useRef();
    const [photoURL, setPhotoURL] = useState(user?.photoURL ?? "/user.png");
    const [username, setUsername] = useState(user?.displayName);
    const [onUpdate, setOnUpdate] = useState(false);
    const router = useRouter();
    const updateProfile = async (event) => {
        try {
            event.preventDefault();
            let data = {
                displayName: usernameInput.current.value || user.displayName,
                photoURL: user.photoURL,
            };
            if (fileInput.current.files[0]) {
                setOnUpdate(true);
                await Upload(fileInput.current.files[0]).then((x) => {
                    if (x.error) throw new Error("Error");
                    data.photoURL = x.result;
                });
            }
            await update(data).then((e) => {
                if (e.error) {
                    throw new Error("Error");
                }
            });
            setOnUpdate(false);
            fileInput.current.value = "";
            toast("Profile updated successfully!", { type: "success", theme: localStorage.theme });
        } catch (e) {
            toast("Error encountered!", { type: "error", theme: localStorage.theme });
            setOnUpdate(false);
        }
    };
    return (
        <Layout>
            <form onSubmit={updateProfile} method="post" encType="multipart/form-data" action="" className="flex flex-col gap-y-6 items-center p-[--margin]">
                <input
                    name="photo"
                    ref={fileInput}
                    onChange={(event) => {
                        if (fileInput?.current?.files?.[0]?.size > 2097152) {
                            toast("Your file is too big! (2mb max)", { type: "error", theme: localStorage.theme });
                            fileInput.current.value = "";
                            setPhotoURL(user?.photoURL ?? "/user.png");
                        } else if (fileInput?.current?.files?.[0]) {
                            setPhotoURL(URL.createObjectURL(fileInput?.current?.files?.[0]));
                        }
                    }}
                    accept="image/*"
                    className="hidden"
                    type="file"
                    id="profile-input"
                />
                <label
                    style={{ backgroundImage: `url(${photoURL})` }}
                    htmlFor="profile-input"
                    className="rounded-full bg-cover bg-no-repeat bg-center shadow-xl aspect-square w-[128px] light-hover cursor-pointer overflow-hidden hover:brightness-75 active:brightness-50 transition"
                ></label>
                <label className="max-w-full w-[250px]" htmlFor="email">
                    <p className="dark:text-anti-flash pt-4 font-medium pb-1 text-onyx">Username</p>
                    <input
                        ref={usernameInput}
                        maxLength={12}
                        minLength={4}
                        className="appearance-none placeholder:text-static-onyx/60 ring-4 dark:ring-0 ring-[--primary] bg-static-anti-flash text-onyx rounded-xl w-full py-3 px-3 leading-tight focus:outline-none focus:!ring-4 lighter-hover transition"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        type="text"
                        name="username"
                        id="username"
                        defaultValue={user?.displayName}
                    />
                </label>
                <div className="flex gap-4">
                    <button
                        disabled={onUpdate}
                        type="submit"
                        className={
                            "button flex items-center gap-2 cursor-pointer disabled:cursor-wait rounded-lg bg-[--primary] dark:bg-[--primary-dark] text-anti-flash dark:texy-onyx" +
                            (onUpdate ? " disabled" : "")
                        }
                    >
                        {onUpdate ? "Saving" : "Save"}
                        {onUpdate ? <CgSpinnerTwoAlt className="animate-spin ease-out text-lg" /> : ""}
                    </button>
                    <div
                        className="button cursor-pointer rounded-lg bg-[--primary] dark:bg-[--primary-dark] text-anti-flash dark:texy-onyx"
                        onClick={() =>
                            router
                                .push("/")
                                .then(() =>
                                    signOut().then(() =>
                                        toast(lang?.notification?.logoutSuccess ?? "You've been logged out!", { type: "info", theme: localStorage.theme })
                                    )
                                )
                        }
                    >
                        Logout
                    </div>
                </div>
            </form>
        </Layout>
    );
}
