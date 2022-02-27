import React, { useEffect, useState } from "react"

import styled from "styled-components"
import classes from "classnames"

function MapSize({ mapSize, setMapSize }) {
    const [tempMapSize, setTempMapSize] = useState(mapSize)

    return (
        <div className="panel">
            <div className="panel-heading">
            <h3>Map Size</h3>
            </div>
            <div className="panel-body">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Width (px)</label>
                            <input type="number" step={32} min={0} className={"form-control"} value={tempMapSize.width} onChange={(e) => setTempMapSize({ width : Number(e.target.value), height : tempMapSize.height })} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Height (px)</label>
                            <input type="number" step={32} min={0} className={"form-control"} value={tempMapSize.height} onChange={(e) => setTempMapSize({ width : tempMapSize.width, height : Number(e.target.value) })} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-primary btn-block" onClick={() => setMapSize(tempMapSize)} >Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MapSize;