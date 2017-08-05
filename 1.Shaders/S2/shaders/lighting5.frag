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
uniform bool world = true;

vec4 light(vec3 N, vec3 V, vec3 L){
    N=normalize(N); V=normalize(V); L=normalize(L);
    vec3 R = normalize( 2.0*dot(N,L)*N-L );
    float NdotL = max( 0.0, dot( N,L ) );
    float RdotV = max( 0.0, dot( R,V ) );
    float Idiff = NdotL;
    float Ispec = 0;
    if (NdotL>0) Ispec=pow( RdotV, matShininess );
    return
    matAmbient * lightAmbient +
    matDiffuse * lightDiffuse * Idiff+
    matSpecular * lightSpecular * Ispec;
}


void main(){
    vec3 Nnorm = normalize(N);
    vec3 L = normalize(lightPosition.xyz - P); // from P to the light
    vec3 V = -normalize(P); // now we assume the real V

    if(world)fragColor = light(Nnorm, V, L);
    else{
        Neye = 
    }
}
