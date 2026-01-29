import { BookA, BookOpen, LogOut, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getData } from '@/context/userContext';
import axios from 'axios';
import { toast } from 'sonner';

const Navbar = () => {
    const { user, setUser } = getData();
    console.log(user);
    const accessToken = localStorage.getItem("accessToken")


    const logoutHandler = async () => {
        try {
            const res = await axios.post("http://localhost:8000/user/logout", {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                setUser(null);
                toast.success(res.data.message || "Logged out successfully!");
                localStorage.clear();
            }
        }
        catch (err) {
            console.log(err.response?.data?.message);
            toast.error(err.response?.data?.message);
        }
    }

    return (
        <nav className='p-2 border border-gray-200 bg-transparent'>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                {/* logo */}
                <div className='flex gap-2 items-center'>
                    <BookOpen className='h-6 w-6 text-green-800' />
                    <h1 className='font-bold text-xl'><span className='text-green-600'>Notes</span>App</h1>
                </div>
                <div className='flex gap-7 items-center'>
                    <ul className='flex gap-7 items-center text-lg font-semibold'>
                        <li>Features</li>
                        <li>Pricing</li>
                        <li>About</li>
                        {
                            user ?
                                (<DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                src={user?.avatar}
                                                alt={user?.username || "User avatar"}
                                            />
                                            <AvatarFallback>
                                                {user?.username?.charAt(0)?.toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </DropdownMenuItem>

                                        <DropdownMenuItem>
                                            <BookA className="mr-2 h-4 w-4" />
                                            Notes
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem
                                            onClick={logoutHandler}
                                            className="text-red-600 focus:text-red-600"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                ) : (
                                    <Link to="/login">
                                        <li>Sign in</li>
                                    </Link>
                                )}

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar