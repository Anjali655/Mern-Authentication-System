import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Verify = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("Verifying...");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.post(`http://localhost:8000/user/verify`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.success) {
                    setStatus("✅ Email verified successfully!");
                    toast.success(res.data.message);
                    setTimeout(() => { navigate('/login') }, 2000);
                } else {
                    setStatus("❌ Invalid or expired Token.");
                    toast.error(res.data.message);
                }

            }
            catch (error) {
                console.log(error);
                setStatus("❌ " + (error.response?.data?.message || "An error occurred during verification."));
            }
        }
        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="relative w-full  bg-green-100 overflow-hidden">
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl shadow-md text-center w-[90%] max-w-md">
                    <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
                </div>
            </div>
        </div>
    );
};

export default Verify;
