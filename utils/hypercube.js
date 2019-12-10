//shapes stored in separate js files in models directory
let shapes = [
    [cubeVertices, cubeEdges],
    [pyramidVertices, pyramidEdges],
    [dodecahedronVertices, dodecahedronEdges]
];

let currentShape = 0;

let vertices = [];
let edges = [];
let lines = [];

let distance = 2;
let defaultAngle = 0.5;

let defaultRotation = "xz";

let paused = true;

let scene;
let camera;

let renderer;
let material;

let showControls = false;

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

    material = new THREE.LineBasicMaterial({color: 0xffffff});

    addShape(shapes[currentShape][0], shapes[currentShape][1]);
}

function main(){

    init();

    function animate(){
        requestAnimationFrame(animate);

        if(!paused){
            switch (defaultRotation) {
                case "xy":
                    rotateXY(defaultAngle);
                    break;
                case "-xy":
                    rotateXY(-defaultAngle);
                    break;
                case "yz":
                    rotateYZ(defaultAngle);
                    break;
                case "-yz":
                    rotateYZ(-defaultAngle);
                    break;
                case "xz":
                    rotateXZ(defaultAngle);
                    break;
                case "-xz":
                    rotateXZ(-defaultAngle);
                    break;
                case "xw":
                    rotateXW(defaultAngle);
                    break;
                case "-xw":
                    rotateXW(-defaultAngle);
                    break;
                case "yw":
                    rotateYW(defaultAngle);
                    break;
                case "-yw":
                    rotateYW(-defaultAngle);
                    break;
                case "zw":
                    rotateZW(defaultAngle);
                    break;
                case "-zw":
                    rotateZW(-defaultAngle);
                    break;

                case "xy zw":
                    rotateXY(defaultAngle);
                    rotateZW(defaultAngle);
                    break;
                case "-xy -zw":
                    rotateXY(-defaultAngle);
                    rotateZW(-defaultAngle);
                    break;
                case "-xy zw":
                    rotateXY(-defaultAngle);
                    rotateZW(defaultAngle);
                    break;
                case "xy -zw":
                    rotateXY(defaultAngle);
                    rotateZW(-defaultAngle);
                    break;
                case "yz xw":
                    rotateYZ(defaultAngle);
                    rotateXW(defaultAngle);
                    break;
                case "-yz -xw":
                    rotateYZ(-defaultAngle);
                    rotateXW(-defaultAngle);
                    break;
                case "-yz xw":
                    rotateYZ(-defaultAngle);
                    rotateXW(defaultAngle);
                    break;
                case "yz -xw":
                    rotateYZ(defaultAngle);
                    rotateXW(-defaultAngle);
                    break;

            }
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

function rotateXZ(angle){
    let rotation = new THREE.Matrix4();

    rotation.set(
        Math.cos(rad(angle)), 0, -Math.sin(rad(angle)), 0,
        0, 1, 0, 0,
        Math.sin(rad(angle)), 0, Math.cos(rad(angle)), 0,
        0, 0, 0, 1
    );

    for(let i = 0; i < vertices.length; i++){
        vertices[i] = vertices[i].applyMatrix4(rotation);
    }
}

function rotateXW(angle){
    let rotation = new THREE.Matrix4();

    rotation.set(
        Math.cos(rad(angle)), 0, 0, -Math.sin(rad(angle)),
        0, 1, 0, 0,
        0, 0, 1, 0,
        Math.sin(rad(angle)), 0, 0, Math.cos(rad(angle))
    );

    for(let i = 0; i < vertices.length; i++){
        vertices[i] = vertices[i].applyMatrix4(rotation);
    }
}

function rotateYW(angle){
    let rotation = new THREE.Matrix4();

    rotation.set(
        1, 0, 0, 0,
        0, Math.cos(rad(angle)), 0, -Math.sin(rad(angle)),
        0, 0, 1, 0,
        0, Math.sin(rad(angle)), 0, Math.cos(rad(angle))
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

        //pausea
        case " ":
            paused = !paused;
            break;

        //single rotations
        case "a":
            defaultRotation = "xy";
            break;
        case "A":
            defaultRotation = "-xy";
            break;
        case "s":
            defaultRotation = "yz";
            break;
        case "S":
            defaultRotation = "-yz";
            break;
        case "d":
            defaultRotation = "xz";
            break;
        case "D":
            defaultRotation = "-xz";
            break;
        case "q":
            defaultRotation = "xw";
            break;
        case "Q":
            defaultRotation = "-xw";
            break;
        case "w":
            defaultRotation = "yw";
            break;
        case "W":
            defaultRotation = "-yw";
            break;
        case "e":
            defaultRotation = "zw";
            break;
        case "E":
            defaultRotation = "-zw";
            break;

        //double rotations
        case "z":
            defaultRotation = "xy zw";
            break;
        case "Z":
            defaultRotation = "-xy -zw";
            break;
        case "x":
            defaultRotation = "-xy zw";
            break;
        case "X":
            defaultRotation = "xy -zw";
            break;
        case "c":
            defaultRotation = "yz xw";
            break;
        case "C":
            defaultRotation = "-yz -xw";
            break;
        case "v":
            defaultRotation = "-yz xw";
            break;
        case "V":
            defaultRotation = "yz -xw";
            break;

        //manual rotations
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
            rotateXZ(15);
            break;
        case "L":
            rotateXZ(-15);
            break;
        case "u":
            rotateXW(15);
            break;
        case "U":
            rotateXW(-15);
            break;
        case "i":
            rotateYW(15);
            break;
        case "I":
            rotateYW(-15);
            break;
        case "o":
            rotateZW(15);
            break;
        case "O":
            rotateZW(-15);
            break;
        case "f":
            distance += 0.2;
            break;
        case "F":
            distance -= 0.2;
            break;

        //swap to next geometry
        case "g":
            distance = 2;
            removeCurrentShape();
            currentShape = (currentShape + 1) % shapes.length;
            addShape(shapes[currentShape][0], shapes[currentShape][1]);
            break;

        //reset current geometry
        case "h":
            removeCurrentShape();
            addShape(shapes[currentShape][0], shapes[currentShape][1]);
            break;

        //toggle control menu
        case "p":
            toggleControls();
            break;
        default:
            break;
    }
}

function addShape(v, e){

    for(let i = 0; i < v.length; i++){
        vertices.push(new THREE.Vector4(v[i].x, v[i].y, v[i].z, v[i].w));
    }

    edges = e;

    // add new THREE.js geometry
    for(let i = 0; i < edges.length; i++){
        let geometry = new THREE.Geometry();
        geometry.vertices.push(get3dProjection(vertices[edges[i][0]]));
        geometry.vertices.push(get3dProjection(vertices[edges[i][1]]));
        lines.push(new THREE.Line(geometry, material));
        scene.add(lines[i]);
    }

}

function removeCurrentShape(){
    for(let i = 0; i < lines.length; i++){
        scene.remove(lines[i]);
        lines[i].geometry.dispose();
    }
    vertices = [];
    edges = [];
    lines = [];
}

function toggleControls(){
    document.getElementById("controls").style.display = showControls ? "none" : "block";
    showControls = !showControls;
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
