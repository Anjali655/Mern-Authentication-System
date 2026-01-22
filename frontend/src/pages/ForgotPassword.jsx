import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await axios.post(`http://localhost:8000/user/forgot-password`, {
                email
            });
            console.log(email)
            if (res.data.message) {
                navigate(`/verify-otp/${email}`);
                toast.success(res.data.message);
                setEmail("");
            }
        }
        catch (error) {
            console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message);

        } finally {
            setIsLoading(false);
            setError("");
        }
    };


    return (
        <div className="bg-green-100 relative w-full overflow-hidden h-screen">
            <div className="min-h-screen flex flex-col">
                {/* Main Content */}
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="w-full max-w-md space-y-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight text-green-600">
                                Reset your password
                            </h1>
                        </div>
                        <Card className="w-full max-w-sm">
                            <CardHeader>
                                <CardTitle className="text-center">Forgot Password</CardTitle>
                                <CardDescription className="text-center">
                                    {isSubmitted
                                        ? "Check your email for reset instructions"
                                        : "Email your email address to recieve a password reset link"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}
                                {isSubmitted ? (
                                    <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                                        <div className="bg-primary/10 rounded-full p-3">
                                            <CheckCircle className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="font-medium text-lg">Check your inbox</h3>
                                            <p className="text-muted-foreground">
                                                We've sent a password reset link to{" "}
                                                <span className="font-medium text-foreground">
                                                    {email}
                                                </span>
                                            </p>
                                            <p>
                                                if you don't see the email, check your spam folder or{" "}
                                                <button
                                                    className="text-primary hover:underline font-medium"
                                                    onClick={() => setIsSubmitted(false)}
                                                >
                                                    try again
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleForgotPassword} className="space-y-4">
                                        <div className="flex flex-col gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="m@example.com"
                                                    required
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <Button className="text-white bg-green-600 w-full relative hover:bg-green-500 cursor-pointer">
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Sending reset link
                                                    </>
                                                ) : (
                                                    "Send reset link"
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-center">
                                <p>Remember your password? </p>
                                <Link
                                    to={"/login"}
                                    className="text-green-600 hover:underline ml-2 font-medium relative"
                                >
                                    {" "}
                                    Sign in
                                </Link>
                            </CardFooter>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
