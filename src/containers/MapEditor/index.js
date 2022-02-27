import React, { useEffect, useState } from "react"

import styled from "styled-components"
import classes from "classnames"

import Camera from "./Camera"
import Map from "./Map"

function MapEditor({ tileset, activeTile, mapSize }) {
  const [player, setPlayer] = useState({ skin : "m1" })
  const [tiles, setTiles] = useState([])
  const [paletteIsShowing, setPaletteIsShowing] = useState(false)
  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState({ size : false, build : false })


  useEffect(() => {
    const _tiles = []
    let id = 0

    for(let y = 0; y < mapSize.height; y += 32) {
      const row = []
      for(let x = 0; x < mapSize.width; x += 32) {
          row.push({ x, y, id : id++, v : { x : -32, y : -32 } })
      }

      _tiles.push(row)
    }

    setTiles(_tiles)
  }, [mapSize])

  return (
    <Container 
      style={{ 
        width : window.innerWidth,
        height : window.innerHeight
      }}
    >
      <Camera>
        <Map player={player} tiles={tiles} size={mapSize} activeTile={activeTile} setTiles={setTiles} />
      </Camera>
    </Container>
  );
}

export default MapEditor;

const Container = styled.div`
  overflow: hidden;
`