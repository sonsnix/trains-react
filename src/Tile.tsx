import React, { useContext } from "react";

import { Store } from "./store/store";
import { TileType } from "./types";
import { tilesData } from "./data";

const TrackSegments: React.FC<{ type: string }> = props => {
  const geoDict: { [key: number]: string } = {
    0: "-0.866 0",
    1: "-0.433 -0.75",
    2: "0.433 -0.75",
    3: "0.866 0",
    4: "0.433 0.75",
    5: "-0.433 0.75"
  };

  const tileData = tilesData[props.type];
  const round = tilesData[props.type].value === undefined;

  const segments: React.ReactElement[] = [];

  for (const i in tileData.segments) {
    let segment = tileData.segments[i];
    let geo: string;

    if (round) {
      geo = `M ${geoDict[segment[0]]} Q 0 0 ${geoDict[segment[1]]}`;
    } else {
      geo = `M ${geoDict[segment[0]]} L 0 0 L ${geoDict[segment[1]]} `;
    }

    segments.push(
      <path
        key={i}
        d={geo}
        className={`track phase-${tileData.phase}`}
        strokeWidth="0.75%"
        fill="transparent"
      />
    );
  }
  return <g style={{ pointerEvents: "none" }}>{segments}</g>;
};

const StationSlots: React.FC<{
  tile: TileType;
}> = props => {
  const tileData = tilesData[props.tile.type];
  let slots;
  let value;

  // add city circles per station slot
  if (tileData.stop === "town" || tileData.stop === "city") {
    if (tileData.stationSlots === 1) {
      slots = <circle className={`city-circle-${tileData.phase}"`} r="1.7%" />;
    } else if (tileData.stationSlots === 2) {
      slots = (
        <g>
          <circle
            className={`city-circle-${tileData.phase}"`}
            r="1.7%"
            cy="1.7%"
          />
          <circle
            className={`city-circle-${tileData.phase}"`}
            r="1.7%"
            cy="-1.7%"
          />
          <path
            d="M -0.3 -0.3 L -0.3 0.3 M 0.3 -0.3 L 0.3 0.3"
            className={`track-${tileData.phase}`}
            strokeWidth="0.28%"
          />
        </g>
      );
    } else if (tileData.stationSlots === 3) {
      slots = (
        <g>
          <circle
            className={`city-circle-${tileData.phase}"`}
            r="1.7%"
            cx="0.0%"
            cy="1.963%"
          />
          <circle
            className={`city-circle-${tileData.phase}"`}
            r="1.7%"
            cx="1.7%"
            cy="-0.981%"
          />
          <circle
            className={`city-circle-${tileData.phase}"`}
            r="1.7%"
            cx="-1.7%"
            cy="-0.981%"
          />
        </g>
      );
    } else
      slots = (
        <circle
          r="1.0%"
          fill="black"
          opacity="1.0"
          stroke="#bd9704"
          strokeWidth="0.25%"
        />
      );

    // add value circle

    if (tileData.value!.length === 1)
      value = (
        <g transform={`rotate(-${props.tile.rotation}) translate(0, 0.6)`}>
          <circle fill="black" r="1.0%" />
          <text className="city-value" dy="0.35%">
            {tileData.value![0]}
          </text>
        </g>
      );
  }

  return (
    <g>
      <g transform="rotate(-30)">{slots}</g>
      {value}
    </g>
  );
};

export const HighlightTile: React.FC<{ loc: string }> = props => {
  const [row, col] = props.loc.split(",").map(Number);
  const points = "0.866,-0.5 0.866,0.5 0,1 -0.866,0.5 -0.866,-0.5 0,-1";

  return (
    <g
      className="tile tile-highlight"
      transform={`translate(${col * 0.5 * Math.sqrt(3)},${row * 1.5})`}
    >
      <polygon points={points} />
    </g>
  );
};

export const UpgradeTile: React.FC<{ loc: string; tile: TileType }> = props => {
  const { dispatch } = useContext(Store);
  const [row, col] = props.loc.split(",").map(Number);
  const points = "0.866,-0.5 0.866,0.5 0,1 -0.866,0.5 -0.866,-0.5 0,-1";

  return (
    <g
      className="tile"
      transform={`translate(${col * 0.5 * Math.sqrt(3)},${row * 1.5})`}
      onClick={() => dispatch({ type: "SELECT_UPGRADE", payload: props.tile.type })}
    >
      <polygon points={points} />
      <TrackSegments type={props.tile.type} />
      <StationSlots
        tile={{ rotation: props.tile.rotation, type: props.tile.type }}
      />
    </g>
  );
};

export const Tile: React.FC<{ loc: string; tile: TileType }> = props => {
  const { dispatch } = useContext(Store);
  const points = "0.866,-0.5 0.866,0.5 0,1 -0.866,0.5 -0.866,-0.5 0,-1";
  const [row, col] = props.loc.split(",").map(Number);

  return (
    <g
      className={"tile " + props.tile.type}
      transform={`translate(${col * 0.5 * Math.sqrt(3)},${row * 1.5})`}
      onClick={() => dispatch({ type: "SELECT_TILE", payload: props.loc })}
    >
      <polygon points={points} />
      <TrackSegments type={props.tile.type} />
      <StationSlots
        tile={{ rotation: props.tile.rotation, type: props.tile.type }}
      />
    </g>
  );
};
