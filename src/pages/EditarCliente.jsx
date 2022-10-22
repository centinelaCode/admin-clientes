import { useLoaderData, useActionData, Form, useNavigate, redirect } from 'react-router-dom'
import { getCliente, updateCliente } from "../data/clientes";
import Formulario from '../components/Formulario';
import Error from '../components/Error';

export async function loader({params}) {
  const clienteId = params.clienteId;

  const cliente = await getCliente(clienteId);
  
  // validamos si encontro el cliente
  if(Object.values(cliente).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'El cliente no existe'
    })
  }

  return cliente;
}

export async function action({request, params}) {

  const formDat = await request.formData();

  const data = Object.fromEntries(formDat);
  
  const email = formDat.get('email');
  
  const errors = [];

  // Validación
  // validamos que se inegresen todos los datos
  if(Object.values(data).includes('')) {
    errors.push('Todos los campos son obligatorios')
  }

  // validamos que sea un email valido
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)) {
    errors.push('El email no es valido')
  }
  
  // retornar datos si hay error
  if(Object.keys(errors).length) {
    return errors;
  }
   
  // hacemos el update: el id lo tomamos de params y le pasamos la data
  await updateCliente(params.clienteId, data);

  return redirect('/');
}


const EditarCliente = () => {
  // para obtner el navigate del hook useNaviagte
  const navigate = useNavigate();

  // para acceder al loader por medio del hook useLoaderData  
  const cliente = useLoaderData();

  // para obtener los errores del action se hace con el hook useActionData
  const errores = useActionData();
  

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">A continuación podrás modificar los datos de un cliente</p>
      <hr />

      <div className="flex justify-end mt-3">
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md uppercase font-bold "
          onClick={ () => navigate(-1)}
        >Volver</button>
      </div>      

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10 font-bold">   

        {
          errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error> )
        }

        <Form
          method='POST'
          noValidate
        >
            <Formulario 
              cliente={cliente}
            />

            <input 
              type="submit"
              className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
              value="Guardar Cambios"
            />          
        </Form>     
      </div>
    </>
  )
}

export default EditarCliente