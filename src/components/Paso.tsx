import { formatearCantidad } from '../helpers';
function Paso({paso}) {
    const {porcentaje, porcentajeCantidadInicial, umas, dineroUmas, acumulado} = paso;
  return (
    <>
        {porcentaje !== '' && (
            <div>
                <h3>Porcentaje de la cantidad capturada: {porcentaje} - <span>{formatearCantidad(porcentajeCantidadInicial)}</span></h3>
                <p>Cantidad de Umas: {umas} - {formatearCantidad(dineroUmas)}</p>
                <p>Cantidad Acumulada: {formatearCantidad(acumulado)}</p>
            </div>
        )}
    </>
  )
}

export default Paso