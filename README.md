# Proyecto de Sistema Operativo - Algoritmo del Banquero

Este proyecto implementa una simulación del Algoritmo del Banquero, una estrategia de prevención de bloqueos (deadlocks) en sistemas operativos.

## Descripción

El algoritmo simula la asignación segura de recursos a diferentes procesos, evitando estados de bloqueo. El sistema verifica que cada proceso pueda completar su ejecución antes de asignar recursos, manteniendo el sistema en un estado seguro.

## Características

- Visualización de recursos asignados y máximos por proceso
- Cálculo automático de diferencias y verificación de condiciones
- Simulación paso a paso del proceso de asignación y liberación de recursos
- Interfaz visual del estado de cada proceso

## Funcionamiento

1. Se generan números aleatorios que cumplen las condiciones del algoritmo
2. Se muestra una tabla con la información de cada proceso
3. La simulación ejecuta la secuencia segura de procesos
4. Se visualiza el estado de los recursos en tiempo real