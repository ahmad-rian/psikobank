import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <MainLayout>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <h2 className="text-lg font-medium text-gray-900">Dashboard</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Welcome to your application's dashboard.
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}