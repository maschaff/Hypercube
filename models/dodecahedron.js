let o = (1 + Math.sqrt(5)) / 2;

let dodecahedronVertices = [
    new THREE.Vector4(1/o, 0, o, 1),
    new THREE.Vector4(o, 1/o, 0, 1),
    new THREE.Vector4(0, o, 1/o, 1),
    new THREE.Vector4(-1/o, 0, -o, 1),
    new THREE.Vector4(-o, 1/o, 0, 1),
    new THREE.Vector4(0, o, -1/o, 1),
    new THREE.Vector4(1/o, 0, -o, 1),
    new THREE.Vector4(o, -1/o, 0, 1),
    new THREE.Vector4(0, -o, -1/o, 1),
    new THREE.Vector4(-1/o, 0, o, 1),
    new THREE.Vector4(-o, -1/o, 0, 1),
    new THREE.Vector4(0, -o, 1/o, 1),
    new THREE.Vector4(1, 1, 1, 1),
    new THREE.Vector4(1, 1, -1, 1),
    new THREE.Vector4(-1, 1, -1, 1),
    new THREE.Vector4(-1, 1, 1, 1),
    new THREE.Vector4(1, -1, -1, 1),
    new THREE.Vector4(1, -1, 1, 1),
    new THREE.Vector4(-1, -1, 1, 1),
    new THREE.Vector4(-1, -1, -1, 1),
    new THREE.Vector4(1/o, 0, o, -1),
    new THREE.Vector4(o, 1/o, 0, -1),
    new THREE.Vector4(0, o, 1/o, -1),
    new THREE.Vector4(-1/o, 0, -o, -1),
    new THREE.Vector4(-o, 1/o, 0, -1),
    new THREE.Vector4(0, o, -1/o, -1),
    new THREE.Vector4(1/o, 0, -o, -1),
    new THREE.Vector4(o, -1/o, 0, -1),
    new THREE.Vector4(0, -o, -1/o, -1),
    new THREE.Vector4(-1/o, 0, o, -1),
    new THREE.Vector4(-o, -1/o, 0, -1),
    new THREE.Vector4(0, -o, 1/o, -1),
    new THREE.Vector4(1, 1, 1, -1),
    new THREE.Vector4(1, 1, -1, -1),
    new THREE.Vector4(-1, 1, -1, -1),
    new THREE.Vector4(-1, 1, 1, -1),
    new THREE.Vector4(1, -1, -1, -1),
    new THREE.Vector4(1, -1, 1, -1),
    new THREE.Vector4(-1, -1, 1, -1),
    new THREE.Vector4(-1, -1, -1, -1)
];

let dodecahedronEdges = [
    // outer shape
    [0, 9], [9, 15], [15, 2], [2, 12], [12, 0],
    [9, 18], [18, 11], [11, 17], [17, 0], [12, 1],
    [1, 7], [7, 17], [7, 16], [16, 6], [6, 13],
    [13, 1], [2, 5], [5, 13], [5, 14], [14, 4],
    [4, 15], [3, 6], [14, 3], [16, 8], [8, 19],
    [19, 3], [4, 10], [10, 19], [10, 18], [8, 11],

    // inner shape
    [20, 29], [29, 35], [35, 22], [22, 32], [32, 20],
    [29, 38], [38, 31], [31, 37], [37, 20], [32, 21],
    [21, 27], [27, 37], [27, 36], [36, 26], [26, 33],
    [33, 21], [22, 25], [25, 33], [25, 34], [34, 24],
    [24, 35], [23, 26], [34, 23], [36, 28], [28, 39],
    [39, 23], [24, 30], [30, 39], [30, 38], [28, 31],

    // connecting edges
    [0, 20], [1, 21], [2, 22], [3, 23], [4, 24],
    [5, 25], [6, 26], [7, 27], [8, 28], [9, 29],
    [10, 30], [11, 31], [12, 32], [13, 33], [14, 34],
    [15, 35], [16, 36], [17, 37], [18, 38], [19, 39]
];