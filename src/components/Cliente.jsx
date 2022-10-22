import { useNavigate, Form, redirect } from 'react-router-dom'
import { deleteCliente } from '../data/clientes';

export async function action({params}) {
  await deleteCliente(params.clienteId);
  return redirect('/');
}


const Cliente = ({cliente}) => {  

  const navigate = useNavigate();
  const {id, nombre, email, empresa, telefono } = cliente;
  
  return (
    <tr>
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{nombre}</p>
        <p>{empresa}</p>
      </td>

      <td className="p-6">
        <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Email: </span>{email} </p>
        <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Teléfono: </span>{telefono} </p>
      </td>

      <td className="p-6 flex gap-5 justify-center">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md uppercase font-bold "
            onClick={ () => navigate(`/clientes/${id}/editar`)}
          >Editar</button>

          <Form
            method="POST"
            action={`/clientes/${id}/eliminar`}
            onSubmit={(e) => {              
              if(!confirm('¿Deseas Eliminar este cliente?')){
                //el prevent default lo que hace es prevenir que se ejecute el action y se tiene qu enegar el confirm
                e.preventDefault();
              }
            }}
          >
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md uppercase font-bold "
            >Eliminar</button>
          </Form>
      </td>
      
    </tr>    
)
}

export default Cliente