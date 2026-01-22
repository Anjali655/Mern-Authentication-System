import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getData } from "@/context/userContext";


const Login = () => {
    const { setUser } = getData();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        try {
            setIsLoading(true);
            const res = await axios.post('http://localhost:8000/user/login', formData, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            if (res.data.success) {
                toast.success(res.data.message || " logged in successfully!");
                navigate('/');
                setUser(res.data.user);
                localStorage.setItem("accessToken", res.data.accessToken);
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative w-full h-screen  bg-green-100 overflow-hidden">
            <div className="min-h-screen flex flex-col to-muted/20">
                <div className="flex-1 flex items-center justify-center p-4 overflow-y-hidden">
                    <div className="w-full max-w-md space-y-6 justify-center items-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracing-tight text-green-600">
                                Login to your account
                            </h1>
                            <p className="text-gray-600">
                                Start organizing your thoughts & ideas today!
                            </p>
                        </div>
                        <Card className="w-full max-w-sm">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl text-center text-green-600">
                                    Login
                                </CardTitle>
                                <CardDescription className="text-center">
                                    Login to your account to get started with notes app.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <div className="flex flex-col gap-6">
                                        {/* Email */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="m@example.com"
                                                required
                                            />
                                        </div>

                                        {/* Password */}
                                        <div className="grid gap-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password">Password</Label>
                                                <Link
                                                    to="/forgot-password"
                                                    className="text-sm text-green-600 hover:underline"
                                                >
                                                    Forgot password?
                                                </Link>
                                            </div>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    name="password"
                                                    placeholder="Your password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                />
                                                <Button
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    disabled={isLoading}
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent cursor-pointer"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="w-4 h-4 text-gray-600" />
                                                    ) : (
                                                        <Eye className="w-4 h-4 text-gray-600" />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-2">
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="w-full border bg-green-500 hover:bg-green-600 hover:text-white"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                                {/* <Button variant="outline" className="w-full">
                                    Login with Google
                                </Button> */}
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
