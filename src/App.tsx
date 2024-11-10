import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

interface Proceso {
  nombre: string;
  recursosAsignados: number;
  necesidadMaxima: number;
  diferencia: number;
  estado: string;
}

function App() {
  const [procesos, setProcesos] = useState<Proceso[]>([
    {
      nombre: "A",
      recursosAsignados: 0,
      necesidadMaxima: 0,
      diferencia: 0,
      estado: "esperando",
    },
    {
      nombre: "B",
      recursosAsignados: 0,
      necesidadMaxima: 0,
      diferencia: 0,
      estado: "esperando",
    },
    {
      nombre: "C",
      recursosAsignados: 0,
      necesidadMaxima: 0,
      diferencia: 0,
      estado: "esperando",
    },
  ]);
  const [recursosDisponibles, setRecursosDisponibles] = useState(2);
  const [simulacionActiva, setSimulacionActiva] = useState(false);
  const [simulacionCompletada, setSimulacionCompletada] = useState(false);

  const generarNumeros = () => {
    const nuevoProcesos = procesos.map((proceso) => {
      const asignados = Math.floor(Math.random() * 3) + 1;
      const maximos = asignados + Math.floor(Math.random() * 3) + 1;
      return {
        ...proceso,
        recursosAsignados: asignados,
        necesidadMaxima: maximos,
        diferencia: maximos - asignados,
        estado: "esperando",
      };
    });

    // Verificar condiciones
    const condicionesCumplidas = nuevoProcesos.every(
      (proceso) =>
        proceso.recursosAsignados < proceso.necesidadMaxima &&
        proceso.diferencia <= recursosDisponibles
    );

    if (condicionesCumplidas) {
      setProcesos(nuevoProcesos);
      Swal.fire({
        title: "¡Números generados!",
        text: "Las condiciones han sido cumplidas",
        icon: "success",
      });
    } else {
      generarNumeros(); // Intentar de nuevo si las condiciones no se cumplen
    }
  };

  const ejecutarSimulacion = async () => {
    setSimulacionActiva(true);
    let disponibles = recursosDisponibles;
    const procesosOrdenados = [...procesos].sort(
      (a, b) => a.necesidadMaxima - b.necesidadMaxima
    );

    for (const proceso of procesosOrdenados) {
      // Actualizar estado a "Otorgando recursos"
      setProcesos((prev) =>
        prev.map((p) =>
          p.nombre === proceso.nombre
            ? { ...p, estado: `Otorgando recursos al proceso ${p.nombre}` }
            : p
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Actualizar estado a "READY"
      setProcesos((prev) =>
        prev.map((p) =>
          p.nombre === proceso.nombre ? { ...p, estado: "READY" } : p
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Actualizar recursos disponibles
      disponibles = disponibles - proceso.diferencia;

      // Actualizar estado a "Devolviendo recursos"
      setProcesos((prev) =>
        prev.map((p) =>
          p.nombre === proceso.nombre
            ? { ...p, estado: "Devolviendo recursos" }
            : p
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Actualizar recursos disponibles después de devolver
      disponibles = disponibles + proceso.necesidadMaxima;
    }

    setSimulacionCompletada(true);
    setSimulacionActiva(false);

    Swal.fire({
      title: "¡Simulación completada!",
      text: "Todos los procesos han sido procesados exitosamente",
      icon: "success",
    });
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Proyecto de Sistema Operativo</h1>
      <h2 className="text-center mb-4">Algoritmo del Banquero</h2>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">
            Recursos Disponibles: {recursosDisponibles}
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Proceso</th>
                  <th>Recursos Asignados</th>
                  <th>Necesidad Máxima</th>
                  <th>Diferencia</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {procesos.map((proceso) => (
                  <tr key={proceso.nombre}>
                    <td>{proceso.nombre}</td>
                    <td>{proceso.recursosAsignados}</td>
                    <td>{proceso.necesidadMaxima}</td>
                    <td>{proceso.diferencia}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        {proceso.estado === "READY" && (
                          <div
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          >
                            <span className="visually-hidden">Cargando...</span>
                          </div>
                        )}
                        {proceso.estado}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-primary"
          onClick={generarNumeros}
          disabled={simulacionActiva}
        >
          Generar Números
        </button>
        <button
          className="btn btn-success"
          onClick={ejecutarSimulacion}
          disabled={
            simulacionActiva ||
            simulacionCompletada ||
            procesos[0].recursosAsignados === 0
          }
        >
          {simulacionActiva ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Simulando...
            </>
          ) : (
            "Empezar Simulación"
          )}
        </button>
      </div>

      {!procesos[0].recursosAsignados && (
        <div
          className="alert alert-info mt-4 d-flex align-items-center"
          role="alert"
        >
          <AlertCircle className="me-2" />
          Genera los números primero para comenzar la simulación
        </div>
      )}
    </div>
  );
}

export default App;
