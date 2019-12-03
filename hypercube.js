let vertices = [
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

let edges = [
    //inner cube
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],

    //outer cube
    [8, 9], [9, 10], [10, 11], [11, 8],
    [12, 13], [13, 14], [14, 15], [15, 12],
    [8, 12], [9, 13], [10, 14], [11, 15],

    //connecting planes
    [0, 8], [1, 9],
    [2, 10], [3, 11],
    [4, 12], [5, 13],
    [6, 14], [7, 15]
];

let angle = 0;
let distance = 1.5;

let scene;
let camera;
let renderer;
let material;

let lines = [];

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    material = new THREE.LineBasicMaterial({color: 0x0000ff});

    camera.position.z = 8;

    //generate initial geometry
    for(let i = 0; i < 2; i++){
        let geometry = new THREE.Geometry();
        geometry.vertices.push(get3dProjection(vertices[edges[i][0]]));
        geometry.vertices.push(get3dProjection(vertices[edges[i][1]]));
        lines.push(new THREE.Line(geometry, material));
        scene.add(lines[i]);
    }
}

function main(){

    init();

    function animate(){
        requestAnimationFrame(animate);

        // angle += 5;
        //
        // rotate();
        // updateGeometry();

        renderer.render(scene, camera);
    }

    animate();
}

function rotate(){
    let rotation = new THREE.Matrix4();

    //double rotation matrix in xy and zw planes
    // rotation.set(
    //     Math.cos(toRadians(angle)), -1 * Math.sin(toRadians(angle)), 0, 0,
    //     Math.sin(toRadians(angle)), Math.cos(toRadians(angle)), 0, 0,
    //     0, 0, Math.cos(toRadians(angle)), -1 * Math.sin(toRadians(angle)),
    //     0, 0, Math.sin(toRadians(angle)), Math.cos(toRadians(angle))
    // );

    //rotation matrix in the xy plane
    rotation.set(
        Math.cos(toRadians(angle)), -1 * Math.sin(toRadians(angle)), 0, 0,
        Math.sin(toRadians(angle)), Math.cos(toRadians(angle)), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );

    //rotation matrix in the zw plane
    // rotation.set(
    //     1, 0, 0, 0,
    //     0, 1, 0, 0,
    //     0, 0, Math.cos(toRadians(angle)), -1 * Math.sin(toRadians(angle)),
    //     0, 0, Math.sin(toRadians(angle)), Math.cos(toRadians(angle))
    // );

    for(let i = 0; i < vertices.length; i++){
        vertices[i] = vertices[i].applyMatrix4(rotation);
    }
}

function updateGeometry(){

    for(let i = 0; i < lines.length; i++){
        lines[i].geometry.vertices[0] = get3dProjection(vertices[edges[i][0]]);
        lines[i].geometry.vertices[1] = get3dProjection(vertices[edges[i][1]]);
        // lines[i].rotation.x = 0;
        // lines[i].rotation.y = 0;
        // lines[i].rotation.z = 0;
        lines[i].geometry.verticesNeedUpdate = true;
    }
}

function get3dProjection(v){

    //stereographic projection matrix
    let projection = new THREE.Matrix4();
    let w = 1 / (distance - v.w);

    projection.set(
        w, 0, 0, 0,
        0, w, 0, 0,
        0, 0, w, 0,
        0, 0, 0, 0
    );

    let result = v.applyMatrix4(projection);

    return new THREE.Vector3(result.x, result.y, result.z);
}

function toRadians(angle){
    return Math.PI * angle / 180;
}
