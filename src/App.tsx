import { useState } from 'react'
import Alerta from './components/Alerta';
import Spinner from './components/Spinner';
import Paso from './components/Paso';
import { formatearCantidad } from './helpers';

export interface TAlerta {
  mensaje: string,
  tipo: string
}
interface TPaso{
  id?: number
  porcentaje: string,
  porcentajeCantidadInicial: number,
  umas?: number,
  dineroUmas?: number,
  nuevaCantidadInicial?: number,
  acumulado: number
}

function App() {
  const [uma, setUma] = useState({year: '2023', valor: 103.74});
  const [cantidadInicial, setCantidadInicial] = useState<number>(0);
  const [cantidadFinal, setCantidadFinal] = useState<number>(0);
  const [alerta, setAlerta] = useState<TAlerta>({mensaje: '', tipo: ''})
  const [cargando, setCargando] = useState<Boolean>(false)
  const [paso1, setPaso1] = useState<TPaso>({id: Date.now(),porcentaje: '', porcentajeCantidadInicial: 0, acumulado: 0})
  const [paso2, setPaso2] = useState<TPaso>({id: Date.now(),porcentaje: '', porcentajeCantidadInicial: 0, acumulado: 0})
  const [paso3, setPaso3] = useState<TPaso>({id: Date.now(),porcentaje: '', porcentajeCantidadInicial: 0, acumulado: 0})
  const [paso4, setPaso4] = useState<TPaso>({id: Date.now(),porcentaje: '', porcentajeCantidadInicial: 0, acumulado: 0})

  function obtenerCostas(): void{
    setCargando(true)
    let sumatoria = 0
    let cantidadInicialBandera = cantidadInicial
    if(cantidadInicialBandera === 0 || cantidadInicialBandera === null){
      setAlerta({mensaje:'La cantidad capturada debe ser mayor a 0', tipo: 'error'})
      eliminarAlerta()
      setCargando(false)
      return
    }
    if((cantidadInicialBandera * 0.25) > (300 * uma.valor)){
      sumatoria += (300 * uma.valor) * 0.25
      setPaso1({
        porcentaje: '25%',
        porcentajeCantidadInicial: cantidadInicialBandera * 0.25,
        umas: 300,
        dineroUmas: 300 * uma.valor,
        nuevaCantidadInicial: cantidadInicialBandera - (300 * uma.valor),
        acumulado: sumatoria
      })
      cantidadInicialBandera -= (300 * uma.valor)
      if((cantidadInicialBandera * 0.20) > (1200 * uma.valor)){
        sumatoria += (1200 * uma.valor) * 0.20
        cantidadInicialBandera -= (1200 * uma.valor)
        setPaso2({
          porcentaje: '20%',
          porcentajeCantidadInicial: (cantidadInicialBandera) * 0.20,
          umas: 1200,
          dineroUmas: 1200 * uma.valor,
          nuevaCantidadInicial: cantidadInicialBandera - (1200 * uma.valor),
          acumulado: sumatoria
        })
        if((cantidadInicialBandera * 0.15) > (6000 * uma.valor)){
          sumatoria += (6000 * uma.valor) * 0.15
          cantidadInicialBandera -= (6000 * uma.valor)
          setPaso3({
            porcentaje: '15%',
            porcentajeCantidadInicial: (cantidadInicialBandera) * 0.15,
            umas: 6000,
            dineroUmas: 6000 * uma.valor,
            nuevaCantidadInicial: cantidadInicialBandera - (6000 * uma.valor),
            acumulado: sumatoria
          })
          sumatoria += (cantidadInicialBandera * 0.10)
          setPaso4({
            porcentaje: '10%',
            porcentajeCantidadInicial: (cantidadInicialBandera) * 0.10,
            acumulado: sumatoria
          })
        }else{
          sumatoria += (cantidadInicialBandera * 0.15)
          setPaso3({
            porcentaje: '15%',
            porcentajeCantidadInicial: (cantidadInicialBandera) * 0.15,
            acumulado: sumatoria
          })
          setPaso4({id: Date.now(),porcentaje: '', porcentajeCantidadInicial: 0, acumulado: 0})
        }
      }else{
        sumatoria += (cantidadInicialBandera * 0.20)
        setPaso2({
          porcentaje: '20%',
          porcentajeCantidadInicial: (cantidadInicialBandera) * 0.20,
          acumulado: sumatoria
        })
        setPaso3({id: Date.now(),porcentaje: '', porcentajeCantidadInicial: 0, acumulado: 0})
        setPaso4({id: Date.now(),porcentaje: '', porcentajeCantidadInicial: 0, acumulado: 0})
      }
    }else{
      sumatoria += (cantidadInicial * 0.25)
      setPaso1({
        porcentaje: '25%',
        porcentajeCantidadInicial: (cantidadInicialBandera) * 0.25,
        acumulado: sumatoria
      })
      setPaso2({id: Date.now(),porcentaje: '', porcentajeCantidadInicial: 0, acumulado: 0})
      setPaso3({id: Date.now(),porcentaje: '', porcentajeCantidadInicial: 0, acumulado: 0})
      setPaso4({id: Date.now(),porcentaje: '', porcentajeCantidadInicial: 0, acumulado: 0})
    }
    setCantidadFinal(sumatoria)
    setTimeout(() => {
      setCargando(false)
    }, 2000)
  }

  function eliminarAlerta(){
    setTimeout(() => {
      setAlerta({mensaje: '', tipo: ''})  
    }, 3000)
    
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col items-center justify-center">
      <section>
        <h1 className='text-center text-white text-4xl capitalize font-bold pt-10'>Cálculo de costas - Lerdo Abogados</h1>
        <div className='bg-white p-5  my-10 rounded shadow-lg'>
          {alerta.mensaje && <Alerta alerta={alerta}/>}
          <div className='flex flex-col gap-4'>
            <label htmlFor="cantidad" className='font-semibold text-xl text-gray-800'>Cantidad: </label>
            <input type="number" id='cantidad' placeholder='0' onChange={(e)=>setCantidadInicial(Number(e.target.value))} className='p-2 border-2 rounded border-black text-gray-800'/>
          </div>
          <div className='flex flex-col gap-4 my-5'>
            <label htmlFor="uma" className='font-semibold text-xl text-gray-800'>Seleccione el UMA Diario a Utilizar: </label>
            <select className='p-2 border-black border-2 rounded text-gray-800 font-medium' onChange={(e) => {
              const [valor, year] = e.target.value.split('-')
              setUma({year, valor: Number(valor)})
            }}>
              <option value='103.74-2023'>2023 - $103.74</option>
              <option value='96.22-2022'>2022 - $96.22</option>
              <option value='89.62-2021'>2021 - $89.62</option>
              <option value='86.88-2020'>2020 - $86.88</option>
              <option value='84.49-2019'>2019 - $84.49</option>
              <option value='80.60-2018'>2018 - $80.60</option>
              <option value='75.49-2017'>2017 - $75.49</option>
              <option value='73.04-2016'>2016 - $73.04</option>
            </select>
            <button onClick={obtenerCostas} type='button' className='rounded p-4 text-white font-bold text-xl bg-indigo-500 hover:bg-indigo-900 transition-all'>
              Generar Costas
            </button>
          </div>

          <section className='flex flex-col gap-5 my-5'>
            {cargando ? <Spinner/> : cantidadFinal > 0 &&  (
              <>
                <h2 className='capitalize text-center font-semibold text-2xl'>Desglose de cantidades</h2>
                {[paso1, paso2, paso3, paso4].map(paso => <Paso key={paso.id} paso={paso}/>)}
                <h2 className='capitalize text-center font-semibold text-2xl'>Resumen Final</h2>
                <p className='text-xl font-medium'>Cantidad Inicial: <span className='font-semibold text-indigo-700'>{formatearCantidad(cantidadInicial)}</span></p>
                <p className='text-xl font-medium'>Valor del UMA: <span className='font-semibold text-indigo-700'>{formatearCantidad(uma.valor)}</span></p>
                <p className='text-xl font-medium'>Año: {uma.year}</p>
                <p className='text-xl font-medium'>Costas: <span className='font-semibold text-indigo-700'>{formatearCantidad(cantidadFinal)}</span></p>
                
              </>
            )}
          </section>
        </div>
      </section>
    </main>
  )
}

export default App
