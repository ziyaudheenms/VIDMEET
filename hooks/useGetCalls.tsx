import { useUser } from "@clerk/nextjs";
import { Call, CallRecording, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { log } from "console";
import { useEffect, useState } from "react"
import { toast } from "sonner";

export const useGetCall = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [recording , setRecording] = useState<CallRecording[]>([])

    const client = useStreamVideoClient()
    const { user } = useUser()

    useEffect(() => {
        const loadCalls = async () => {
            if (!client || !user?.id) {
                return;
            }
            setIsLoading(true)
            try {
                const { calls } = await client.queryCalls({
                    filter_conditions: {
                        created_by_user_id: { $eq: user.id }
                    }


                });
                for (const call of calls) {
                    console.log(call.state.startsAt);
                    
                }
                console.log("all calls", calls)
                const allRecordings = [];
                const delayMs = 500; // 500ms delay between each call

                for (const call of calls) {
                    try {
                        const result = await call.queryRecordings();
                        if (result.recordings.length > 0) {
                            allRecordings.push(...result.recordings);
                        }
                    } catch (error) {
                        console.error('Error fetching recordings:', error);
                    }
                }
                console.log("all recordings", allRecordings)
                setRecording(allRecordings);

                setCalls(calls)
            } catch (error) {
                console.log(error);
                toast.error("Some Error Occured ! Try Again Later.")

            }
            finally {
                setIsLoading(false)
            }
        }
        loadCalls();
    }, [client, user?.id])

    const now = new Date();


    const endedCalls = calls.filter(({ state: { startsAt, endedAt } }: Call) => {
        return (startsAt && new Date(startsAt) < now || !!endedAt)
    });

    const upcomingCalls = calls.filter(({ state: { startsAt } }: Call) => {
        return (startsAt && new Date(startsAt) > now)
    });

    return {
        endedCalls,
        upcomingCalls,
        Callrecordings: recording,
        isLoading,
    }
}