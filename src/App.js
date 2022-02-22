import React, { useEffect, useState } from "react"

import styled from "styled-components"
import classes from "classnames"

import TilePallete from "./components/TilePallete"
import Map from "./components/Map"

import useDraggable from "./hooks/use-draggable"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faRulerCombined, faHammer, faChevronLeft } from "@fortawesome/free-solid-svg-icons"

function App() {
  const [player, setPlayer] = useState({ skin : "m1" })
  const [tileset, setTileset] = useState("rpg-mall-tileset/escalators_raw_1")
  const [activeTile, setActiveTile] = useState({ x : 1 * 32, y : 4 * 32 })
  const [tiles, setTiles] = useState([])
  const [mapSize, setMapSize] = useState({ width : 1600, height : 1200 })
  const [paletteIsShowing, setPaletteIsShowing] = useState(false)
  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState({ size : false, build : false })
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

  function showSize() {
    setIsSideBarExpanded(!isSideBarExpanded)
    setSelectedMenu({ size : !selectedMenu.size, build : false })
  }

  function closeSideBarExt() {
    setIsSideBarExpanded(false)
    setSelectedMenu({ size : false, build : false })
  }

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
          backgroundColor : "#545c8f"
         }}
      >
        <Map player={player} tiles={tiles} tileset={tileset} size={mapSize} activeTile={activeTile} setTiles={setTiles} />
      </div>
      <SideBar>
        <div className="sidebar-menu">
          <div className="sidebar-menu-section-top">
            <SideBarButton>
              <FontAwesomeIcon icon={faHome} />
            </SideBarButton>
          </div>
          <div className="sidebar-menu-section-bottom">
            <div className="sidebar-menu-item">
              <SideBarButton className={classes("", { "selected" : selectedMenu.size })} onClick={() => showSize()} >
                <FontAwesomeIcon icon={faRulerCombined} />
              </SideBarButton>
            </div>
            <div className="sidebar-menu-item">
              <SideBarButton className={classes("", { "selected" : selectedMenu.build })} onClick={() => setPaletteIsShowing(true)} >
                <FontAwesomeIcon icon={faHammer} />
              </SideBarButton>
            </div>
          </div>
        </div>
        <div className={classes("sidebar-extension", { "expanded" : isSideBarExpanded })}>
          <SideBarExtClose onClick={() => closeSideBarExt()} ><FontAwesomeIcon icon={faChevronLeft} /></SideBarExtClose>
          <div className="panel">
            <div className="panel-heading">
              <h3>Map Size</h3>
            </div>
            <div className="panel-body">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Width (px)</label>
                      <input type="number" className="form-control"/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Height (px)</label>
                      <input type="number" className="form-control"/>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </SideBar>
      <TilePallete isShowing={paletteIsShowing} setIsShowing={setPaletteIsShowing} tileset={tileset} activeTile={activeTile} setActiveTile={setActiveTile} position={position} size={{  height : 480, width : 672  }} />
    </div>
  );
}

export default App;

const SideBar = styled.div`
  position: fixed;
  left: 0;
  height: 100vh;
  box-shadow: rgb(0 0 0 / 30%) 24px 0px 28px;
  z-index: 2;
  display: flex;

  & .sidebar-menu {
    position: relative;
    width: 72px;
    height: 100%;
    background: #202540;
  
    & .sidebar-menu-section-top {
      position: absolute;
      top: 10px;
      left: 0;
      right: 0;
      width: 100%;
      text-align: center;
    }

    & .sidebar-menu-section-bottom {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      width: 100%;
      text-align: center;

      & .sidebar-menu-item {
        margin: 8px 0px;
      }
    }
  }

  & .sidebar-extension {
    width: 0;
    padding: 0;
    background: #282D4E;
    color: #FFF;
    position: relative;
    overflow: hidden;

    &.expanded {
      width: 256px;
      padding: 20px 16px;
    }

    .form-group input {
      color: #FFF; 
      text-align: center;
    }
  }
`

const SideBarButton = styled.button`
  padding: 1px 6px;
  border-radius: 16px;
  border: none;
  width: 60px;
  height: 60px;
  background: transparent;

  &:hover,
  &.selected {
    background: #333a64;
  }

  & svg {
    color: #FFF;
    width: 36px;
    height: 36px;
  } 
`

const SideBarExtClose = styled.a`
  color: #FFF;
  position: absolute;
  right: 16px;
  top: 27px;
  cursor: pointer;

  &:hover {
    color: #FFF;
  }
`