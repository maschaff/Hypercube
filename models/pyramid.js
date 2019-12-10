let pyramidVertices = [
    new THREE.Vector4(-1, Math.sqrt(3)/2, 1, 1),
    new THREE.Vector4(1, Math.sqrt(3)/2, 1, 1),
    new THREE.Vector4(1, Math.sqrt(3)/2, -1, 1),
    new THREE.Vector4(-1, Math.sqrt(3)/2, -1, 1),
    new THREE.Vector4(0, -Math.sqrt(3)/2, 0, 1),
    new THREE.Vector4(0, -Math.sqrt(3)/2, 0, -1),
    new THREE.Vector4(-1, Math.sqrt(3)/2, 1, -1),
    new THREE.Vector4(1, Math.sqrt(3)/2, 1, -1),
    new THREE.Vector4(1, Math.sqrt(3)/2, -1, -1),
    new THREE.Vector4(-1, Math.sqrt(3)/2, -1, -1),
];

let pyramidEdges = [
    //inner shape
    [0,1],[1,2],[2,3],[3,0],
    [0,4],[1,4],[2,4],[3,4],

    //outer shape
    [6,7],[7,8],[8,9],[9,6],
    [6,5],[7,5],[8,5],[9,5],

    //connecting edges
    [0, 6], [1, 7],
    [2, 8], [3, 9],
    [4, 5]
];