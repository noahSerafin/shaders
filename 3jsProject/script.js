console.log(THREE);

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
    //attribute vec4 aVertexPosition;
    void main()
    {
        //gl_Position = aVertexPosition;
    }
`

//from https://www.shadertoy.com/view/wdK3Dy
const frag =`
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    float grid_intensity = 0.7;

    // Thick lines 
    float grid(vec2 fragCoord, float space, float gridWidth)
    {
        vec2 p  = fragCoord - vec2(.5);
        vec2 size = vec2(gridWidth);
        
        vec2 a = mod(p - size, space);
       // vec2 a;
        
        float g = min(a.x, a.y);
        return clamp(g, 0., 2.0);//x, x, squaresize
    }


    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        // Normalized pixel coordinates (from 0 to 1)
        vec2 uv = fragCoord/iResolution.xy;

        // Pixel color
        vec3 col = vec3(.7,.7,.7);
        
        // Gradient across screen
        vec2 p = fragCoord.xy;           // Point
        vec2 c = iResolution.xy / 2.0;   // Center
        col *= (1.0 - length(c - p)/iResolution.x*0.7);
        
        // 2-size grid
        col *= clamp(grid(fragCoord, 10., 0.5) *  grid(fragCoord, 50., 1.), grid_intensity, 1.0);
        
        // Output to screen
        fragColor = vec4(col,1.0);
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