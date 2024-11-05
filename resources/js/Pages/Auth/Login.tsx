import { useState, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import Navbar from "@/Components/Navbar";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900">
            <Head title="Log in" />
            <Navbar user={null} />

            <div className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg"
                >
                    <div className="p-8">
                        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
                            Welcome Back
                        </h2>
                        {status && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 rounded-md bg-gray-200 dark:bg-gray-700 p-4 text-sm text-gray-800 dark:text-gray-200"
                            >
                                {status}
                            </motion.div>
                        )}
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black dark:focus:ring-white dark:focus:border-white sm:text-sm"
                                        placeholder="you@example.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                </div>
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black dark:focus:ring-white dark:focus:border-white sm:text-sm"
                                        placeholder="••••••••"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                        Remember me
                                    </label>
                                </div>

                                {canResetPassword && (
                                    <div className="text-sm">
                                        <Link
                                            href={route('password.request')}
                                            className="font-medium text-gray-600 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <LogIn className="h-5 w-5 text-gray-300 group-hover:text-gray-400" />
                                    </span>
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-300">
                                        Don't have an account?
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    href={route('register')}
                                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 sm:px-10 dark:bg-gray-700 dark:border-gray-600">
                        <p className="text-xs leading-5 text-gray-500 dark:text-gray-300">
                            By signing in, you agree to our{' '}
                            <a href="#" className="font-medium text-gray-900 hover:underline dark:text-gray-200">
                                Terms
                            </a>{' '}
                            and{' '}
                            <a href="#" className="font-medium text-gray-900 hover:underline dark:text-gray-200">
                                Privacy Policy
                            </a>.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
