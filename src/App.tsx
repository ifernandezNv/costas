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
  porcentaje: string,
  porcentajeCantidadInicial: number,
  umas: number,
  dineroUmas: number,
  nuevaCantidadInicial: number,
  acumulado: number
}

function App() {
  const [uma, setUma] = useState({year: '2023', valor: 103.74});
  const [cantidadInicial, setCantidadInicial] = useState<number>(0);
  const [cantidadFinal, setCantidadFinal] = useState<number>(0);
  const [alerta, setAlerta] = useState<TAlerta>({mensaje: '', tipo: ''})
  const [cargando, setCargando] = useState<Boolean>(false)
  const [paso, setPaso] = useState<TPaso>({porcentaje: '', porcentajeCantidadInicial: 0, umas: 0, dineroUmas: 0, nuevaCantidadInicial: 0, acumulado: 0})
  const [pasos, setPasos] = useState<TPaso[]>([])

  function obtenerCostas(): void{
    setCargando(true)
    let sumatoria = 0
    let cantidadInicialBandera = cantidadInicial
    if(cantidadInicial === 0){
      setAlerta({mensaje:'La cantidad capturada debe ser mayor a 0', tipo: 'error'})
      eliminarAlerta()
      setCargando(false)
      return
    }
    if((cantidadInicialBandera * 0.25) > (300 * uma.valor)){
      sumatoria += (300 * uma.valor) * 0.25
      setPaso({
        porcentaje: '25%',
        porcentajeCantidadInicial: cantidadInicialBandera * 0.25,
        umas: 300,
        dineroUmas: 300 * uma.valor,
        nuevaCantidadInicial: cantidadInicialBandera - (300 * uma.valor),
        acumulado: sumatoria
      })
      setPasos([...pasos, paso])
      cantidadInicialBandera -= (300 * uma.valor)
      if((cantidadInicialBandera * 0.20) > (1200 * uma.valor)){
        sumatoria += (1200 * uma.valor) * 0.20
        cantidadInicialBandera -= (1200 * uma.valor)
        setPaso({
          porcentaje: '20%',
          porcentajeCantidadInicial: (cantidadInicialBandera) * 0.20,
          umas: 1200,
          dineroUmas: 1200 * uma.valor,
          nuevaCantidadInicial: cantidadInicialBandera - (1200 * uma.valor),
          acumulado: sumatoria
        })
        setPasos([...pasos, paso])
        if((cantidadInicialBandera * 0.15) > (6000 * uma.valor)){
          sumatoria += (6000 * uma.valor) * 0.15
          cantidadInicialBandera -= (6000 * uma.valor)
          sumatoria += (cantidadInicialBandera * 0.10)
        }else{
          sumatoria += (cantidadInicialBandera * 0.15)
        }
      }else{
        sumatoria += (cantidadInicialBandera * 0.20)
      }
    }else{
      sumatoria += (cantidadInicial * 0.25)
    }
    setCantidadFinal(sumatoria)
    setTimeout(() => {
      setCargando(false)  
    }, 2000);
    console.log(pasos)
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
                <h2 className='capitalize text-center font-semibold text-xl'>Desglose de cantidades</h2>
                {pasos.map(paso => <Paso key={paso.porcentaje} paso={paso}/>)}
                <h2 className='capitalize text-center font-semibold text-xl'>Resumen Final</h2>
                <p>Cantidad Inicial: {formatearCantidad(cantidadInicial)}</p>
                <p>Año: {uma.year}</p>
                <p>Valor del UMA: {formatearCantidad(uma.valor)}</p>
                <p>Acumulado: {formatearCantidad(cantidadFinal)}</p>
                
              </>
            )}
          </section>
        </div>
      </section>
    </main>
  )
}

export default App
