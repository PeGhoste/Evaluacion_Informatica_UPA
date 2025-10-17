// Función de flecha que calcula la edad para actualizar el campo de edad automáticamente
const calcularEdad = (fechaNacimiento) => {

    // Obtener la fecha actual
    const hoy = new Date();

    // Obtener la fecha de nacimiento del usuario
    if (!fechaNacimiento){
        return 0;
    }  // Si no hay fecha de nacimiento, retornar 0
    else if (typeof fechaNacimiento === 'string'){
        fechaNacimiento = new Date(fechaNacimiento);
    } // Convertir a objeto Date si es una cadena
    else if( !(fechaNacimiento instanceof Date)){
        return 0;
    } // Si no es un objeto Date, retornar 0

    // Calcular la edad
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    
    // Ajustar si el cumpleaños aún no ha ocurrido este año
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    // Si el mes es negativo o es el mes actual pero el día de hoy es menor que el día de nacimiento, restar un año
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    // Devolvemos la edad calculada
    return edad;
}

// Función para convertir una fecha de yyyy-mm-dd a dd-mm-yyyy
const formatearFecha = (fechaYYYYMMDD) => {
    const [año, mes, dia] = fechaYYYYMMDD.split('-');
    return `${dia}-${mes}-${año}`;
}

// Ahora escuchamos el evento 'DOMContentLoaded' para asegurarnos de que el DOM esté completamente cargado antes de ejecutar nuestro código
document.addEventListener('DOMContentLoaded', () =>{

    // Obtenemos el campo de fecha de nacimiento y el campo de edad por sus IDs
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    const edadInput = document.getElementById('edad');

    // Recargamos el campo edad cada vez que haya un cambio en la fecha
    fechaNacimientoInput.addEventListener('change', (e) =>{
        const fechaNacimiento = e.target.value; // Obtenemos el valor de la fecha de nacimiento
        const edad = calcularEdad(fechaNacimiento); // Calculamos la edad
        edadInput.value = edad; // Actualizamos el campo de edad con la edad calculada
    });

    // Ahora, obtenemos el formulario
    const formulario = document.getElementById('formularioUsuario');

    // Escuchamos el evento 'submit' del formulario
    formulario.addEventListener('submit', (e) =>{
        e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario

        // Obtenemos los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const fechaFormateada = formatearFecha(fechaNacimiento); // Convertimos la fecha a dd-mm-yyyy
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;

        // Obtenemos también el campo de edad para validarlo
        const edad = document.getElementById('edad').value;
        
        // Validamos que la edad sea mayor o igual a 18
        if (parseInt(edad) < 18){
            alert('Debes ser mayor de edad para registrarte');
            return; // Salimos de la función si la edad es menor a 18
        }

        // Validamos que el correo venga con un formato válido
        if (!correo.includes('.')){
            alert('El correo no tiene un formato válido: ' + correo);
            return; // Salimos de la función si el correo no es válido
        }

        // Validamos que el teléfono tenga exactamente 8 dígitos
        if(telefono.length !== 8){
            alert('El número de teléfono debe tener exactamente 8 dígitos');
            return; // Salimos de la función si el teléfono no tiene 8 dígitos
        }

        // Le pasamos el estado que llevará el usuario "quemado"
        const idEstado = 1; // Estado "Activo"

        // Usamos fetch para enviar los datos al servidor
        fetch('http://localhost:3000/guardar_usuario', {
            method: 'POST', // Método HTTP
            headers: {
                'Content-Type': 'application/json' // Indicamos que el cuerpo de la solicitud es JSON
            },
            body: JSON.stringify({
                nombre: nombre,
                fechaNacimiento: fechaFormateada,
                correo: correo,
                telefono: telefono,
                estadoUsuarioId: idEstado
                // En este caso no pasamos la fecha actual
                // ya que en la tabla de la base de datos tiene un valor por defecto
                // que es la fecha y hora actual del sistema
            }) // Convertimos los datos a una cadena JSON
        }).then(response => response.json()) // Parseamos la respuesta como JSON
        .catch((error) => {
            console.error('Error:', error); // Mostramos cualquier error en la consola
            alert('Error al guardar el usuario, revisa la información nuevamente'); // Notificamos al usuario del error
        });

    });

});