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

let distance = 2;

let paused = true;

let scene;
let camera;

let renderer;
let material;

let lines = [];

function init(){
    scene = new THREE.Scene();

    camera = new THREE.OrthographicCamera(
        window.innerWidth / - 300, window.innerWidth / 300,
        window.innerHeight / - 300, window.innerHeight / 300, 1, 1000);

    camera.position.copy(new THREE.Vector3(2, 2, 2));

    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    window.onkeypress = handleKeyPress;

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

        if(!paused){
            // rotateYZ(0.5);
            rotateXY(0.5);
            rotateZW(0.5);
        }

        updateGeometry();
        renderer.render(scene, camera);
    }

    animate();
}

function rotateYZ(angle){
    let rotation = new THREE.Matrix4();

    rotation.set(
        1, 0, 0, 0,
        0, Math.cos(rad(angle)), -Math.sin(rad(angle)), 0,
        0, Math.sin(rad(angle)), Math.cos(rad(angle)), 0,
        0, 0, 0, 1
    );

    for(let i = 0; i < vertices.length; i++){
        vertices[i] = vertices[i].applyMatrix4(rotation);
    }
}

function rotateXY(angle){
    let rotation = new THREE.Matrix4();

    rotation.set(
        Math.cos(rad(angle)), -Math.sin(rad(angle)), 0, 0,
        Math.sin(rad(angle)), Math.cos(rad(angle)), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );

    for(let i = 0; i < vertices.length; i++){
        vertices[i] = vertices[i].applyMatrix4(rotation);
    }
}

function rotateZW(angle){
    let rotation = new THREE.Matrix4();

    rotation.set(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, Math.cos(rad(angle)), -Math.sin(rad(angle)),
        0, 0, Math.sin(rad(angle)), Math.cos(rad(angle))
    );

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

function handleKeyPress(event){
    switch(getChar(event)){
        case " ":
            paused = !paused;
            break;
        case "j":
            rotateXY(15);
            break;
        case "J":
            rotateXY(-15);
            break;
        case "k":
            rotateYZ(15);
            break;
        case "K":
            rotateYZ(-15);
            break;
        case "l":
            rotateZW(15);
            break;
        case "L":
            rotateZW(-15);
            break;
        case "d":
            distance += 0.2;
            break;
        case "D":
            distance -= 0.2;
            break;
        default:
            break;
    }
}

// translate keypress events to strings
// from http://javascript.info/tutorial/keyboard-events
function getChar(event) {
    if (event.which == null) {
        return String.fromCharCode(event.keyCode) // IE
    } else if (event.which!=0 && event.charCode!=0) {
        return String.fromCharCode(event.which)   // the rest
    } else {
        return null // special key
    }
}

//degrees to radians
function rad(angle){
    return Math.PI * angle / 180;
}
