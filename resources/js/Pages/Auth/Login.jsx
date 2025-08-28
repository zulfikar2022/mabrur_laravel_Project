import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "../MainLayout";
import { useState } from "react";

export default function Login({ status, canResetPassword }) {
    const [hidePassword, setHidePassword] = useState(true);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <MainLayout user={null} title="লগইন">
            <div className="bg-blue-500 text-white p-4 rounded mb-6 max-w-md mx-auto">
                <p className="text-center mb-4 ">
                    এই ওয়েবসাইটে পণ্য অর্ডার করার জন্য আপনার লগইন করার দরকার
                    নেই। লগইন না করেই আপনি যেকোনো পণ্য অর্ডার করতে পারেবন।{" "}
                </p>
                <Link
                    className="text-center underline block mx-auto font-semibold"
                    href={route("home")}
                >
                    পণ্য অর্ডার করুন
                </Link>
            </div>
            <Head title="লগইন" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form
                onSubmit={submit}
                className="max-w-md mx-auto bg-white p-8 rounded shadow"
            >
                <div>
                    <InputLabel htmlFor="email" value="ইমেইল" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full text-black"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="পাসওয়ার্ড" />

                    <TextInput
                        id="password"
                        type={hidePassword ? "password" : "text"}
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full text-black"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
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

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("register")}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            এই সাইটে নতুন? রেজিস্টার করুন
                        </Link>
                    </div>

                    <PrimaryButton
                        className="ms-4 bg-blue-600"
                        disabled={processing}
                    >
                        লগইন
                    </PrimaryButton>
                </div>
            </form>
        </MainLayout>
    );
}
