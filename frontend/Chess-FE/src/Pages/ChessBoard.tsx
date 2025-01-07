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
            {board.map((row, rowIndex)=>{
                return(
                    //Every row elemnt will be present side by side.
                    <div className={`flex flex-row key-${rowIndex}`}>
                        {/* Remember here that the element can be null So how will you tackle that ?*/}
                        <div className="flex items-center justify-center w-16 h-16 bg-[#393646] text-bold text-2xl text-white">
                            {8 - rowIndex}
                        </div>  
                        {row.map((element, colIndex)=>{
                            return(
                                <div onClick={()=>{
                                    if(!from){
                                        setFrom(element?.square ?? null);
                                    }
                                    else{
                                        const toindex = ( String.fromCharCode(97 + colIndex) + (8 - rowIndex)) as Square;
                                        setTo(element?.square ?? null);
                                        if(!websocket){
                                            return;
                                        }
                                        websocket.send(JSON.stringify({
                                            type:"MOVE",
                                            move:{
                                                from: from,
                                                to: toindex
                                            }
                                        }))
                                        setFrom(null);
                                    }
                                }}
                                 className={`flex flex-col items-center justify-center ${rowIndex==7 ? `w-16 h-32` : `w-16 h-16`} key-${colIndex} ${((colIndex + rowIndex) % 2) == 0 ? "bg-green-500" : "bg-white"}`}>
                                    <div className ={`${rowIndex==7 ? "flex flex-1 items-center justify-center" :""}`}>
                                        {element?.type == 'p' && <img src={`../../src/assets/pieces-basic-svg/${element.color == 'w'? 'pawn-w' :'pawn-b'}.svg`}></img>}
                                        {element?.type == 'k' && <img src={`../../src/assets/pieces-basic-svg/${element.color == 'w' ? 'king-w' :'king-b'}.svg`}></img>}
                                        {element?.type == 'q' && <img src={`../../src/assets/pieces-basic-svg/${element.color == 'w' ? 'queen-w' :'queen-b'}.svg`}></img>}
                                        {element?.type == 'n' && <img src={`../../src/assets/pieces-basic-svg/${element.color == 'w' ? 'knight-w' :'knight-b'}.svg`}></img>}
                                        {element?.type == 'r' && <img src={`../../src/assets/pieces-basic-svg/${element.color == 'w' ? 'rook-w' :'rook-b'}.svg`}></img>}
                                        {element?.type == 'b' && <img src={`../../src/assets/pieces-basic-svg/${element.color == 'w' ? 'bishop-w' :'bishop-b'}.svg`}></img>}

                                    </div>
                                    { rowIndex == 7 &&
                                        
                                        <div className="flex flex-1 items-center justify-center w-16 h-16 bg-[#393646] text-bold text-2xl text-white">
                                            {String.fromCharCode(97 + colIndex)}
                                        </div>          
                                        
                                    }
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}