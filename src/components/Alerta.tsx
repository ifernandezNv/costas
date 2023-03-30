function Alerta({alerta} ) {
  return (
    <div className={`${alerta.tipo === 'error' ? 'bg-red-700' : 'bg-green-700'} text-white text-center font-semibold text-xl capitalize rounded shadow py-4 my-4`}>
      <p>{alerta.mensaje}</p>
    </div>
  )
}

export default Alerta