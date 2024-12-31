import { useEffect, useState } from "react"
const wsURL = "ws:localhost:8080";

export default function useSocket(){
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket(wsURL);
        ws.onopen = ()=>{
            setSocket(ws);
        }

        ws.onclose = ()=>{
            setSocket(null);
        }

        //Cleaning up the effect.
        return ()=>{
            ws.close();
        }

    }, [])

    return socket;
}