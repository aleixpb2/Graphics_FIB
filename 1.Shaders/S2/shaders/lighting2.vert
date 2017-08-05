// Phong
#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;

out vec4 frontColor;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix; // added

// Added:
uniform vec4 lightAmbient; // light properties
uniform vec4 lightDiffuse;
uniform vec4 lightSpecular;
uniform vec4 lightPosition; // eye space
uniform vec4 matAmbient; // materials
uniform vec4 matDiffuse;
uniform vec4 matSpecular;
uniform float matShininess;

void main(){
    vec3 N = normalize(normalMatrix * normal);
    vec3 P = (modelViewMatrix * vec4(vertex, 1.0)).xyz; // eye space
    vec3 L = normalize(lightPosition.xyz - P); // from P to the light
    vec3 R = normalize(2*dot(N,L)*N-L);
    vec3 V = -normalize(P); // now we assume the real V

    // Light calc: Ka*Ia + Kd*Id(N·L) + Ks*Is(R·V)^s
    frontColor = matAmbient*lightAmbient;
    frontColor += matDiffuse*lightDiffuse*max(0.0, dot(N, L));
    frontColor += matSpecular*lightSpecular*pow(max(0.0, dot(R, V)), matShininess);

    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
