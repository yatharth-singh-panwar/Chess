import { Color, PieceSymbol, Square } from "chess.js";

export default function chessBoard({ board } :{
    board:({
        square: Square;
        type: PieceSymbol;  
        color: Color;
    } | null)[][]
}
){
    return(
        //can remove this dont neeed the bg to be black here . it can be white.
        <div className="flex flex-col justify-center items-center">
            {board.map((row, index)=>{
                return(
                    //Every row elemnt will be present side by side.
                    <div className={`flex flex-row key-${index} bg-purple-100`}>
                        {row.map((element, elementIndex)=>{
                            return(
                                <div className={`flex items-center justify-center w-16 h-16 key-${elementIndex} ${((elementIndex + index) % 2) == 0 ? "bg-green-500" : "bg-white"}`}>
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