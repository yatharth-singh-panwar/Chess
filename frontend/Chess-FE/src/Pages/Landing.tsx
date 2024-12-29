export function Landing(){
    return(
    <div className="h-screen w-screen bg-[#393646] flex items-center justify-center gap-80">
        <div className="">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wv-JyqkzBPlELp3mUEvMDiBg7kq_gEhHGA&s" className="rounded-lg" height={100} width={500} ></img>
        </div>
        <div className="flex flex-col gap-32 items-center">   
            <div>
                <h1 className="text-white text-4xl font-bold">WELCOME TO PLAY CHESS</h1>
            </div>
            <div>
                <button onClick={joingame} className="bg-[#F4EEE0] rounded-3xl py-5 px-5 font-sans font-bold hover:scale-90" >Enter a game</button>
            </div>
        </div>
    </div>
    )
}
function joingame(){
    //Join the websocket server.
    
    //wait for a new person to join the game.
    //When a new person joins, 
}