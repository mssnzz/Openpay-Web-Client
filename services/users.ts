export const getStores = async (id: any) => {
    try {
      const url = `http://localhost:3003/stores/user/${id}`; // Asume que el endpoint acepta el pairingCode como parte de la URL
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        // Si la respuesta no es exitosa, devuelve un objeto indicando el error,
        // el mensaje de error y el código de estado HTTP.
        return {
          error: true,
          message: "Network response was not ok",
          status: response.status,
        };
      }
  
      // Si la respuesta es exitosa, procesa y devuelve los datos.
      const data = await response.json();
      return { error: false, data };
    } catch (error: any) {
      // En caso de errores de red o problemas al hacer la solicitud,
      // devuelve un objeto de error con el mensaje de error.
      return { error: true, message: error.message };
    }
  };
  export const getProfile = async (token: any) => {
    try {
      const url = `http://localhost:3003/users/profile`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      });
  
      if (!response.ok) {
        // Si la respuesta no es exitosa, devuelve un objeto indicando el error,
        // el mensaje de error y el código de estado HTTP.
        return {
          error: true,
          message: "Network response was not ok",
          status: response.status,
        };
      }
  
      // Si la respuesta es exitosa, procesa y devuelve los datos.
      const data = await response.json();
      return { error: false, data };
    } catch (error: any) {
      // En caso de errores de red o problemas al hacer la solicitud,
      // devuelve un objeto de error con el mensaje de error.
      return { error: true, message: error.message };
    }
  };
  