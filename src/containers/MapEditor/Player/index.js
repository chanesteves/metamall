import React from "react"

import Actor from '../Actor'

import useKeyPress from "../../../hooks/MapEditor/Player/use-key-press"
import useWalk  from "../../../hooks/MapEditor/Player/use-walk"

export default function Player({ skin, tiles }) {
    const { dir, step, walk, position } = useWalk(3)
    const data = {
        h : 32,
        w : 32
    }

    const directions = {
        down : 0,
        left : 1,
        right : 2,
        up : 3
    }

    useKeyPress((e) => {
        const dir = e.key.replace("Arrow", "").toLowerCase()

        if (directions.hasOwnProperty(dir)) {
            walk(dir, tiles)
        }

        e.preventDefault()
    })

    return (
        <Actor sprite={`/images/sprites/skins/${skin}.png`} data={data} step={step} dir={dir} position={position} />
    )
}