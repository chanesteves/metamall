import React, { useEffect, useState } from "react"

import styled from "styled-components"

function Camera(props) {
  return (
    <Container
        id="pnl-camera"
        className="camera"
    >
        {props.children}
    </Container>
  );
}

export default Camera;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #545c8f;
`