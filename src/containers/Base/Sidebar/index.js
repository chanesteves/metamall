import React, { useEffect, useState } from "react"

import styled from "styled-components"
import classes from "classnames"

import MapSize from "./MapSize"
import BuildTools from "./BuildTools"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faRulerCombined, faHammer, faChevronLeft } from "@fortawesome/free-solid-svg-icons"

function SideBar({ tileset, setTileset, activeTile, setActiveTile, mapSize, setMapSize }) {
  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState({ size : false, build : false })

  function showMapSize() {
    setIsSideBarExpanded(!selectedMenu.size)
    setSelectedMenu({ size : !selectedMenu.size, build : false })
  }

  function showBuildTools() {
    setIsSideBarExpanded(!selectedMenu.build)
    setSelectedMenu({ size : false, build : !selectedMenu.build })
  }

  function closeSideBarExt() {
    setIsSideBarExpanded(false)
    setSelectedMenu({ size : false, build : false })
  }

  return (
    <Container>
        <div className="sidebar-menu">
          <div className="sidebar-menu-section-top">
            <SideBarButton title="Home">
              <FontAwesomeIcon icon={faHome} />
            </SideBarButton>
          </div>
          <div className="sidebar-menu-section-bottom">
            <div className="sidebar-menu-item">
              <SideBarButton title="Map Size" className={classes("", { "selected" : selectedMenu.size })} onClick={() => showMapSize()} >
                <FontAwesomeIcon icon={faRulerCombined} />
              </SideBarButton>
            </div>
            <div className="sidebar-menu-item">
              <SideBarButton title="Build Tools" className={classes("", { "selected" : selectedMenu.build })} onClick={() => showBuildTools()} >
                <FontAwesomeIcon icon={faHammer} />
              </SideBarButton>
            </div>
          </div>
        </div>
        <div className={classes("sidebar-extension", { "expanded" : isSideBarExpanded })}>
          <SideBarExtClose onClick={() => closeSideBarExt()} ><FontAwesomeIcon icon={faChevronLeft} /></SideBarExtClose>
          { selectedMenu.size && <MapSize mapSize={mapSize} setMapSize={setMapSize} /> }
          { selectedMenu.build && <BuildTools tileset={tileset} setTileset={setTileset} activeTile={activeTile} setActiveTile={setActiveTile} /> }
        </div>
    </Container>
  );
}

export default SideBar;

const Container = styled.div`
  position: fixed;
  top: 0;
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
      width: 354px;
      padding: 20px 16px;
    }

    & .form-group input {
      color: #000; 
      text-align: center;
    }

    & button {
      margin-top: 15px;
      width: 100%;
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

const Pallete = styled.div`
  width: 100%;
  height: 93vh;
  background: #FFF;
`