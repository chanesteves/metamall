import React, { useEffect, useState } from "react"

import SideBar from "./containers/Base/Sidebar";
import MapEditor from "./containers/MapEditor"

function App() {
  const [tileset, setTileset] = useState("rpg-mall-tileset/floors_1.png")
  const [activeTile, setActiveTile] = useState(null)
  const [mapSize, setMapSize] = useState({ width : 1600, height : 1216 })

  return (
    <div>
      <MapEditor tileset={tileset} activeTile={activeTile} mapSize={mapSize} />
      <SideBar tileset={tileset} setTileset={setTileset} activeTile={activeTile} setActiveTile={setActiveTile} mapSize={mapSize} setMapSize={setMapSize} />
    </div>
  );
}

export default App;