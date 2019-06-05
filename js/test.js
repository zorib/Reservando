var expect = chai.expect;

describe("Test de reservar horario",function(){
  it("Cuando se reserva horario se elimina del arreglo", function(){
    listadoDeRestaurantes[2].reservarHorario("12:00");
    expect(listadoDeRestaurantes[2].horarios).not.to.include("12:00");
  })

  it("Cuando se reserva horario inexistente, el arreglo se mantiene igual", function(){
    listadoDeRestaurantes[0].reservarHorario("19:00");
    expect(listadoDeRestaurantes[0].horarios).to.have.length(3);
    // var horario = listado.reservarUnHorario("La Trottinette", "19:00");
    // expect(horario).to.eql(["13:00","15:30","18:00"])
  })
  it("Cuando se reserva horario sin parametro, el arreglo se mantiene igual", function(){
    listadoDeRestaurantes[0].reservarHorario()
    expect(listadoDeRestaurantes[0].horarios).to.have.length(3);
  })
})

describe("Test de obtener puntuacion", function(){
  it("La puntuacion promedio se calcula correctamente",function(){
    //var puntuacion = aplicacion.calificarRestaurant("Green salad");
    expect(listadoDeRestaurantes[0].obtenerPuntuacion()).to.be.eql(7.4)
    expect(listadoDeRestaurantes[6].obtenerPuntuacion()).to.be.eql(6.7)
  })
  it("Si el restaurant no tiene calificacion, esta es igual a 0", function(){
    var ejemplo = new Restaurant(16, "Pastasciutta", "Pasta", "Roma", ["14:30", "15:30", "19:00"], "../img/pasta3.jpg", []);
    expect(ejemplo.obtenerPuntuacion()).to.be.eql(0);
  })
})

describe("Test de calificar", function(){
  it("Calculamos nueva puntuacion",function(){
    var ejemplo = new Restaurant(16, "Pastasciutta", "Pasta", "Roma", ["14:30", "15:30", "19:00"], "../img/pasta3.jpg", [7,9]);
    expect(ejemplo.obtenerPuntuacion()).to.be.eql(8);
  })
  it("Calculamos una calificacion invalida", function(){
    var ejemplo = new Restaurant(18, "Pizza Union Spitalfields", "Pizza", "Londres", ["12:00", "15:00", "17:30"], "../img/pizza1.jpg", [8,6]);
    expect(ejemplo.obtenerPuntuacion("s")).to.be.eql(7);
  })
  it("Calculamos una calificacion igual a cero", function(){
    var ejemplo = new Restaurant(18, "Pizza Union Spitalfields", "Pizza", "Londres", ["12:00", "15:00", "17:30"], "../img/pizza1.jpg", [8,6]);
    expect(ejemplo.obtenerPuntuacion(0)).to.be.eql(7);
  })
})

describe("Test de buscar restaurante", function(){
  //buscarRestaurante(id)
  it("Busco un restaurante inexistente y devuelvo mensaje", function() {
    expect(listado.buscarRestaurante("a")).to.equal("No se ha encontrado ningún restaurant");
    expect(listado.buscarRestaurante("65")).to.equal("No se ha encontrado ningún restaurant");
  })
})

describe("Obtener restaurante", function(){
  it("Dado un parametro y los otros 2 con valor null nos devuelve el/los restaurantes", function() {
    expect(listado.obtenerRestaurantes("Pizza", null, null)).to.have.length(4);
  })
  it("Dado ningun parametro nos devuelve todos los restaurantes", function() {
    expect(listado.obtenerRestaurantes(null, null, null)).to.have.length(24);
  })
})



//màs reservas
describe("Calculamos el precio base", function(){
  var reserva1;
  var reserva2
  beforeEach(function(){
    reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
    reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
    });
    it("Precio base de reserva", function(){
      expect(reserva1.calcularPrecioBase()).to.equal(2800);
      expect(reserva2.calcularPrecioBase()).to.equal(300);
    })
    it("Que no se permitan numeros negativos",function(){
      var reserva3 = new Reserva (new Date(2018, 7, 23, 14, 00), -2, 250, "DES1");
      expect(reserva3.calcularPrecioBase()).to.eql(0);
    })
    it("Que no se permitan espacios vacios",function(){
      var reserva4 = new Reserva (new Date(2018, 7, 23, 14, 00),"" , 250, "DES1");
      expect(reserva4.calcularPrecioBase()).to.eql(0);
    })
    it("Que no se permitan caracteres",function(){
      var reserva5 = new Reserva (new Date(2018, 7, 23, 14, 00),"a" , 250, "DES1");
      expect(reserva5.calcularPrecioBase()).to.eql(0);
    })
})

describe("Calculamos el precio con adicionales", function(){
  var reserva1;
  var reserva2
  beforeEach(function(){
    reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
    reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
    });
  it("Que una reserva  calcule correctamente su precio adicional", function() {
    expect(reserva1.calcularAdicionales()).to.equal(280);
    expect(reserva2.calcularAdicionales()).to.equal(0);
  })
})

describe("Calculamos el precio con descuentos", function(){
  var reserva1;
  var reserva2
  beforeEach(function(){
    reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
    reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
  });

  it("Que una reserva calcule correctamente su descuento", function(){
    expect(reserva1.calcularDescuentos()).to.equal(630);
    expect(reserva2.calcularDescuentos()).to.equal(200);
  })
})

describe("Calculamos el precio final", function(){
  var reserva1;
  var reserva2
  beforeEach(function(){
    reserva1 = new Reserva(new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
    reserva2 = new Reserva(new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
  });
  it("Que una reserva calcule correctamente su precio final", function() {
    expect(reserva1.calcularPrecioFinal()).to.equal(2450);
    expect(reserva2.calcularPrecioFinal()).to.equal(100);
    })
});
