import { useState } from "react"

export default function useWalk(maxSteps) {
    const [position, setPosition] = useState({ x : 800, y : 640 })
    const [dir, setDir] = useState(0)
    const [step, setStep] = useState(0)

    const directions = {
        down : 0,
        left : 1,
        right : 2,
        up : 3
    }

    const stepPerTile = 2
    const stepSize = 32 / stepPerTile

    const modifier = {
        down : { x : 0, y : stepSize },
        left : { x : -stepSize, y : 0 },
        right : { x : stepSize, y : 0 },
        up : { x : 0, y : -stepSize }
    }

    function walk(dir, tiles) {
        setDir(prev => {
            if (directions[dir] === prev) {
                move(dir, tiles)
            }

            return directions[dir]
        })

        setStep(prev => prev < maxSteps - 1 ? prev + 1 : 0)
    }

    function move(dir, tiles) {
        setPosition(prev => {
            let nextX = prev.x + (modifier[dir].x * stepPerTile)
            let nextY = prev.y + (modifier[dir].y * stepPerTile)
            let newX = prev.x + modifier[dir].x
            let newY = prev.y + modifier[dir].y
            let destTile = null
            let canMove = true

            if (nextX % (stepSize * stepPerTile) != 0) {
                nextX = parseInt(nextX / (stepSize * stepPerTile)) * (stepSize * stepPerTile)
            }
            if (nextY % (stepSize * stepPerTile) != 0) {
                nextY = parseInt(nextY / (stepSize * stepPerTile)) * (stepSize * stepPerTile)
            }

            for(let x = 0; x < tiles.length; x++) {
                let col = tiles[x]
                for(let y = 0; y < col.length; y++) {
                    let tile = col[y]
                    if (nextX == tile.x && nextY == tile.y) {
                        destTile = tile
                        break
                    }
                }

                if (destTile) {
                    break
                }
            }

            switch(dir) {
                case "down":
                    if (destTile && destTile.v && destTile.v.walkable && !destTile.v.walkable.top) {
                        canMove = false
                    }
                    break
                case "right":
                    if (destTile && destTile.v && destTile.v.walkable && !destTile.v.walkable.left) {
                        canMove = false
                    }
                    break
                case "up":
                    if (destTile && destTile.v && destTile.v.walkable && !destTile.v.walkable.bottom) {
                        canMove = false
                    }
                    break
                case "left":
                    if (destTile && destTile.v && destTile.v.walkable && !destTile.v.walkable.right) {
                        canMove = false
                    }
                    break
                default:
                    canMove = true
            }

            if (tiles.length > 0 
                && (newY > (tiles.length - 1) * stepSize * stepPerTile || newY < 0
                    || newX > (tiles[0].length - 1) * stepSize * stepPerTile || newX < 0)) {
                canMove = false
            }

            if (!canMove) {
                newX = prev.x
                newY = prev.y
            } else {
                const cam = document.getElementById("pnl-camera")
                const map = document.getElementById("pnl-map")
                const camStyle = window.getComputedStyle(cam)
                const mapStyle = window.getComputedStyle(map)

                const mapOffsetX = parseInt(mapStyle.marginLeft)
                const mapOffsetY = parseInt(mapStyle.marginTop)

                if (dir == "right" && newX + mapOffsetX > parseInt(camStyle.width) / 2) {
                    map.style.marginLeft = `${mapOffsetX - stepSize}px`
                } else if (dir == "left" && newX + mapOffsetX < parseInt(camStyle.width) / 2) {
                    map.style.marginLeft = `${mapOffsetX + stepSize}px`
                } else if (dir == "down" && newY + mapOffsetY > parseInt(camStyle.height) / 2) {
                    map.style.marginTop = `${mapOffsetY - stepSize}px`
                } else if (dir == "up" && newY + mapOffsetY < parseInt(camStyle.height) / 2) {
                    map.style.marginTop = `${mapOffsetY + stepSize}px`
                }
            }

            return { x : newX, y : newY }
        })
    }

    return {
        walk,
        dir,
        step,
        position
    }
}