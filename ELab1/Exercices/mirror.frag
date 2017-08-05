#version 330 core

in vec2 vtexCoord; // from 0 to 1
out vec4 fragColor;

uniform sampler2D colorMap; 
uniform float time; 

void main(){
    vec2 myTexCoord = vtexCoord;
    float st = step(0.5, vtexCoord.s);
    float time_st = step(0.5, fract(time));
    myTexCoord.s = (-time_st*2 +1)*(2*st-1)*vtexCoord.s;
    fragColor = texture(colorMap, myTexCoord);
}
// Versio no tant simplificada:
//
//     if(fract(time) <= 0.5){
//         myTexCoord.s = (2*st-1)*vtexCoord.s;
//     }else myTexCoord.s = vtexCoord.s*(1-2*st);
//     fragColor = texture(colorMap, myTexCoord);
