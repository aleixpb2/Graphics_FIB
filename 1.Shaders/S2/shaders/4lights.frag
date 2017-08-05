#version 330 core

out vec4 fragColor;

in vec3 N; // normal (en object space)
in vec3 P; // posicio del vertex (en object space)
uniform float time;
uniform bool rotate = true;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

// V, N, P, lightPos han d'estar al mateix espai de coordenades
// V és el vector unitari cap a l'observador
// N és la normal
// P és la posició 
// lightPos és la posició de la llum
// lightColor és el color de la llum
vec4 light(vec3 V, vec3 N, vec3 P, vec3 lightPos, vec3 lightColor){ // all in eye space
	const float shininess = 100.0;
	const float Kd = 0.5;
	N = normalize(N);
	vec3 L = normalize(lightPos - P);
	vec3 R = reflect(-L, N);
	float NdotL = max(0.0, dot(N,L));
	float RdotV = max(0.0, dot(R,V));
	float spec =  pow( RdotV, shininess);
	return vec4(Kd*lightColor*NdotL + vec3(spec),0);
}

void main(){
    // alternative: all in object space. So:
    // V=normalize(modelViewMatrixInverse[3].xyz-P)
    // l1 = (modelViewMatrixInverse*vec4(l1, 1)).xyz; // after rotating
	vec3 Peye = (modelViewMatrix*vec4(P, 1.0)).xyz;
	vec3 V = normalize(-Peye);
	vec3 Neye = normalMatrix*N;
	
	vec3 l1 = vec3(0, 10, 0);
	vec3 l2 = vec3(0, -10, 0);
	vec3 l3 = vec3(10, 0, 0);
	vec3 l4 = vec3(-10, 0, 0);
	if(rotate){
        float c = cos(time);
        float s = sin(time);
        mat3 rot = mat3(vec3(c, s, 0), vec3(-s, c, 0), vec3(0, 0, 1));
        l1 = rot*l1;
        l2 = rot*l2;
        l3 = rot*l3;
        l4 = rot*l4;
    }
	
	fragColor = light(V, Neye, Peye, l1, vec3(0, 1, 0));
	fragColor += light(V, Neye, Peye, l2, vec3(1, 1, 0));
	fragColor += light(V, Neye, Peye, l3, vec3(0, 0, 1));
	fragColor += light(V, Neye, Peye, l4, vec3(1, 0, 0));
}
