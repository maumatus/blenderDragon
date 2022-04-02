"""Este script exporta los valores de los keyframes a CSV, encabezado lleva nombre componente e Index"""
"""Esta pensado para convertir datos de Keyframes a MOCO de Dragonframe"""

#Importamos modulos
import bpy
import csv

#variable con el objeto en contexto de Blender
ob = bpy.context.object

#Condicionales para que se ejecute si no estan vacíos
if ob is not None:
    if ob.animation_data is not None and ob.animation_data.action is not None:
        
        
        #Datos de animacion en FCurves. Estos solo van a 
        action = ob.animation_data.action   
        
        #Abrimos el archivo CSV para guardar datos. Ingresar ruta del directorio.
        with open('/Users/mauricio/Desktop/csv.csv','w',encoding='UTF8') as f:
        
            #Con Loop "For" recorremos el objeto y los datos de las FCurves guardados por Blender.
            #Imprime datos para X,Y,Z con nombre componente e index.
            for fcu in action.fcurves:
                
                writer = csv.writer(f)
                writer.writerow([fcu.data_path,fcu.array_index])
                
                 
                for kp in fcu.keyframe_points:
                   
                    writer = csv.writer(f)
                    writer.writerow(kp.co[:])
                    
            print("Datos exportados a CSV con éxito")

                        
                        








       


