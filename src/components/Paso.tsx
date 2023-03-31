import { formatearCantidad } from '../helpers';
function Paso({paso}) {
    const {porcentaje, porcentajeCantidadInicial, acumulado, umas, dineroUmas} = paso
  return (
    <>
      {Object.values(paso).includes(0) ? null :  (
        <div>
          <p className='text-lg'>Porcentaje: {porcentaje} = <span className='font-medium text-indigo-700'>{formatearCantidad(porcentajeCantidadInicial)}</span></p>
          {umas && dineroUmas && 
          (
            <p className='text-lg'>UMAS: {umas} = <span className='font-medium text-indigo-700'>{formatearCantidad(dineroUmas)}</span></p>
          )}
          <p className='text-lg'>Acumulado: <span className='font-medium text-indigo-700'>{formatearCantidad(acumulado)}</span></p>
        </div>
      )}
    </>
  )
}

export default Paso