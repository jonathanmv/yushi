(function(){
  var inputCantidad, cantidadYushis, cantidadBaseYushis,
    cantidadPersonas, spanPrecio, diferenciaYushis;

  var precio = 250, multiplicador = 1.1, yushisPorPersona = 4;

  init();

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
    var opciones = {
      min: 100,
      max: 1000,
      from: 400,
      step: 100,
      postfix: " yushis",
      prettify_enabled: true,
      prettify_separator: ".",
      onChange: actualizarCotizacion
    };
    inputCantidad = $("#cantidad");
    inputCantidad.ionRangeSlider(opciones);
    actualizarCotizacion(opciones);
  }

  function actualizarCotizacion(data) {
    var cantidadBase = parseInt(data.from),
      cantidad = parseInt(cantidadBase * multiplicador),
      precioCalculado = parseInt(precio * cantidadBase / 1000),
      diferencia = cantidad - cantidadBase,
      personas = parseInt(cantidad / yushisPorPersona);
    cantidadYushis.text(cantidad);
    spanPrecio.text(precioCalculado);
    cantidadBaseYushis.text(cantidadBase);
    diferenciaYushis.text(diferencia);
    cantidadPersonas.text(personas);
  }
})();
