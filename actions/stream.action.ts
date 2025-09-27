"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
import { StreamSfuClient } from "@stream-io/video-react-sdk";
import { use } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY || "your-api" ;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const TokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error("User is not authenticated");
    if (!apiKey) throw new Error("STREAM_API_KEY is not defined");
    if (!apiSecret) throw new Error("STREAM_API_SECRET is not defined");

    const client = new StreamClient(apiKey,apiSecret)
    const vailidity = 60 * 60;

    const token = client.generateUserToken({ user_id: user.id, validity_in_seconds: vailidity });
    return token
}