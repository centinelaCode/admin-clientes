import { useNavigate, Form, useActionData } from 'react-router-dom'

import Formulario from '../components/Formulario';
import Error from '../components/Error';

export async function action({request}) {
  // console.log(request);

  const formDat = await request.formData();
  // leer la info de un input del form (formdata)
  // console.log(formDat.get('nombre'));

  // leer todos los datos de un formdata
  // const data = [...formDat];
  // console.log(data)

  // y otra forma de ller los datos de un formdata (obtienes un ojecto con cada propiedad por input)
  const data = Object.fromEntries(formDat);
  // console.log(data)

  // obtenemos el email ingresado para validarlo
  const email = formDat.get('email');

  // array  de errores
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
     
}


const NuevoCliente = () => {

  // para redireccionar
  const navigate = useNavigate();
  const errores = useActionData();
  console.log(errores)
  

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

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10 font-bold">   

        {
          errores?.length && errores.map( (error, i) => <Error key={i}>{error}</Error> )
        }

        <Form
          method='POST'
          noValidate
        >
            <Formulario />

            <input 
              type="submit"
              className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
              value="Registrar Cliente"
            />          
        </Form>     
      </div>
    </>
  )
}

export default NuevoCliente