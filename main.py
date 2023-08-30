import json
import math
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

# Leer el archivo JSON con el array en string
with open('data-2.json', 'r') as file:
    data_string2 = file.read()
data_list = json.loads(data_string2)

# USEFULL
def main1():
    x_values = [item['duracionDelProyecto'] for item in data_list]
    y_values = [item['porcentajeTrabajadoresMultiples'] for item in data_list]
    z_values = [item['dineroAhorradoTotal'] for item in data_list]

    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.scatter(x_values, y_values, z_values)

    ax.set_xlabel('Duración del Proyecto')
    ax.set_ylabel('Porcentaje de Trabajadores Múltiples')
    ax.set_zlabel('Dinero Ahorrado Total')

    plt.show()

# USEFULL
def main2():
    porcentaje_trabajadores_multiples = [item['porcentajeTrabajadoresMultiples'] for item in data_list]
    dinero_ahorrado_total = [item['dineroAhorradoTotal'] * 100 / item['costoDelProyectoSinTrabajadoresMultiples'] for item in data_list]

    plt.figure(figsize=(10, 6))
    plt.scatter(porcentaje_trabajadores_multiples, dinero_ahorrado_total, color='green')
    plt.xlabel('Porcentaje de Trabajadores Múltiples')
    plt.ylabel('Porcentaje de Dinero Ahorrado Del Total Sin Trabajadores Multiples')
    plt.title('Relación entre Porcentaje de Trabajadores Múltiples y el Porcentaje de Dinero Ahorrado del Total Sin Trabajadores Multiples')
    plt.grid(True)
    plt.show()
# USEFULL
def main222():
    porcentaje_trabajadores_multiples = [item['porcentajeTrabajadoresMultiples'] for item in data_list]
    dinero_ahorrado_total = [item['diasAhorrados'] for item in data_list]

    plt.figure(figsize=(10, 6))
    plt.scatter(porcentaje_trabajadores_multiples, dinero_ahorrado_total, color='blue')
    plt.xlabel('Porcentaje de Trabajadores Múltiples')
    plt.ylabel('Porcentaje de Dinero Ahorrado Del Total Sin Trabajadores Multiples')
    plt.title('Relación entre Porcentaje de Trabajadores Múltiples y el Porcentaje de Dinero Ahorrado del Total Sin Trabajadores Multiples')
    plt.grid(True)
    plt.show()

# USEFULL
def main3():
    probabilidad_de_falta = [item['duracionDelProyecto'] for item in data_list]
    porcentaje_trabajadores_multiples = [item['porcentajeTrabajadoresMultiples'] for item in data_list]
    dinero_ahorrado_total = [item['dineroAhorradoTotal'] for item in data_list]

    fig = plt.figure(figsize=(10, 8))
    ax = fig.add_subplot(111, projection='3d')
    ax.scatter(probabilidad_de_falta, porcentaje_trabajadores_multiples, dinero_ahorrado_total)
    ax.set_xlabel('Duración del Proyecto')
    ax.set_ylabel('Porcentaje de Trabajadores Múltiples')
    ax.set_zlabel('Dinero Ahorrado Total')
    ax.set_title('Relación 3D entre Probabilidad de Falta, Porcentaje de Trabajadores Múltiples y Dinero Ahorrado Total')
    plt.show()

# LESS USEFULL
def main4():
    duracion_proyecto = [item['duracionDelProyecto'] for item in data_list]
    duracion_proyecto_sin_multiples = [item['duracionDelProyectoSinTrabajadoresMultiples'] for item in data_list]

    plt.figure(figsize=(20, 6))
    plt.plot(duracion_proyecto, marker='o', label='Con Trabajadores Múltiples')
    plt.plot(duracion_proyecto_sin_multiples, marker='o', label='Sin Trabajadores Múltiples')
    plt.xlabel('Proyectos')
    plt.ylabel('Duración del Proyecto')
    plt.title('Duración del Proyecto con y sin Trabajadores Múltiples')
    plt.xticks(range(len(data_list)), [f'{i+1}' for i in range(len(data_list))], rotation=45)
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.show()
# USEFULL
def main3():
    porcentaje_trabajadores_multiples = [item['porcentajeTrabajadoresMultiples'] for item in data_list]
    dinero_ahorrado_total = [math.ceil(item['diasAhorrados']) for item in data_list]

    plt.figure(figsize=(10, 6))
    plt.scatter(porcentaje_trabajadores_multiples, dinero_ahorrado_total, color='green')
    plt.xlabel('Porcentaje Trabajadores Multiples')
    plt.ylabel('Duración del Proyecto')
    plt.title('Relación de Duración del Proyecto y porcentaje de Trabajadores Múltiples')
    plt.grid(True)
    plt.show()

# USEFULL
def main5():
    porcentaje_trabajadores_multiples = [item['porcentajeTrabajadoresMultiples'] for item in data_list]
    duracion_del_proyecto = [item['duracionDelProyecto'] for item in data_list]

    plt.figure(figsize=(10, 6))
    plt.scatter(porcentaje_trabajadores_multiples, duracion_del_proyecto, color='blue')
    plt.xlabel('Porcentaje de Trabajadores Múltiples')
    plt.ylabel('Duración del Proyecto')
    plt.title('Relación entre Porcentaje de Trabajadores Múltiples y Duración del Proyecto')
    plt.grid(True)
    plt.show()

def main6():
    inteligencias_multiples = [item["porcentajeTrabajadoresMultiples"] for item in data_list]
    costo_proyecto = [item["costoDelProyecto"] for item in data_list]

    plt.figure(figsize=(10, 6))
    plt.scatter(inteligencias_multiples, costo_proyecto, c='blue', marker='o', label='Proyecto Los Pinos')
    plt.xlabel("Porcentaje de Trabajadores Múltiples")
    plt.ylabel("Costo del Proyecto")
    plt.title("Rendimiento de Trabajadores por Inteligencias Múltiples")
    plt.legend()
    plt.grid(True)
    plt.show()

def main7():
    porcentajes_productividad = [item["porcentajeTrabajadoresMultiples"] for item in data_list]
    dias_ahorrados = [item["diasAhorrados"] for item in data_list]

    plt.figure(figsize=(10, 6))
    plt.plot(porcentajes_productividad, dias_ahorrados, marker='o')
    plt.xlabel("Porcentaje de Trabajadores Múltiples")
    plt.ylabel("Días Ahorrados")
    plt.title("Productividad de Trabajadores")
    plt.grid(True)
    plt.show()

def main8():
    percentages = [entry['porcentajeTrabajadoresMultiples'] for entry in data_list]
    productivity = [entry['diasAhorrados'] / entry['duracionDelProyecto'] * 100 for entry in data_list]

    plt.figure(figsize=(10, 5))
    plt.plot(percentages, productivity, marker='o')
    plt.xlabel('Porcentaje de Trabajadores Múltiples')
    plt.ylabel('Porcentaje de Productividad')
    plt.title('Porcentaje de Productividad de Trabajadores')
    plt.grid(True)
    plt.show()

def main9():
    percentages = [entry['porcentajeTrabajadoresMultiples'] for entry in data_list]
    porcentaje_productividad = [(1 - item["nroDeFaltas"] / item["duracionDelProyecto"]) * 100 for item in data_list]

    plt.figure(figsize=(10, 6))
    plt.plot(percentages, porcentaje_productividad, marker='o', color='green')
    plt.title('Porcentaje de Productividad de los Trabajadores')
    plt.xlabel('Porcentaje de Trabajadores Múltiples')
    plt.ylabel('Porcentaje de Productividad')
    plt.grid(True)
    plt.show()

def main10():
    porcentajes = [item["porcentajeTrabajadoresMultiples"] for item in data_list]
    costo_ahorrado = [item["dineroAhorradoTotal"] for item in data_list]
    costo_total = [item["costoDelProyecto"] for item in data_list]

    porcentaje_productividad = [(ahorro / total) * 100 for ahorro, total in zip(costo_ahorrado, costo_total)]

    plt.figure(figsize=(10, 6))
    plt.plot(porcentajes, porcentaje_productividad, marker='o', color='blue')
    plt.title('Porcentaje de Productividad de los Trabajadores')
    plt.xlabel('Porcentaje de Trabajadores Múltiples')
    plt.ylabel('Porcentaje de Productividad')
    plt.grid(True)
    plt.show()

def main11():
    porcentajes = [item["porcentajeTrabajadoresMultiples"] for item in data_list]
    porcentajes_productividad = [
        (item["dineroAhorradoTotal"] / item["costoDelProyecto"]) * 
        (item["diasAhorrados"] / item["duracionDelProyecto"]) * 100
        for item in data_list
    ]

    plt.figure(figsize=(10, 6))
    plt.plot(porcentajes, porcentajes_productividad, marker='o', color='blue')
    plt.title('Porcentaje de Productividad en Función del Porcentaje de Trabajadores Múltiples')
    plt.xlabel('Porcentaje de Trabajadores Múltiples')
    plt.ylabel('Porcentaje de Productividad')
    plt.grid(True)
    plt.show()

if __name__ == "__main__":
    #main1()
    #main2()
    #main222()
    main3() # repetir
    #main4()
    #main5()
    #main6()
    #main7()
    #main8()
    #main9()
    #main10()
    #main11()