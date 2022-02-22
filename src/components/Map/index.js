import React, { useEffect } from "react"

import Player from "../Player"

export default function Map({ player, tiles, tileset, setTiles, activeTile, size }) {
    useEffect(() => {
        const cam = document.getElementById("pnl-camera")
        const map = document.getElementById("pnl-map")
        const camStyle = window.getComputedStyle(cam)
        const mapStyle = window.getComputedStyle(map)

        map.style.marginLeft = `${((parseInt(camStyle.width) - parseInt(mapStyle.width)) / 2)}px`
        map.style.marginTop = `${((parseInt(camStyle.height) - parseInt(mapStyle.height)) / 2)}px`
    }, [])


    function cloneMatrix(m) {
        const clone = new Array(m.length)

        for (let i = 0; i < m.length; ++i) {
            clone[i] = m[i].slice(0)
        }

        return clone
    }

    function dropTile({ x, y }) {
        setTiles(prev => {
            const clone = cloneMatrix(prev)
            const tile = {
                ...clone[y][x],
                v : activeTile
            }

            clone[y][x] =  tile

            return clone
        })

        console.log(tiles)
    }

    return (
        <div
            id="pnl-map"
            style={{ 
                position : "relative",
                boxSizing : "border-box",
                background : "#FFF",
                width : size.width,
                height : size.height
            }}
        >
            { tiles.map((row, y) => 
                <div key={y} style={{ display : "flex" }}>
                    { row.map((tile, x) => 
                        <div
                            key={x}
                            onClick={() => dropTile({ x, y })}
                            style={{ 
                                background : `url(/images/sprites/${tileset}.gif) -${tile.v.x}px -${tile.v.y}px no-repeat`,
                                width : 32,
                                height : 32
                            }}
                        ></div>
                    )}
                </div>
            )}
            { player && <Player tiles={tiles} skin={player.skin} /> }
        </div>
    )
}