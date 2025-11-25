import React from "react";
import { Link } from "react-router-dom";

interface NotificationModalProps {
    show: boolean;
    title?: string;
    message: string;
    onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
    show,
    title = "Berhasil",
    message,
    onClose,
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white w-80 p-5 rounded-lg shadow-lg animate-fadeIn">

                <h3 className="text-lg font-semibold text-green-600 mb-2">
                    {title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">{message}</p>

                <Link to={'/'}>
                    <button
                        className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                    >
                        OK
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NotificationModal;
