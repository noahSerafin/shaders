    #ifdef GL_ES
    precision mediump float;
    #endif
    
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;

    float grid_intensity = 0.1;

// Thick lines 
float grid(vec2 fragCoord, float space, float gridWidth)
{
    vec2 p  = fragCoord - vec2(.5);
    vec2 size = vec2(gridWidth);
    
    vec2 a1 = mod(p - size, space);
    vec2 a2 = mod(p + size, space);
    vec2 a = a1;
       
    float g = min(a.x, a.y);
    return clamp(g, 0., 8.0);
}


void mainImage( in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/u_resolution.xy;

    // Pixel color
    vec3 col = vec3(.9,.9,.9);
    
	
    // 2-size grid
    col *= clamp(grid(fragCoord, 10., 0.5) *  grid(fragCoord, 50., 1.), grid_intensity, 1.0); //slide xy: grid(fragCoord, squarewidth, positionxy)
    
    // Output to screen
    gl_FragColor = vec4(col,1.0);
}