#version 330 core

uniform sampler2D colorMap; 
uniform float time; 

out vec4 fragColor;
in vec2 vtexCoord;

const vec2 C=vec2(0.272, 0.09);
const float r = 0.065;

void main(){
    vec2 d = vec2(time, 0);
    vec2 Cprima = fract(C+d);
    if(distance(vtexCoord, Cprima) < r) fragColor = texture(colorMap, vtexCoord-d);
    else if(distance(vtexCoord, C) < r) fragColor = texture(colorMap, vtexCoord+vec2(0.5, 0));
    else fragColor = texture(colorMap, vtexCoord);
}
