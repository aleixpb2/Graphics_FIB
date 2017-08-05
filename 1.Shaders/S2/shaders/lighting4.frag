#version 330 core

out vec4 fragColor;
in vec3 N;
in vec3 P;

uniform vec4 lightAmbient; // light properties
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;
uniform vec4 lightPosition; // eye space
uniform vec4 matAmbient; // materials
uniform vec4 matDiffuse;
uniform vec4 matSpecular;
uniform float matShininess;

void main(){
    vec3 Nnorm = normalize(N);
    vec3 L = normalize(lightPosition.xyz - P); // from P to the light
    vec3 R = normalize(2*dot(Nnorm,L)*Nnorm-L);
    vec3 V = -normalize(P); // now we assume the real V

    // Light calc: Ka*Ia + Kd*Id(N·L) + Ks*Is(R·V)^s
    fragColor = matAmbient*lightAmbient;
    fragColor += matDiffuse*lightDiffuse*max(0.0, dot(Nnorm, L));
    fragColor += matSpecular*lightSpecular*pow(max(0.0, dot(R, V)), matShininess);
}
