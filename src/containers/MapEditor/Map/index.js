import React, { useEffect, useState } from "react"

import styled from "styled-components"

import Player from "../Player"

function Map({ player, tiles, setTiles, activeTile, size }) {
    const [isMouseDown, setIsMouseDown] = useState(false)

    useEffect(() => {
        const cam = document.getElementById("pnl-camera")
        const map = document.getElementById("pnl-map")
        const camStyle = window.getComputedStyle(cam)
        const mapStyle = window.getComputedStyle(map)

        map.style.marginLeft = `${((parseInt(camStyle.width) - parseInt(mapStyle.width)) / 2)}px`
        map.style.marginTop = `${((parseInt(camStyle.height) - parseInt(mapStyle.height)) / 2)}px`
    }, [size])


    function cloneMatrix(m) {
        const clone = new Array(m.length)

        for (let i = 0; i < m.length; ++i) {
            clone[i] = m[i].slice(0)
        }

        return clone
    }

    function dropTile({ x, y }) {
        if (!activeTile) {
            return;
        }

        setTiles(prev => {
            const clone = cloneMatrix(prev)
            const tile = {
                ...clone[y][x],
                v : activeTile
            }

            clone[y][x] =  tile

            return clone
        })
    }

    return (
        <Container
            id="pnl-map"
            style={{ 
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
                            onMouseEnter={() => {if (isMouseDown) dropTile({ x, y })}}
                            onMouseDown={() => setIsMouseDown(true)}
                            onMouseUp={() => setIsMouseDown(false)}
                            style={{ 
                                background : `url(/images/sprites/${tile.v.t}) -${tile.v.x}px -${tile.v.y}px no-repeat`,
                                borderTop : tile.v.w && tile.v.w.top ? "none" : "1px solid #595959",
                                borderRight : tile.v.w && tile.v.w.right ? "none" : "1px solid #595959",
                                borderBottom : tile.v.w && tile.v.w.bottom ? "none" : "1px solid #595959",
                                borderLeft : tile.v.w && tile.v.w.left ? "none" : "1px solid #595959",
                                width : 32,
                                height : 32
                            }}
                        ></div>
                    )}
                </div>
            )}
            { player && <Player tiles={tiles} skin={player.skin} /> }
        </Container>
    )
}

export default Map

const Container = styled.div`
  position: relative;
  box-sizeing: border-box;
  background-color: #FFF;
`