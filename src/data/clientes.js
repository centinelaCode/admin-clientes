export async function getClientes() {
  const url = import.meta.env.VITE_API_URL;

  const respuesta = await fetch(url)
  const resultado = await respuesta.json();
  return resultado;
}


export async function getCliente(id) {
  const url = `${import.meta.env.VITE_API_URL}/${id}`;

  const respuesta = await fetch(url)
  const resultado = await respuesta.json();  
  return resultado;
}


export async function addCliente(data) {
  try {
    const url = import.meta.env.VITE_API_URL;
    const respuesta = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    await respuesta.json()
  } catch (error) {
    console.log(error)
  }
}