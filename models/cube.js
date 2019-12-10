let cubeVertices = [
    new THREE.Vector4(-1, -1, -1, 1),
    new THREE.Vector4(1, -1, -1, 1),
    new THREE.Vector4(1, 1, -1, 1),
    new THREE.Vector4(-1, 1, -1, 1),
    new THREE.Vector4(-1, -1, 1, 1),
    new THREE.Vector4(1, -1, 1, 1),
    new THREE.Vector4(1, 1, 1, 1),
    new THREE.Vector4(-1, 1, 1, 1),
    new THREE.Vector4(-1, -1, -1, -1),
    new THREE.Vector4(1, -1, -1, -1),
    new THREE.Vector4(1, 1, -1, -1),
    new THREE.Vector4(-1, 1, -1, -1),
    new THREE.Vector4(-1, -1, 1, -1),
    new THREE.Vector4(1, -1, 1, -1),
    new THREE.Vector4(1, 1, 1, -1),
    new THREE.Vector4(-1, 1, 1, -1)
];

let cubeEdges = [
    //inner shape
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],

    //outer shape
    [8, 9], [9, 10], [10, 11], [11, 8],
    [12, 13], [13, 14], [14, 15], [15, 12],
    [8, 12], [9, 13], [10, 14], [11, 15],

    //connecting edges
    [0, 8], [1, 9],
    [2, 10], [3, 11],
    [4, 12], [5, 13],
    [6, 14], [7, 15]
];