/*globals: { Asteroid: true }*/
(function(){
  'use strict';
  var inputCantidad, cantidadYushis, cantidadBaseYushis,
    cantidadPersonas, spanPrecio, diferenciaYushis,
    botonComprar, campoNombre, campoEmail, campoCelular,
    realizandoPedido = false;

  var precio = 250, multiplicador = 1.1, yushisPorPersona = 4;


  var host = 'yushinavidad.meteor.com',
    cliente = new Asteroid(host),
    Pedidos = cliente.getCollection('pedidos');

  function init() {
    initSpans();
    initInputs();
  }

  function initSpans () {
    cantidadYushis = $('.cantidadYushis');
    cantidadBaseYushis = $('#cantidadBaseYushis');
    cantidadPersonas = $('.cantidadPersonas');
    spanPrecio = $('.precio');
    diferenciaYushis = $('#diferenciaYushis');
  }

  function initInputs() {
    initSlider();

    botonComprar = $('button#comprar');
    botonComprar.click(alComprar);

    campoNombre = $('#nombre');
    campoEmail = $('#email');
    campoCelular = $('#celular');
  }

  function initSlider() {
    var opciones = {
      min: 100,
      max: 1000,
      from: 400,
      step: 100,
      postfix: ' yushis',
      prettify_enabled: true,
      prettify_separator: '.',
      onChange: actualizarCotizacion
    };
    inputCantidad = $('#cantidad');
    inputCantidad.ionRangeSlider(opciones);
    actualizarCotizacion(opciones);
  }

  function obtenerDatosCotizacion(data) {
    var cantidadBase = parseInt(data.from),
      cantidad = parseInt(cantidadBase * multiplicador),
      precioCalculado = parseInt(precio * cantidadBase / 1000),
      diferencia = cantidad - cantidadBase,
      personas = parseInt(cantidad / yushisPorPersona);

    return {
      cantidadBaseYushis: cantidadBase,
      cantidadYushis: cantidad,
      precio: precioCalculado,
      personas: personas,
      diferenciaYushis: diferencia
    };
  }

  function actualizarCotizacion(data) {
    var datos = obtenerDatosCotizacion(data);
    cantidadYushis.text(datos.cantidadYushis);
    spanPrecio.text(datos.precio);
    cantidadBaseYushis.text(datos.cantidadBaseYushis);
    diferenciaYushis.text(datos.diferenciaYushis);
    cantidadPersonas.text(datos.personas);
  }

  function alComprar() {
    if(realizandoPedido) {
      return;
    }

    realizandoPedido = true;

    var sliderValue = inputCantidad.data(),
      datosCotizacion = obtenerDatosCotizacion(sliderValue),
      nombre = (campoNombre.val() + '').trim(),
      email = (campoEmail.val() + '').trim(),
      celular = (campoCelular.val() + '').trim(),
      pedido = {
        cantidad: datosCotizacion.cantidadBaseYushis,
        nombre: nombre,
        email: email,
        celular: celular,
        creado: new Date(),
        confirmado: false,
        fechaEntrega: null,
        direccionEntrega: null,
        pagado: false
      },
      pedidoRealizado = false;

    if (nombre.length && email.length && celular.length) {
      Pedidos.insert(pedido);
      pedidoRealizado = true;
    }

    completar(pedidoRealizado);
  }

  function completar(pedidoRealizado) {
    if (pedidoRealizado) {
      $('.icon-close').click();
      var notification = new NotificationFx({
        message : '<p>Pedido confirmado. En un momento nos comunicaremos por teléfono o email para ajustar detalles.</p>',
        layout : 'attached',
        effect : 'flip',
        type : 'notice'
      });

      // show the notification
      notification.show();
    } else {

    }
    realizandoPedido = false;
  }

  init();

})();
