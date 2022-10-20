import { useNavigate } from 'react-router-dom'
import Formulario from '../components/Formulario';


const NuevoCliente = () => {

  // para redireccionar
  const navigate = useNavigate();
  

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Clientes</h1>
      <p className="mt-3">Completa la información que se solicita para registrar un nuevo cliente </p>
      <hr />

      <div className="flex justify-end mt-3">
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md uppercase font-bold "
          onClick={ () => navigate(-1)}
        >Volver</button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx auto px-5 py-10 mt-10">   
        <form>
            <Formulario />

            <input 
              type="submit"
              className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
              value="Registrar Cliente"
            />          
        </form>     
      </div>
    </>
  )
}

export default NuevoCliente