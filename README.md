--- BlenderDragonframe MOCO Data ---

This NodeJS App + Python Script it's a set of tools that convert Keyframe data from Blender to Dragonframe Motion Control Module (ARC MOCO).

Exist a Pyhton alternative from GITHUB (Defaultio - Blender Addon) but have bugs for the laste version of Blender and the bezier interpretation distort the movement in Dragronframe.

This first release function with linear interpolation, constant movement. That limits the Cinematography but also give possibilities between the limits (as same other arts).

Release versions:

V0.1 - Convert movement with linear interpolation. Display graph with 3 axis of movement (vTRACK, vTILT, vPAN). Drag and drop the .csv file from Blender Scripting on the APP and write the output directory(required). This export a .ARCM file that you can import (native format) in ARC Motion Control module of DZED. Systems Dragonframe.

V0.2 - Modify the Python Script for export auto-bezier with similar interpolation as Dragonframe. (Same Control Points of Bezier Curves).

V0.3 - Export camera data to Adobe After Effects.

Mauricio Matus F.
Santiago de Chile, 2 de abril de 2022.






