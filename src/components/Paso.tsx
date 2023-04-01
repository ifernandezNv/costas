import { formatearCantidad } from '../helpers';
function Paso({paso}) {
    const {porcentaje, porcentajeCantidadInicial, umas, dineroUmas} = paso
    const porcentajeSplit = porcentaje.split('%')
  return (
    <>
      {Object.values(paso).includes(0) ? null :  (
        <tr className='border-2 '>
          <td className='text-lg p-2'>El {porcentaje}  {umas === 300 ? ' por los primeros 300 días de UMA' : umas > 300 ? `por los subsecuentes ${umas} UMA` : 'de lo que rebase la anterior cifra'} 
          </td>
          <td className='font-medium text-indigo-700 border-2 p-2'>{umas ? formatearCantidad(dineroUmas * Number(porcentajeSplit[0]/100)) : formatearCantidad(porcentajeCantidadInicial)}</td>
        </tr>
      )}
    </>
  )
}

export default Paso