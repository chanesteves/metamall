import React, { useEffect, useState } from "react"

import TilePallete from "./components/TilePallete"
import Map from "./components/Map"

import useDraggable from "./hooks/use-draggable"

function App() {
  const [player, setPlayer] = useState({ skin : "m1" })
  const [tileset, setTileset] = useState("rpg-nature-tileset/spring")
  const [activeTile, setActiveTile] = useState({ x : 1 * 32, y : 4 * 32 })
  const [tiles, setTiles] = useState([])
  const [mapSize, setMapSize] = useState({ width : 1600, height : 1200 })
  const [paletteIsShowing, setPaletteIsShowing] = useState(false)
  const { position } = useDraggable("img-handle")

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
  }, [])

  return (
    <div 
      className="zone-container"
      style={{ 
        width : window.innerWidth,
        height : window.innerHeight,
        backgroundColor : "grey",
        overflow : "hidden"
      }}
    >
      <div
        id="pnl-camera"
        className="camera"
        style={{ 
          position: "fixed",
          width : "100%",
          height : "100%",
          backgroundColor : "#afc0f2"
         }}
      >
        <Map player={player} tiles={tiles} tileset={tileset} size={mapSize} activeTile={activeTile} setTiles={setTiles} />
      </div>
      <button 
        onClick={() => setPaletteIsShowing(true)}
        style={{ 
          position : "fixed",
          bottom : "50px",
          left : "50px",
          padding : "20px 10px"
         }}
      >
        Settings
      </button>
      <TilePallete isShowing={paletteIsShowing} setIsShowing={setPaletteIsShowing} tileset={tileset} activeTile={activeTile} setActiveTile={setActiveTile} position={position} size={{  height : 288, width : 640  }} />
    </div>
  );
}

export default App;
