// UserProfile.tsx
import React from 'react';
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import DeleteUserForm from "@/Pages/Profile/Partials/DeleteUserForm";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "@/Pages/Profile/Partials/UpdateProfileInformationForm";
import { PageProps } from '@/types';

interface Props extends PageProps {
    mustVerifyEmail: boolean;
    status?: string;
}

export default function UserProfile({ auth, mustVerifyEmail, status }: Props) {
    return (
        <div className="min-h-screen bg-background">
            <Head title="User Profile" />
            <Navbar user={auth.user} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto space-y-6 sm:px-6 lg:px-8">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}