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

let angle = 1;
let distance = 2;

let scene;
let camera;
let renderer;
let material;

let lines = [];

function init(){
    scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera(
        window.innerWidth / - 300, window.innerWidth / 300,
        window.innerHeight / -300, window.innerHeight / 300, 1, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    material = new THREE.LineBasicMaterial({color: 0x0000ff});

    //generate initial geometry
    for(let i = 0; i < edges.length; i++){
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

        rotate();
        updateGeometry();

        renderer.render(scene, camera);
    }

    animate();
}

function rotate(){
    let rotation = new THREE.Matrix4();

    //double rotation matrix in xy and zw planes
    rotation.set(
        Math.cos(toRadians(angle)), Math.sin(toRadians(angle)), 0, 0,
        -1 * Math.sin(toRadians(angle)), Math.cos(toRadians(angle)), 0, 0,
        0, 0, Math.cos(toRadians(angle)), Math.sin(toRadians(angle)),
        0, 0, -1 * Math.sin(toRadians(angle)), Math.cos(toRadians(angle))
    );

    //rotation matrix in the xy plane
    // rotation.set(
    //     Math.cos(toRadians(angle)), Math.sin(toRadians(angle)), 0, 0,
    //     -1 * Math.sin(toRadians(angle)), Math.cos(toRadians(angle)), 0, 0,
    //     0, 0, 1, 0,
    //     0, 0, 0, 1
    // );

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
        lines[i].geometry.verticesNeedUpdate = true;
    }
}

function get3dProjection(v){

    let w = 1 / (distance - v.w);

    return new THREE.Vector3(v.x * w , v.y * w, v.z * w);
}

function toRadians(angle){
    return Math.PI * angle / 180;
}
