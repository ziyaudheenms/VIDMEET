"use client"
import { TokenProvider } from "@/actions/stream.action";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton"
import {

    StreamVideo,
    StreamVideoClient,
    User,
} from "@stream-io/video-react-sdk";
import { ReactNode, useEffect } from "react";
import { useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY || "your-api";

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {

    const [videoClient, setvideoClient] = useState<StreamVideoClient>();
    const { user, isLoaded } = useUser();
    useEffect(() => {
        if (!isLoaded || !user) return;
        if (!apiKey) throw new Error("STREAM_API_KEY is not defined");

        const client = new StreamVideoClient({
            apiKey,
            user: {
                id: user?.id,
                name: user?.username || user?.id,
                image: user?.imageUrl,
            },
            tokenProvider: TokenProvider
        })

        setvideoClient(client)
    }, [user, isLoaded])

    if (!videoClient) {
        return <Skeleton className="w-full h-full" />
    } else {
        return (
            <StreamVideo client={videoClient}>
                {children}
            </StreamVideo>
        );
    }


};

export default StreamVideoProvider