import { Link } from "@inertiajs/react";
import React from "react";

const Footer = ({ user = null }) => {
    return (
        <footer className="bg-blue-400 text-white p-6 mt-10">
            {/* Buttons Section */}
            <div className="flex justify-center space-x-4 mb-4">
                {!user ? (
                    <>
                        <Link
                            href={route("register")}
                            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Register
                        </Link>
                        <Link
                            href={route("login")}
                            className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                        >
                            Login
                        </Link>
                    </>
                ) : (
                    <Link className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700">
                        Logout
                    </Link>
                )}
            </div>

            {/* GitHub Link */}
            <div className="text-center text-sm text-white bg-yellow">
                This site is Developed by{" "}
                <a
                    href="https://my-portfolio-gold-theta-43.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline"
                >
                    Sayed Zulfikar Mahmud
                </a>
            </div>
        </footer>
    );
};

export default Footer;
