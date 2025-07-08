import {useEffect, useState} from "react";
import {storage} from "@/lib/stoarge.ts";

export const useAccessToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAccessToken = async () => {
            const token = await storage.get('accessToken');
            setToken(token);
            setLoading(false);
        }

        loadAccessToken();
    }, []);

    return {token, loading};
};
