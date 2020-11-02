//Variables for setup

let container;
let camera;
let renderer;
let scene;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 10;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.5;
  const far = 1000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(14, -10, 500);

  const ambient = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(50, 50, 100);
  scene.add(light);
  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  function loadModel(url) {
    return new Promise(resolve => {
      new THREE.GLTFLoader().load(url, resolve);
    });
  }

  let model1, model2;

  let p1 = loadModel('./house/scene.gltf').then(result => {  model1 = result.scene.children[0]; });
  let p2 = loadModel('./shelby_mustang_gt500/scene.gltf').then(result => {  model2 = result.scene.children[0]; });

  //if all Promises resolved 
  Promise.all([p1,p2]).then(() => {
    //do something to the model
    model1.position.set(-80,-50,0);
    model2.position.set(80,-12,0);
    model1.scale.x = 15;
    model1.scale.y = 15;
    model1.scale.z = 15;
    model2.scale.x = 1.5;
    model2.scale.y = 1.5;
    model2.scale.z = 1.5;
    

    //add model to the scene
    scene.add(model1);
    scene.add(model2);
    
    //continue the process
    requestAnimationFrame(animate);
  });
  
  function animate() {
    requestAnimationFrame(animate);
    model1.rotation.z -= 0.005;
    model2.rotation.z += 0.005;
    renderer.render(scene,camera);
  }
  //Load Model
  // let loader = new THREE.GLTFLoader();
  // loader.load("./shelby_mustang_gt500/scene.gltf", function(gltf) {
  //   scene.add(gltf.scene);
  //   car1 = gltf.scene.children[0];
  //   animate();
  // });
}


init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
