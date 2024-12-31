import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export default function chessBoard({ board, websocket }: {
    board: ({
        square: Square;
        type: PieceSymbol;  
        color: Color;
    } | null)[][],
    websocket: WebSocket|null;
}) {
    const [from, setFrom] = useState<Square| null>(null);
    const  [to, setTo] = useState<Square | null>(null);
        return(
        //can remove this dont neeed the bg to be black here . it can be white.
        <div className="flex flex-col justify-center items-center">
            {board.map((row, index)=>{
                return(
                    //Every row elemnt will be present side by side.
                    <div className={`flex flex-row key-${index} bg-purple-100`}>
                        {/* Remember here that the element can be null So how will you tackle that ?*/}
                        {row.map((element, elementIndex)=>{
                            return(
                                <div onClick={()=>{
                                    if(!from){
                                        setFrom(element?.square ?? null);
                                    }
                                    else{
                                        setTo(element?.square ?? null);
                                        if(!websocket){
                                            return;
                                        }
                                        websocket.send(JSON.stringify({
                                            type:"MOVE",
                                            payload:{
                                                from: from,
                                                to:to
                                            }
                                        }))
                                        setFrom(null);
                                    }
                                }}
                                 className={`flex items-center justify-center w-16 h-16 key-${elementIndex} ${((elementIndex + index) % 2) == 0 ? "bg-green-500" : "bg-white"}`}>
                                    <div>
                                        {element?.type}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}