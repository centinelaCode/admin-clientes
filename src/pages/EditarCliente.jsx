import { useLoaderData } from 'react-router-dom'
import { getCliente } from "../data/clientes";

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


const EditarCliente = () => {

  // podemos acceder al loader por medio del hook useLoaderData
  const cliente = useLoaderData();
  

  return (
    <>
      <h1>{cliente.id} - {cliente.nombre}</h1>
    </>
  )
}

export default EditarCliente