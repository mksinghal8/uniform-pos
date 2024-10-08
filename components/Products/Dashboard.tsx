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
        // <div>
        //     {sessionData ? (
        //         <p>Welcome, User ID: {sessionData.userName}, Role: {sessionData.role}</p>
        //     ) : (
        //         <p>User is not authenticated</p>
        //     )}
        // </div>
        <div style={{ width: '100%', height: '500px', border: 'none' }}>
      <iframe
        src="https://web.mydukaan.io/orders?page=1&status=-3" // Replace with the URL you want to embed
        title="External Content"
        style={{ width: '100%', height: '100%' }}
        frameBorder="0"
      />
    </div>
    );
};

export default Dashboard;
