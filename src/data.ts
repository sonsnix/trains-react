export { tilesInitialState, tilesData };

interface TilesData {
  [key: string]: {
    phase: number;
    upgrades: string[];
    initialCount: { normal: number; beginner: number; [key: string]: number };
    segments: number[][];
    value?: number[];
    stop?: string;
    stationSlots?: number;
    costs?: number;
    geo?: string;
  };
}

export const companyColors: {[key:string]: string} = {
  "sanuki": "green",
  "takamatsu": "red",
  "iyo": "orange",
  "awa": "grey",
  "tosa electric": "turquoise",
  "tosa": "blue",
  "uwajima": "black"
}

const tilesInitialState = {
  "-5,11": { type: "7", rotation: 0 },
  "-4,14": { type: "map_takamatsu", rotation: 0 },
  "-4,12": { type: "map_empty", rotation: 0 },
  "-2,10": { type: "map_mountain", rotation: 0 },
  "-4,10": { type: "map_city", rotation: 0 },
  "-3,5": { type: "map_offsite", rotation: 0 },
  "-3,9": { type: "map_empty", rotation: 0 },
  "-3,11": { type: "map_kotohira", rotation: 0 },
  "-3,13": { type: "map_town", rotation: 0 },
  "-3,15": { type: "map_river", rotation: 0 },
  "-3,17": { type: "map_offsite", rotation: 0 },
  "-2,4": { type: "map_city", rotation: 0 },
  "-2,6": { type: "map_city", rotation: 0 },
  "-2,8": { type: "map_city", rotation: 0 },
  "-2,14": { type: "map_fixed_n214", rotation: 0 },
  "-2,12": { type: "map_river", rotation: 0 },
  "-2,16": { type: "map_city", rotation: 0 },
  "-1,3": { type: "map_empty", rotation: 0 },
  "-1,5": { type: "map_mountain", rotation: 0 },
  "-1,7": { type: "map_mountain", rotation: 0 },
  "-1,9": { type: "map_mountain", rotation: 0 },
  "-1,11": { type: "map_city", rotation: 0 },
  "-1,13": { type: "map_empty", rotation: 0 },
  "-1,15": { type: "map_coastal", rotation: 0 },
  "0,0": { type: "map_fixed_00", rotation: 0 },
  "0,2": { type: "map_ozu", rotation: 0 },
  "0,4": { type: "map_mountain", rotation: 0 },
  "0,6": { type: "map_mountain", rotation: 0 },
  "0,8": { type: "map_mountain", rotation: 0 },
  "0,10": { type: "map_mountain", rotation: 0 },
  "0,12": { type: "map_mountain", rotation: 0 },
  "0,14": { type: "map_empty", rotation: 0 },
  "0,16": { type: "map_city", rotation: 0 },
  "1,1": { type: "map_empty", rotation: 0 },
  "1,3": { type: "map_mountain", rotation: 0 },
  "1,5": { type: "map_mountain", rotation: 0 },
  "1,7": { type: "map_empty", rotation: 0 },
  "1,9": { type: "map_kochi", rotation: 0 },
  "1,11": { type: "map_coastal", rotation: 0 },
  "1,13": { type: "map_mountain", rotation: 0 },
  "1,15": { type: "map_coastal", rotation: 0 },
  "2,2": { type: "map_fixed_22", rotation: 0 },
  "2,4": { type: "map_empty", rotation: 0 },
  "2,6": { type: "map_empty", rotation: 0 },
  "2,12": { type: "map_city", rotation: 0 },
  "2,14": { type: "map_mountain", rotation: 0 },
  "3,1": { type: "map_mountain", rotation: 0 },
  "3,3": { type: "map_mountain", rotation: 0 },
  "3,5": { type: "map_city", rotation: 0 },
  "3,13": { type: "map_fixed_313", rotation: 0 },
  "4,2": { type: "map_city", rotation: 0 },
  "4,4": { type: "map_coastal", rotation: 0 }
};

const tilesData: TilesData = {
  3: {
    phase: 2,
    upgrades: [],
    initialCount: { normal: 2, beginner: 2 },
    segments: [[0, 5]],
    stop: "town",
    value: [10]
  },
  5: {
    phase: 2,
    upgrades: ["12", "14", "15", "205", "206"],
    initialCount: { normal: 2, beginner: 2 },
    segments: [[0, 5]],
    stop: "city",
    value: [20],
    stationSlots: 1
  },
  6: {
    phase: 2,
    upgrades: ["12", "13", "14", "15", "205", "206"],
    initialCount: { normal: 2, beginner: 4 },
    segments: [[0, 4]],
    stop: "city",
    value: [20],
    stationSlots: 1
  },
  7: {
    phase: 2,
    upgrades: ["26", "27", "28", "29"],
    initialCount: { normal: 2, beginner: 3 },
    segments: [[0, 5]]
  },
  8: {
    phase: 2,
    upgrades: ["16", "19", "23", "24", "25", "28", "29"],
    initialCount: { normal: 5, beginner: 6 },
    segments: [[0, 4]]
  },
  9: {
    phase: 2,
    upgrades: ["19", "20", "23", "24", "26", "27"],
    initialCount: { normal: 5, beginner: 6 },
    segments: [[0, 3]]
  },
  438: {
    phase: 2,
    upgrades: ["439"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [[0, 2]],
    stop: "city",
    value: [40],
    costs: 80,
    stationSlots: 1
  },
  437: {
    geo: `<g transform="rotate(-{rotation})">
    <text
        fill="white"
        text-anchor="middle"
        font-size="1.4%"
        alignment-baseline="central"
        dy="0.35%"
        >⚓</text
      >"
    </g>`,
    phase: 2,
    upgrades: [],
    initialCount: { normal: 1, beginner: 1 },
    segments: [[0, 2]],
    stop: "town",
    value: [30]
  },
  16: {
    phase: 3,
    upgrades: [],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 4],
      [3, 5]
    ]
  },
  19: {
    phase: 3,
    upgrades: ["45", "46"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 3],
      [1, 5]
    ]
  },
  20: {
    phase: 3,
    upgrades: ["47"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 3],
      [2, 5]
    ]
  },
  23: {
    phase: 3,
    upgrades: ["41", "45", "47"],
    initialCount: { normal: 2, beginner: 3 },
    segments: [
      [0, 3],
      [0, 4]
    ]
  },
  24: {
    phase: 3,
    upgrades: ["42", "46", "47"],
    initialCount: { normal: 2, beginner: 3 },
    segments: [
      [0, 2],
      [0, 3]
    ]
  },
  25: {
    phase: 3,
    upgrades: ["40", "45", "46"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 2],
      [0, 4]
    ]
  },
  26: {
    phase: 3,
    upgrades: ["42", "45"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 3],
      [0, 5]
    ]
  },
  27: {
    phase: 3,
    upgrades: ["41", "46"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 3],
      [3, 4]
    ]
  },
  28: {
    phase: 3,
    upgrades: ["39", "46"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 4],
      [0, 5]
    ]
  },
  29: {
    phase: 3,
    upgrades: ["39", "45"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 4],
      [4, 5]
    ]
  },
  12: {
    phase: 3,
    upgrades: ["448", "611"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 1],
      [0, 5],
      [1, 5]
    ],
    stop: "city",
    value: [30],
    stationSlots: 1
  },
  13: {
    phase: 3,
    upgrades: ["611"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 2],
      [0, 4],
      [2, 4]
    ],
    stop: "city",
    value: [30],
    stationSlots: 1
  },
  14: {
    phase: 3,
    upgrades: ["611"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 2],
      [0, 3],
      [0, 5],
      [2, 3],
      [2, 5],
      [3, 5]
    ],
    stop: "city",
    value: [30],
    stationSlots: 2
  },
  15: {
    phase: 3,
    upgrades: ["448", "611"],
    initialCount: { normal: 3, beginner: 3 },
    segments: [
      [0, 3],
      [0, 4],
      [0, 5],
      [3, 4],
      [3, 5],
      [4, 5]
    ],
    stop: "city",
    value: [30],
    stationSlots: 2
  },
  205: {
    phase: 3,
    upgrades: ["448", "611"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 3],
      [0, 4],
      [3, 4]
    ],
    stop: "city",
    value: [30],
    stationSlots: 1
  },
  206: {
    phase: 3,
    upgrades: ["448", "611"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 3],
      [0, 5],
      [3, 5]
    ],
    stop: "city",
    value: [30],
    stationSlots: 1
  },
  439: {
    phase: 3,
    upgrades: ["492"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 2],
      [0, 4],
      [2, 4]
    ],
    stop: "city",
    value: [60],
    costs: 80,
    stationSlots: 2
  },
  440: {
    phase: 3,
    upgrades: ["466"],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 1],
      [0, 5],
      [1, 5]
    ],
    stop: "city",
    value: [40],
    stationSlots: 2
  },
  39: {
    phase: 5,
    upgrades: [],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 1],
      [0, 5],
      [1, 5]
    ]
  },
  40: {
    phase: 5,
    upgrades: [],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 2],
      [0, 4],
      [2, 4]
    ]
  },
  41: {
    phase: 5,
    upgrades: [],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 3],
      [0, 4],
      [3, 4]
    ]
  },
  42: {
    phase: 5,
    upgrades: [],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 2],
      [0, 3],
      [2, 3]
    ]
  },
  45: {
    phase: 5,
    upgrades: [],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 3],
      [0, 5],
      [1, 3],
      [1, 5]
    ]
  },
  46: {
    phase: 5,
    upgrades: [],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 1],
      [0, 3],
      [1, 5],
      [3, 5]
    ]
  },
  47: {
    phase: 5,
    upgrades: [],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 2],
      [0, 3],
      [2, 5],
      [3, 5]
    ]
  },

  57: {
    phase: 2,
    upgrades: ["14", "15"],
    initialCount: { normal: 2, beginner: 2 },
    segments: [[0, 3]],
    stop: "city",
    value: [20],
    stationSlots: 1
  },
  58: {
    phase: 2,
    upgrades: [],
    initialCount: { normal: 3, beginner: 3 },
    segments: [[0, 4]],
    stop: "town",
    value: [10]
  },
  448: {
    phase: 5,
    upgrades: [],
    initialCount: { normal: 4, beginner: 4 },
    segments: [
      [0, 3],
      [0, 4],
      [0, 5],
      [3, 4],
      [3, 5]
    ],
    stop: "city",
    value: [40],
    stationSlots: 2
  },
  465: {
    phase: 5,
    upgrades: [],
    initialCount: { normal: 2, beginner: 2 },
    segments: [
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4]
    ],
    stop: "city",
    value: [60],
    stationSlots: 3
  },
  466: {
    phase: 5,
    upgrades: [],
    initialCount: { normal: 1, beginner: 1 },
    segments: [
      [0, 1],
      [0, 5],
      [1, 5]
    ],
    stop: "city",
    value: [60],
    stationSlots: 2
  },
  492: {
    phase: 5,
    upgrades: [],
    initialCount: { normal: 2, beginner: 2 },
    segments: [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5]
    ],
    stop: "city",
    value: [80],
    stationSlots: 3
  },
  611: {
    phase: 5,
    upgrades: [],
    initialCount: { normal: 2, beginner: 2 },
    segments: [
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 3],
      [2, 4],
      [3, 4]
    ],
    stop: "city",
    value: [40],
    stationSlots: 2
  },
  map_fixed_00: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [[3, 4]],
    upgrades: [],
    stop: "town",
    value: [20]
  },
  map_fixed_22: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [
      [1, 3],
      [1, 5],
      [3, 5]
    ],
    upgrades: [],
    stop: "city",
    value: [40]
  },
  map_fixed_n214: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [[3, 5]],
    upgrades: []
  },
  map_fixed_313: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [[1, 2]],
    upgrades: [],
    stop: "town",
    value: [20]
  },
  map_takamatsu: {
    geo: "",
    phase: 2,
    initialCount: { normal: 0, beginner: 0 },
    segments: [
      [0, 4],
      [0, 5],
      [4, 5]
    ],
    upgrades: ["440"],
    stop: "city",
    value: [30]
  },
  map_kochi: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
      [2, 3]
    ],
    upgrades: ["465"],
    stop: "city",
    value: [30],
    costs: 80
  },
  map_ozu: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [[0, 0]],
    upgrades: [],
    stop: "city",
    value: [20]
  },
  marker: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [],
    upgrades: []
  },
  map_empty: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [],
    upgrades: ["7", "8", "9"]
  },
  map_mountain: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [],
    upgrades: ["7", "8", "9"],
    costs: 80
  },
  map_river: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [],
    upgrades: ["7", "8", "9"],
    costs: 80
  },
  map_town: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [],
    upgrades: ["3", "58"]
  },
  map_coastal: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [],
    upgrades: ["3", "58", "437"]
  },
  map_city: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [],
    upgrades: ["5", "6", "57"]
  },
  map_offsite: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [[4, 5]],
    upgrades: [],
    stop: "offsite",
    value: [20, 40, 80]
  },
  map_kotohira: {
    geo: "",
    phase: 0,
    initialCount: { normal: 0, beginner: 0 },
    segments: [],
    upgrades: ["438"],
    costs: 80
  }
};

export const hexagon_points =
  "0.8660254037844387,-0.49999999999999994 0.8660254037844387,0.49999999999999994 6.123233995736766e-17,1 -0.8660254037844387,0.49999999999999994 -0.8660254037844386,-0.5000000000000001 -1.8369701987210297e-16,-1";
