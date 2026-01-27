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
import { Chrome, Eye, EyeOff, Github, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
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
            const res = await axios.post('http://localhost:8000/user/register', formData, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            if (res.data.success) {
                toast.success(res.data.message || "Account created successfully!");
                navigate("/verify");
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
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold tracing-tight text-green-600">
                                Create your account
                            </h1>
                            <p className="text-gray-600">
                                Start organizing your thoughts & ideas today!
                            </p>
                        </div>
                        <Card className="w-full max-w-sm">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl text-center text-green-600">
                                    Signup
                                </CardTitle>
                                <CardDescription className="text-center">
                                    Create your account to get started with notes app.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <div className="flex flex-col gap-6">
                                        {/* {Full name} */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="full name">Full name</Label>
                                            <Input
                                                id="full name"
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>

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
                                            <Label htmlFor="password">Password</Label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    name="password"
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
                                            Creating account...
                                        </>
                                    ) : (
                                        "Signup"
                                    )}
                                </Button>


                                <CardDescription className="">
                                    Already have an Account?{" "}
                                    <span className="text-sm text-green-600 hover:underline">
                                        <Link to={"/login"}>Login</Link>
                                    </span>
                                </CardDescription>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
