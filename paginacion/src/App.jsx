import { useState } from 'react'
import './App.css'

// Creamos una lista de productos de ejemplo
const items = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  nombre: `Producto ${i + 1}`,
  precio: (Math.random() * 100).toFixed(2),
  imagen: `https://picsum.photos/seed/${i + 1}/100/100`
}))

function App() {
  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1)
  // Cantidad de productos por página
  const itemsPerPage = 4

  // Calculamos el total de páginas
  const totalPages = Math.ceil(items.length / itemsPerPage)
  // Calculamos el índice inicial del array para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage
  // Obtenemos los productos que se mostrarán en la página actual
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage)

  // Función para ir a la página anterior
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  // Función para ir a la página siguiente
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  // Función para ir a una página específica
  const goToPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="App">
      <h1>Paginación de Productos</h1>
      {/* Mostramos los productos de la página actual */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {currentItems.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: 10, width: 150 }}>
            <img src={item.imagen} alt={item.nombre} style={{ width: '100%' }} />
            <h3>{item.nombre}</h3>
            <p>Precio: ${item.precio}</p>
          </div>
        ))}
      </div>
      {/* Controles de paginación */}
      <div style={{ marginTop: 20 }}>
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Anterior
        </button>
        {/* Botones de número de página */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            style={{
              fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
              margin: '0 2px'
            }}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default App
