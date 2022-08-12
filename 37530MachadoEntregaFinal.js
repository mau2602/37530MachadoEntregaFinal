// DESARROLLO DE UNA PLATAFORMA DE ALQUILER DE MOTOS.



function show(){
      
        // Capturamos los datos del cliente y la reserva
        let nombre1 = document.getElementById("nombre1").value;
        let apellido1 = document.getElementById("apellido1").value;
        let correo1 = document.getElementById("correo1").value;
        let bikes = parseInt(document.getElementById("selectBike").value);
        let weeksEntry = parseInt(document.getElementById("rentTime").value);
        let geoLoc = ("Palma de Mallorca");
        let extraHelmet = document.getElementById("helmet").value;
        let moto = "";
        
    if (nombre1 !== "" && apellido1 !== "" && correo1 !== "" && weeksEntry !== ""){
    
   const getMoto = async () => {
  
    const motos = await fetch ('databaseMotos.json');
    const data = await motos.json();

    // Asignacion del objeto moto a la eleccion del cliente
    if (bikes === 1){
       moto = (data[0]);
    } else if (bikes === 2){
       moto = (data[1]);
    } else if (bikes === 3){
       moto = (data[2]);
    } else if (bikes === 4){
       moto = (data[3]);
    } else if (bikes === 5){
       moto = (data[4]);
    }

    class Cliente {
     constructor (nombre, apellido, correo){
         this.nombre = nombre;
         this.apellido = apellido;
         this.correo = correo;
         this.newMoto = null;

         this.addMoto = () => {
                    this.newMoto = moto;
                }
            
         this.informeInterno = () => {
                 console.log(`INFORMACION ALQUILER
                 DATOS CLIENTE

                 Nombre: ${nombre1}
                 Apellido: ${apellido1}
                 Correo electronico: ${correo1}
                 
                 DATOS VEHICULO
                 
                 Marca: ${this.newMoto.marca}
                 Modelo: ${this.newMoto.modelo}
                 Cilindrada: ${this.newMoto.cilindrada} cc
                 Fecha de alquiler: ${fechaHoy}
                 Fecha devolucion: ${devolucion}`)
             }
          }
       }
      
   const cliente1 = new Cliente(nombre1, apellido1, correo1);

    // Asignamos valor a la variable "extraHelmet" usando un operador ternario
    extraHelmet === ("si") ? extraHelmet = 10 : extraHelmet = 0;

    // obtenemos las fechas de alquiler y devolucion de la moto mediante libreria Luxon
    DateTime = luxon.DateTime;
    let fechaHoy = DateTime.now()
    fechaHoy = (fechaHoy.toFormat('dd LLL yyyy'));
    let devolucion = (DateTime.now().plus({ days: (weeksEntry * 7) }));
    devolucion = (devolucion.toFormat('dd LLL yyyy'));
    devolucion = devolucion.toLocaleString();
   
    //-----------------------------------------------------
    cliente1.addMoto();
    cliente1.informeInterno();
    //-----------------------------------------------------
    
    // Mostramos el resumen de la reserva.
    let finalText = document.getElementById("returnFinalPrice");
    
    if (weeksEntry == 1){
    finalText.innerText = `¡Felicitaciones! 
    
     Has alquilado la moto ${cliente1.newMoto.marca} ${cliente1.newMoto.modelo} ${cliente1.newMoto.cilindrada}cc por ${weeksEntry} semana, en la ciudad de ${geoLoc}. El precio final es : $${((cliente1.newMoto.precio * weeksEntry) + extraHelmet)}`
    } else {

      finalText.innerText = `¡Felicitaciones! 
    
     Has alquilado la moto ${cliente1.newMoto.marca} ${cliente1.newMoto.modelo} ${cliente1.newMoto.cilindrada}cc por ${weeksEntry} semanas, en la ciudad de ${geoLoc}. El precio final es : $${((cliente1.newMoto.precio * weeksEntry) + extraHelmet)}`
    }
    
    // Almacenamiento del objeto 'cliente' en localStorage.
    let alqCliente = {"nombre": cliente1.nombre, "apellido": cliente1.apellido, "correo": cliente1.correo, "motoMarca": cliente1.newMoto.marca, "motoModelo": cliente1.newMoto.modelo, "motoCilindrada": cliente1.newMoto.cilindrada, "fecha": devolucion, "precio": cliente1.newMoto.precio + extraHelmet}
    let alqClienteJsonSt = JSON.stringify(alqCliente)
    localStorage.setItem(cliente1.apellido, alqClienteJsonSt);

    // Reemplazamos el texto del estado de la reserva
    let clienteStr = localStorage.getItem(cliente1.apellido);
    let clienteStr1 = JSON.parse(clienteStr);
    let estadoReserva = document.getElementById("estadoReserva");
    estadoReserva.innerText = (`Tu reserva es: 

    Nombre: ${clienteStr1.nombre} 
    Apellido: ${clienteStr1.apellido}
    Correo:  ${clienteStr1.correo} 
    Marca: ${clienteStr1.motoMarca} 
    Cilindrada: ${ clienteStr1.motoCilindrada} 
    Fecha alquiler: ${fechaHoy}
    Fecha devolución: ${ clienteStr1.fecha}
    Precio: $${clienteStr1.precio * weeksEntry}`);
  
    // Histórico de reservas realizadas
    console.log("Historico de reservas");
      for (let i = 0; i < localStorage.length; i++) {
 
       const clave = localStorage.key(i);
       const valor = localStorage.getItem(clave);
       const usuario = JSON.parse(valor);
       console.log(`  · Cliente:  ${usuario.nombre} ${usuario.apellido}
  · Vehículo:  ${usuario.motoMarca} ${usuario.motoModelo} ${usuario.motoCilindrada}
  · Fecha de alquiler:  ${fechaHoy}
  · Fecha de devolucion:  ${usuario.fecha}`);
  
      }
   }
  getMoto();
    // Mensaje de error con SweetAlerts
  } else { 
        swal({
            title: "Error!",
            text: "Debes completar todos los campos para continuar.",
            icon: "error",
          });
    
  }
}

// Creamos un mensaje con la libreria Toastify que invite al usuario a ver el resumen de su reserva haciendo click en el boton 'volver arriba'
const tostado = document.getElementById("boton");
tostado.addEventListener("click", () => {
   Toastify({
       text: `Clickeá en el boton 'Volver arriba' 
        para ver el resumen de tu reserva`,
       gravity: "bottom",
       duration: 3000,
       style: {
           background: "light blue",
       }
   }).showToast();
})

// Botón 'volver arriba'
const subir = document.getElementById("arribaBtn");
subir.addEventListener("click", window.onload = () => {
    const elevador = new Elevator ({
    element : document.querySelector("#arribaBtn"),
    duration: 800
  })
})
