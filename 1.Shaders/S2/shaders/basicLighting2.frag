#version 330 core

//in vec4 frontColor;
in float Nz; //
in vec3 colorFrag; //

out vec4 fragColor;

void main()
{
    fragColor = vec4(colorFrag,1.0) * Nz;
}
