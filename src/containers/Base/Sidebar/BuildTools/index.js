import React, { useEffect, useState } from "react"

import styled from "styled-components"
import classes from "classnames"

import TilePallete from "./TilePallete"

function BuildTools({ tileset, setTileset, activeTile, setActiveTile }) {
  return (
    <div className="panel">
        <div className="panel-heading">
        <h3>Build Tools</h3>
        </div>
        <div className="panel-body">
          <div className="form-group">
              <select className="form-control" onChange={(e) => setTileset(e.target.value)} value={tileset} >
              <option value="rpg-mall-tileset/floors_1.png">Floors (Set 1)</option>
              <option value="rpg-mall-tileset/floors_2.png">Floors (Set 2)</option>
              <option value="rpg-mall-tileset/walls_1.png">Walls (Set 1)</option>
              <option value="rpg-mall-tileset/walls_2.png">Walls (Set 2)</option>
              <option value="rpg-mall-tileset/walls_3.png">Walls (Set 3)</option>
              <option value="rpg-mall-tileset/walls_4.png">Walls (Set 4)</option>
              <option value="rpg-mall-tileset/walls_5.png">Walls (Set 5)</option>
              <option value="rpg-mall-tileset/walls_6.png">Walls (Set 6)</option>
              <option value="rpg-mall-tileset/walls_7.png">Walls (Set 7)</option>
              <option value="rpg-mall-tileset/doors_1.gif">Doors</option>
              <option value="rpg-mall-tileset/stairs_escalators_elevators_1.gif">Stairs, Escalators & Elevators</option>
              </select>
          </div>
          <div style={{ maxHeight : "91vh", overflowY : "auto" }}>
              <TilePallete tileset={tileset} activeTile={activeTile} setActiveTile={setActiveTile} size={{  height : 1152, width : 320  }} />
          </div>
        </div>
    </div>
  );
}

export default BuildTools;