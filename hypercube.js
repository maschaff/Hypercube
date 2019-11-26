var vertices = [
    new THREE.Vector3(-1, -1, 1),
    new THREE.Vector3(1, -1, 1),
    new THREE.Vector3(-1, 1, 1),
    new THREE.Vector3(1, 1, 1),
    new THREE.Vector3(-1, -1, -1),
    new THREE.Vector3(1, -1, -1),
    new THREE.Vector3(-1, 1, -1),
    new THREE.Vector3(1, 1, -1)
];


function main() {

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );

    var material = new THREE.LineBasicMaterial({color: 0x0000ff});

    var object = new THREE.Geometry(1, 1, 1);

    object.vertices.push(
        new THREE.Vector3(-1, -1, 1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(-1, 1, 1),
        new THREE.Vector3(1, 1, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 1, -1),
        new THREE.Vector3(1, 1, -1)
    );

    object.faces.push(
        new THREE.Face3(0, 3, 2),
        new THREE.Face3(0, 1, 3),

        new THREE.Face3(1, 7, 3),
        new THREE.Face3(1, 5, 7),

        new THREE.Face3(5, 6, 7),
        new THREE.Face3(5, 4, 6),

        new THREE.Face3(4, 2, 6),
        new THREE.Face3(4, 0, 2),

        new THREE.Face3(2, 7, 6),
        new THREE.Face3(2, 3, 7),

        new THREE.Face3(4, 1, 0),
        new THREE.Face3(4, 5, 1)
    );

    var edges = new THREE.EdgesGeometry(object);

    var wireframe = new THREE.LineSegments(edges, material);
    scene.add(wireframe);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        wireframe.rotation.x += 0.01;
        wireframe.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();


}