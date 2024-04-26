export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch("https://rabiasport-openpayapi.6gpvax.easypanel.host/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      // Aquí, en lugar de lanzar un error, podrías devolver un objeto que indique la condición de error.
      return {
        error: true,
        message: "Network response was not ok",
        status: response.status,
      };
    }

    const data = await response.json();
    return { error: false, data };
  } catch (error: any) {
    // En vez de imprimir el error, devuelves un objeto de error.
    return { error: true, message: error.message };
  }
};
