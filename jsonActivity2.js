// 1. Arreglo original (NO debe modificarse)
const originalData = [
  {
    aseguradora: "AFIRME",
    cotizacion: {
      cliente: {
        tipoPersona: "fisica",
        nombre: "prueba",
        apellidoPat: "prueba",
        apellidoMat: "prueba",
        rfc: "",
        fechaNacimiento: "01-01-2005",
        ocupacion: "",
        curp: "",
        direccion: {
          calle: "oriente 945",
          noExt: "410",
          noInt: "021",
          colonia: "prueba",
          codPostal: "56618",
          poblacion: "mexico",
          ciudad: "cdmx",
          pais: "mexico",
        },
        edad: "18",
        genero: "MASCULINO",
        telefono: "",
        email: "",
      },
    },
  },
];

/**
 * 2. Copia profunda del arreglo original
 *
 * Se utiliza structuredClone porque:
 * - Realiza una copia profunda (deep copy)
 * - Evita compartir referencias entre objetos anidados
 * - Garantiza la inmutabilidad del objeto original
*/
const copiedData = structuredClone(originalData);

// 3. Modificación de al menos 5 campos del arreglo copiado
copiedData[0].cotizacion.cliente.nombre = "JuanRamon";
copiedData[0].cotizacion.cliente.apellidoPat = "Pérez";
copiedData[0].cotizacion.cliente.rfc = "PEPJ900101ABC";
copiedData[0].cotizacion.cliente.email = "juan.ramon@mail.com";
copiedData[0].cotizacion.cliente.fechaNacimiento = "10-05-1995";
copiedData[0].cotizacion.cliente.direccion.colonia = "Selene";

/**
 * 4. Impresión en consola
 *
 * Se muestran ambos arreglos para comprobar que:
 * - El arreglo original permanece intacto
 * - El arreglo copiado contiene las modificaciones
 */
console.log(" Arreglo original (sin cambios):");
console.log(originalData);

console.log(" Arreglo copiado y modificado:");
console.log(copiedData);