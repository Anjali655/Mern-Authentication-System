import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getData } from "@/context/userContext";
import { API_BASE_URL } from "@/config/api";

const AuthSuccess = () => {
    const { setUser } = getData();
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuth = async () => {
            const params = new URLSearchParams(window.location.search);
            const accessToken = params.get("token");

            if (!accessToken) {
                navigate("/login");
                return;
            }

            try {
                localStorage.setItem("accessToken", accessToken);
                console.log(import.meta.env.VITE_API_URL);
                const { data } = await axios.get(
                    `${API_BASE_URL}/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (data?.success) {
                    setUser(data.user);
                    navigate("/");
                } else {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                navigate("/login");
            }
        };

        handleAuth();
    }, [navigate, setUser]);

    return <h2>Logging in…</h2>;
};

export default AuthSuccess;
