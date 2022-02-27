import React, { useEffect, useState } from "react"

import { Modal, Button } from "react-bootstrap"

export default function TilePallete({ tileset, size, activeTile, setActiveTile }) {
    const { width, height } = size
    const [showWalkableModal, setShowWalkableModal] = useState(false)
    const [isTileWalkable, setIsTileWalkable] = useState({ top : false, right : false, bottom : false, left : false })

    const tiles = []
    let id = 0

    for(let y = 0; y < height; y += 32) {
        const row = []
        for(let x = 0; x < width; x += 32) {
            row.push({ x, y, id : id++ })
        }

        tiles.push(row)
    }

    function onTileClick(x, y) {
        setActiveTile({ x : x * 32, y : y * 32, t : tileset })
        setShowWalkableModal(true)
    }

    function onWalkableSave() {
        setActiveTile({ ...activeTile, w : isTileWalkable })
        setShowWalkableModal(false)
    }

    return (
        <div
            id="pnl-palette"
            style={{ 
                border : "1px solid #000",
                backgroundColor : "#FFF",
                marginTop : "10px"
            }}
        >
            { tiles.map((row, y) => 
                <div key={y} style={{ display : "flex" }}>
                    { row.map((tile, x) => 
                        <div
                            key={x}
                            onClick={() => onTileClick(x, y)}
                            style={{ 
                                borderTop : "1px solid #000",
                                borderRight : "1px solid #000",
                                background : `url(/images/sprites/${tileset}) -${x * 32}px -${y * 32}px no-repeat`,
                                width : 32,
                                height : 32
                            }}
                        ></div>
                    )}
                </div>
            )}

            <Modal show={showWalkableModal} onHide={() => setShowWalkableModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tiles Walkable?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"form-group"}>
                        <input type={"checkbox"} checked={isTileWalkable.top} onChange={() => setIsTileWalkable({ ...isTileWalkable, top : !isTileWalkable.top })} /> <label>From Top</label>
                    </div>
                    <div className={"form-group"}>
                        <input type={"checkbox"} checked={isTileWalkable.right} onChange={() => setIsTileWalkable({ ...isTileWalkable, right : !isTileWalkable.right })} /> <label>From Right</label>
                    </div>
                    <div className={"form-group"}>
                        <input type={"checkbox"} checked={isTileWalkable.bottom} onChange={() => setIsTileWalkable({ ...isTileWalkable, bottom : !isTileWalkable.bottom })} /> <label>From Bottom</label>
                    </div>
                    <div className={"form-group"}>
                        <input type={"checkbox"} checked={isTileWalkable.left} onChange={() => setIsTileWalkable({ ...isTileWalkable, left : !isTileWalkable.left })} /> <label>From Left</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowWalkableModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => onWalkableSave()}>
                        Apply
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}