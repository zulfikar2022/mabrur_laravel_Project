import MainLayout from "./MainLayout";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaPhoneSquare } from "react-icons/fa";

export default function Contact({ user = null, title = "যোগাযোগ" }) {
    return (
        <MainLayout user={user} title={title}>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-2xl shadow-lg rounded-2xl bg-white p-8">
                    <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
                        যোগাযোগ করুন
                    </h1>
                    <p className="text-center mb-8 text-gray-600">
                        আমাদের সাথে যোগাযোগ করার জন্য নিচের যেকোনো উপায় ব্যবহার
                        করুন:
                    </p>

                    <div className="space-y-1">
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border">
                            <span className="font-medium text-gray-700">
                                <div className="flex items-center gap-2">
                                    <FaPhoneSquare color="green" />{" "}
                                    <p>Phone:</p>
                                </div>
                            </span>
                            <a
                                href="tel:+8801677520339"
                                className="text-blue-600 hover:underline"
                            >
                                01677520339
                            </a>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border">
                            <span className="font-medium text-gray-700">
                                <div className="flex items-center gap-2">
                                    <FaWhatsappSquare color="green" />{" "}
                                    <p>WhatsApp:</p>
                                </div>
                            </span>
                            <a
                                href="https://wa.me/8801677520339"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Chat on WhatsApp (+8801677520339)
                            </a>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border">
                            <span className="font-medium text-gray-700">
                                <div className="flex items-center gap-2">
                                    <FaFacebook color="blue" /> <p>Facebook:</p>
                                </div>
                            </span>
                            <a
                                href="https://www.facebook.com/ablatifbazar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Visit our Facebook Page
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
