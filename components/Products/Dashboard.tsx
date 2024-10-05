'use client'
import { useEffect, useState } from 'react';

interface SessionData {
    isAuth: boolean;
    userId: number;
    role: string;
}

const Dashboard: React.FC = () => {
    const [sessionData, setSessionData] = useState<SessionData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const verifySession = async () => {
            try {
                const response = await fetch('/api/verify-session');
                if (!response.ok) {
                    // Handle the case when the user is not authenticated
                    //window.location.href = '/login'; // Redirect to login page
                } else {
                    const data = await response.json();
                    setSessionData(data);
                }
            } catch (error) {
                console.error('Failed to verify session:', error);
            } finally {
                setLoading(false);
            }
        };

        verifySession();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            {sessionData ? (
                <p>Welcome, User ID: {sessionData.userName}, Role: {sessionData.role}</p>
            ) : (
                <p>User is not authenticated</p>
            )}
        </div>
    );
};

export default Dashboard;
