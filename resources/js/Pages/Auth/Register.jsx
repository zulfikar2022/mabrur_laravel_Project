import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "../MainLayout";
import { useState } from "react";
import Checkbox from "@/Components/Checkbox";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [hidePassword, setHidePassword] = useState(true);
    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <MainLayout title="register" user={null}>
            <div className="bg-blue-500 text-white p-4 rounded mb-6 max-w-md mx-auto">
                <p className="text-center mb-4 ">
                    এই ওয়েবসাইটে পণ্য অর্ডার করার জন্য আপনার রেজিস্টার করার
                    দরকার নেই। রেজিস্টার না করেই আপনি যেকোনো পণ্য অর্ডার করতে
                    পারেবন।{" "}
                </p>
                <Link
                    className="text-center underline block mx-auto font-semibold"
                    href={route("home")}
                >
                    পণ্য অর্ডার করুন
                </Link>
            </div>
            <Head title="register" />

            <form
                onSubmit={submit}
                className="max-w-md mx-auto bg-white p-8 rounded shadow"
            >
                <h1 className="text-center text-black text-3xl">Register</h1>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full text-black"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2 " />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full text-black"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type={hidePassword ? "password" : "text"}
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full text-black"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type={hidePassword ? "password" : "text"}
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full text-black"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                    <div className="mt-4 block">
                        <label className="flex items-center">
                            <Checkbox
                                name="show-hide-password"
                                checked={!hidePassword}
                                onChange={(e) =>
                                    setHidePassword(!e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                {hidePassword
                                    ? "পাসওয়ার্ড দেখান"
                                    : "পাসওয়ার্ড লুকান"}
                            </span>
                        </label>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        ইতিমধ্যে নিবন্ধিত? লগইন করুন
                    </Link>

                    <PrimaryButton
                        className="ms-4 bg-blue-600"
                        disabled={processing}
                    >
                        রেজিস্টার করুন
                    </PrimaryButton>
                </div>
            </form>
        </MainLayout>
    );
}
