console.log(Math.abs(Math.sin(-20)), Math.abs(Math.sin(20)));

var scrollPos = 0;
const sizes = {
    width: 800,
    height: 600
}

const scene = new THREE.Scene;

const geometry = new THREE.PlaneGeometry(sizes.width, sizes.height);
const red = new THREE.Color(0xff0000);

//material
const material = new THREE.LineBasicMaterial({
    color: red,
    linewidth: 1,
	linecap: 'round', //ignored by WebGLRenderer
	linejoin:  'round' //ignored by WebGLRenderer
})

const vert =`
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    uniform mat4 modelMatrix;

    attribute vec3 position;

    void main()
    {
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }
`

//from https://www.shadertoy.com/view/wdK3Dy
const frag =`
    precision mediump float;
    
    void main(){
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

const shader = new THREE.RawShaderMaterial( {

	uniforms: {
		//time: { value: 1.0 },
		//resolution: { value: new THREE.Vector2() }
        
	},

	vertexShader: vert,
	fragmentShader: frag

} );

const mesh = new THREE.Mesh(geometry, shader);
const roof = new THREE.Mesh(geometry, material);
roof.position.z = sizes.height/-2
roof.position.y = 100;
roof.rotation.x = -30;
scene.add(roof);

mesh.rotation.x = 30;
mesh.position.z = sizes.height/-2
scene.add(mesh);

const camera =  new THREE.PerspectiveCamera(75, sizes.width / sizes.height)//foc 45-55 =  natural fov
//camera.position.z = 4;
scene.add(camera)

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
//animation
const tick = () => {
    scrollPos = window.scrollY;
    //console.log(scrollPos);
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
}
tick()