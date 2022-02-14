import React, { useEffect, useState } from "react"

export default function TilePallete({ isShowing, setIsShowing, tileset, size, position, activeTile, setActiveTile }) {
    const [walkable, setWalkable] = useState({ top : 1, right : 1, bottom : 1, left : 1 })
    const { width, height } = size
    const tiles = []
    let id = 0

    for(let y = 0; y < height; y += 32) {
        const row = []
        for(let x = 0; x < width; x += 32) {
            row.push({ x, y, id : id++ })
        }

        tiles.push(row)
    }

    return (
        <div
            id="pnl-palette"
            style={{ 
                position : "absolute",
                border : "1px solid #000",
                top : position.y,
                left : position.x,
                zIndex : 100,
                backgroundColor : "#FFF",
                display : isShowing ? "block" : "none"
            }}
        >
            <img id="img-handle" src="/images/drag-handle.png" alt="" style={{ cursor : "move" }} />
            <button onClick={() => setIsShowing(false)} style={{ float : "right", padding : "10px", background : "transparent", border : "none", cursor : "pointer" }}>x</button>
            <div style={{ width : "100%", display : "flex" }}>
                <div
                    style={{ 
                        background : `url(/images/sprites/${tileset}.png) -${activeTile.x}px -${activeTile.y}px no-repeat`,
                        width : 32,
                        height : 32
                    }}
                ></div>
                <div style={{ textAlign : "center", flex : "1" }}>
                    <span>Walkable From: </span>
                    <input type="checkbox" checked={walkable.top} onChange={() => {setWalkable({ ...walkable, top : !walkable.top }); setActiveTile({ ...activeTile, walkable });}} /> Top
                    <input type="checkbox" checked={walkable.right} onChange={() => {setWalkable({ ...walkable, right : !walkable.right }); setActiveTile({ ...activeTile, walkable });}}  /> Right
                    <input type="checkbox" checked={walkable.bottom} onChange={() => {setWalkable({ ...walkable, bottom : !walkable.bottom }); setActiveTile({ ...activeTile, walkable });}} /> Bottom
                    <input type="checkbox" checked={walkable.left} onChange={() => {setWalkable({ ...walkable, left : !walkable.left }); setActiveTile({ ...activeTile, walkable });}} /> Left
                </div>
            </div>
            { tiles.map((row, y) => 
                <div key={y} style={{ display : "flex" }}>
                    { row.map((tile, x) => 
                        <div
                            key={x}
                            onClick={() => setActiveTile({ x : x * 32, y : y * 32, walkable })}
                            style={{ 
                                borderTop : "1px solid #000",
                                borderRight : "1px solid #000",
                                background : `url(/images/sprites/${tileset}.png) -${x * 32}px -${y * 32}px no-repeat`,
                                width : 32,
                                height : 32
                            }}
                        ></div>
                    )}
                </div>
            )}
        </div>
    )
}