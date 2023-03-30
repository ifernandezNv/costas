export function formatearCantidad(cantidad: number){
    const cantidadFormateada = cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    })
    return cantidadFormateada
}