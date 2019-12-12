let y = Math.sqrt(3)/2;

let pyramidVertices = [
    [-1, -y, 1],
    [1, -y, 1],
    [1, -y, -1],
    [-1, -y, -1],
    [0, y, 0]
];

let pyramidEdges = [
    [0,1],[1,2],[2,3],[3,0],
    [0,4],[1,4],[2,4],[3,4]
];