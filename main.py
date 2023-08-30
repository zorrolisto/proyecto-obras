import json
import matplotlib.pyplot as plt

with open('data.json', 'r') as file:
    data_string2 = file.read()
data_list = json.loads(data_string2)

def show_chart_for_productividad():
    porcentaje_trabajadores_multiples = [item['porcentajeTrabajadoresMultiples'] for item in data_list]
    dinero_ahorrado_total = [item['dineroAhorradoTotal'] * 100 / item['costoDelProyectoSinTrabajadoresMultiples'] for item in data_list]

    plt.figure(figsize=(10, 6))
    plt.scatter(porcentaje_trabajadores_multiples, dinero_ahorrado_total, color='green')
    plt.xlabel('Porcentaje de Trabajadores Múltiples')
    plt.ylabel('Porcentaje de Dinero Ahorrado Del Total Sin Trabajadores Multiples')
    plt.title('Relación entre Porcentaje de Trabajadores Múltiples y el Porcentaje de Dinero Ahorrado del Total Sin Trabajadores Multiples')
    plt.grid(True)
    plt.show()

def show_chart_for_rendimiento():
    porcentaje_trabajadores_multiples = [item['porcentajeTrabajadoresMultiples'] for item in data_list]
    dinero_ahorrado_total = [item['diasAhorrados'] for item in data_list]

    plt.figure(figsize=(10, 6))
    plt.scatter(porcentaje_trabajadores_multiples, dinero_ahorrado_total, color='blue')
    plt.xlabel('Porcentaje de Trabajadores Múltiples')
    plt.ylabel('Porcentaje de Dinero Ahorrado Del Total Sin Trabajadores Multiples')
    plt.title('Relación entre Porcentaje de Trabajadores Múltiples y el Porcentaje de Dinero Ahorrado del Total Sin Trabajadores Multiples')
    plt.grid(True)
    plt.show()

if __name__ == "__main__":
    show_chart_for_productividad()
    show_chart_for_rendimiento()