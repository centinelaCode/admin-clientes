import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {

  const error = useRouteError();
  // console.log(error.message);

  return(
    <div className="space-y-8">
      <h1 className="text-center text-6xl font-extrabold mt-20 text-blue-900">CRM - Clientes</h1>
      <p className="text-center text-2xl">Hubo un Error</p>
      <p className="text-center text-3xl text-blue-700">{error.statusText || error.message}</p>

    </div>
  )
}