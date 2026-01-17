import { useEffect, useState } from "react";

const useOnlineStatus = () => {
    const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
    
    useEffect(() => {
        const handleOnline = () => setOnlineStatus(true);
        const handleOffline = () => setOnlineStatus(false);
        
        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);
        
        // Cleanup function to remove event listeners
        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);
    
    return onlineStatus;
};

export default useOnlineStatus;
