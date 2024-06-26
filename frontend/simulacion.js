function calcularResultado(puntuacion1, puntuacion2){
    let rangoMaximo1;
    let rangoMaximo2;
    if(puntuacion1 > puntuacion2){
      if((puntuacion1 - puntuacion2) > 25){
        rangoMaximo1 = 8 + 1;
        rangoMaximo2 = 2;
      }else if((puntuacion1 - puntuacion2) > 20){
        rangoMaximo1 = 7 + 1;
        rangoMaximo2 = 2;
      }else if((puntuacion1 - puntuacion2) > 15){
        rangoMaximo1 = 6 + 1;
        rangoMaximo2 = 2;
      }else if((puntuacion1 - puntuacion2) > 10){
        rangoMaximo1 = 5 + 1;
        rangoMaximo2 = 2;
      }else if((puntuacion1 - puntuacion2) > 5){
        rangoMaximo1 = 4 + 1;
        rangoMaximo2 = 2;
      }else if((puntuacion1 - puntuacion2) > 0){
        rangoMaximo1 = 3 + 1;
        rangoMaximo2 = 2;
      }
    }else if(puntuacion2 > puntuacion1){
      if((puntuacion2 - puntuacion1) > 25){
        rangoMaximo1 = 1 + 1;
        rangoMaximo2 = 7;
      }else if((puntuacion2 - puntuacion1) > 20){
        rangoMaximo1 = 1 + 1;
        rangoMaximo2 = 6;
      }else if((puntuacion2 - puntuacion1) > 15){
        rangoMaximo1 = 1 + 1;
        rangoMaximo2 = 5;
      }else if((puntuacion2 - puntuacion1) > 10){
        rangoMaximo1 = 1 + 1;
        rangoMaximo2 = 4;
      }else if((puntuacion2 - puntuacion1) > 5){
        rangoMaximo1 = 1 + 1;
        rangoMaximo2 = 3;
      }else if((puntuacion2 - puntuacion1) > 0){
        rangoMaximo1 = 1 + 1;
        rangoMaximo2 = 2;
      }
    }else{
      rangoMaximo1 = 3;
      rangoMaximo2 = 2;
    }
    return [rangoMaximo1, rangoMaximo2];
}

function simularPartido(equipos){
    if(document.getElementById("equipo1").style.display === "none" 
        || document.getElementById("equipo2").style.display === "none"){
      document.getElementById("elegirEquipo").style.display="block";
    }else{
      document.getElementById("elegirEquipo").style.display="none";
      const equipo1 = document.getElementById("equipo1").querySelector("div").querySelector("img").alt;
      const equipo2 = document.getElementById("equipo2").querySelector("div").querySelector("img").alt;
      let punEquipo1;
      let punEquipo2;
      let rangos = [];
      let resultado1;
      let resultado2;
  
      equipos.forEach(equipo =>{
        if(equipo.nombre == equipo1){
          punEquipo1 = equipo.puntuacion;
        }else if(equipo.nombre == equipo2){
          punEquipo2 = equipo.puntuacion;
        }
      })
  
      rangos = calcularResultado(punEquipo1, punEquipo2);
      resultado1 = (Math.floor(Math.random() * rangos[0] + 1)) - 1;
      resultado2 = (Math.floor(Math.random() * rangos[1] + 1)) - 1;
  
      document.getElementById("m1").textContent = resultado1;
      document.getElementById("m2").textContent = resultado2;
    }
}

function simularLiga(equipos){
    document.getElementById("equipos-container").style.display = "none";
    document.getElementById("simularPartidoBtn").style.display = "none";
    document.getElementById("vistaSimularLiga").style.display = "block";
    document.getElementById("simularLigaBtn").style.display = "none";
    llenarTablaPosiciones(equipos);
    llenarTablaPartidos(equipos);
}

function simularPartidoLiga(equipos, equipo1, equipo2){
  let punEquipo1;
  let punEquipo2;
  let rangos = [];
  let resultado1;
  let resultado2;
  
  equipos.forEach(equipo =>{
    if(equipo.nombre == equipo1){
      punEquipo1 = equipo.puntuacion;
    }else if(equipo.nombre == equipo2){
      punEquipo2 = equipo.puntuacion;
    }
  })
  
  rangos = calcularResultado(punEquipo1, punEquipo2);
  resultado1 = (Math.floor(Math.random() * rangos[0] + 1)) - 1;
  resultado2 = (Math.floor(Math.random() * rangos[1] + 1)) - 1;
  
  calcularPuntos(equipos, equipo1, equipo2, resultado1, resultado2);
  return [resultado1, resultado2];
}

function calcularPuntos(equipos, equipo1, equipo2, resultado1, resultado2){
  let ganador;

  if(resultado1 > resultado2){
    ganador = 1;
  }
  else if(resultado1 < resultado2){
    ganador = 2;
  }else{
    ganador = 0;
  }

  equipos.forEach(equipo =>{
    if(equipo.nombre == equipo1){
      equipo.gf += resultado1;
      equipo.gc += resultado2;
      equipo.dif += (resultado1 - resultado2); 
      equipo.pj += 1;

      if(ganador == 1){
        equipo.pts += 3;
        equipo.pg += 1;
      }else if(ganador == 2){
        equipo.pp += 1;
      }else{
        equipo.pts += 1;
        equipo.pe += 1;
      }
    }
    else if(equipo.nombre == equipo2){
      equipo.gf += resultado2;
      equipo.gc += resultado1;
      equipo.dif += (resultado2 - resultado1); 
      equipo.pj += 1;

      if(ganador == 2){
        equipo.pts += 3;
        equipo.pg += 1;
      }else if(ganador == 1){
        equipo.pp += 1;
      }else{
        equipo.pts += 1;
        equipo.pe += 1;
      }
    }
  })
  ordenarEquipos(equipos);
  actualizarTablaPosiciones(equipos);
}

function compararEquipos(equipo1, equipo2){
  if (equipo1.pts !== equipo2.pts) {
    return equipo2.pts - equipo1.pts;
  }
  if (equipo1.dif !== equipo2.dif) {
    return equipo2.dif - equipo1.dif;
  }
  if (equipo1.gf !== equipo2.gf) {
    return equipo2.gf - equipo1.gf;
  }
  if (equipo1.gc !== equipo2.gc) {
    return equipo1.gc - equipo2.gc;
  }
  if (equipo1.pg !== equipo2.pg) {
    return equipo2.pg - equipo1.pg;
  }
  if (equipo1.pp !== equipo2.pp) {
    return equipo1.pp - equipo2.pp;
  }
  return 0;
}

function ordenarEquipos(equipos) {
  equipos.sort(compararEquipos);
}

function actualizarTablaPosiciones(equipos) {
  const tabla = document.getElementById("tBody1");
  tabla.innerHTML = '';

  equipos.forEach((equipo, i) => {
    const tr = document.createElement("tr");

    if (i === 0) {
      tr.classList.add("punt");
      tr.id = "eq" + i;
    } else if (i % 2 === 0) {
      tr.classList.add("par");
      tr.id = "eq" + i;
    } else {
      tr.classList.add("impar");
      tr.id = "eq" + i;
    }

    for (let x = 0; x < 10; x++) {
      const td = document.createElement("td");
      if (x === 0) {
        if (i === 0) {
          td.classList.add("cp1");
        }
        td.textContent = i + 1;
        tr.appendChild(td);
      } else if (x === 1) {
        const img = document.createElement("img");
        const p = document.createElement("p");
        img.classList.add("imgPosiciones");
        img.src = equipo.imgEquipo;
        img.alt = equipo.nombre;
        p.textContent = equipo.nombre;

        td.appendChild(img);
        td.appendChild(p);
        tr.appendChild(td);
      } else {
        td.textContent = [
          equipo.pts, equipo.pj, equipo.pg, equipo.pe, equipo.pp, 
          equipo.gf, equipo.gc, equipo.dif
        ][x - 2];
        tr.appendChild(td);
      }
    }
    tabla.appendChild(tr);
  });
}


function llenarTablaPosiciones(equipos){
  const tabla = document.getElementById("tBody1");
  equipos.forEach((equipo, i) =>{
    const tr = document.createElement("tr");
    if(i == 0){
      tr.classList.add("punt");
      tr.id = "eq" + i;
    }
    else if(i % 2 == 0){
      tr.classList.add("par");
      tr.id = "eq" + i;
    }else{
      tr.classList.add("impar");
      tr.id = "eq" + i;
    }

    for(let x = 0; x < 10; x++){
      const td = document.createElement("td");
      if(x == 0){
        if(i == 0){
          td.classList.add("cp1");
        }
        td.textContent = i + 1;
        tr.appendChild(td);
      }else if(x == 1){
        const img = document.createElement("img");
        const p = document.createElement("p");
        img.classList.add("imgPosiciones");
        img.src = equipo.imgEquipo;
        img.alt = equipo.nombre;
        p.textContent = equipo.nombre;

        td.appendChild(img);
        td.appendChild(p);
        tr.appendChild(td);
      }else{
        td.textContent = 0;
        tr.appendChild(td);
      }
    }
    tabla.appendChild(tr);
  })
}

function generarEnfrentamientos(equipos) {
  const equiposMezclados = mezclarEquipos(equipos);
  const enfrentamientos = [];
  
  for (let jornada = 1; jornada < equipos.length; jornada++) {
    for (let i = 0; i < equipos.length / 2; i++) {
      const localIndex = i;
      const visitanteIndex = equipos.length - 1 - i;
          
      enfrentamientos.push({
        jornada: jornada,
        local: equiposMezclados[localIndex],
        visitante: equiposMezclados[visitanteIndex]
      });
    }
    equipos.splice(1, 0, equipos.pop());
  }
  return enfrentamientos;
}

function mezclarEquipos(equipos) {
  for (let i = equipos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [equipos[i], equipos[j]] = [equipos[j], equipos[i]];
  }
  return equipos;
}

function mostrarCampeon(campeon){
  const contenedor = document.getElementById("campeonLiga");

  const tarjeta = document.createElement('div');
  tarjeta.classList.add('equipo-card');
  tarjeta.id = "equipo-seleccionado";
  
  const escudo = document.createElement('img');
  escudo.src = campeon.imgEquipo;
  escudo.alt = campeon.nombre;
  escudo.classList.add('equipo-escudo');
  
  const nombre = document.createElement('p');
  nombre.textContent = campeon.nombre;
  nombre.classList.add('equipo-nombre');
  
  tarjeta.appendChild(escudo);
  tarjeta.appendChild(nombre);
  contenedor.appendChild(tarjeta);
  contenedor.style.display = "inline-block"
} 

let partidos = [];

function llenarTablaPartidos(equipos, fecha = 1){
  if(fecha == 1){
    partidos = generarEnfrentamientos(equipos);
  }

  const tabla = document.getElementById("tablaPartidos");
  const btnSiguienteFecha = document.getElementById("btnSiguienteFecha");
  const tbody = document.createElement("tbody");
  document.getElementById("fechaTitulo").textContent = "FECHA " + fecha;

  tbody.id = "tBody2"
  tabla.appendChild(tbody);

  btnSiguienteFecha.replaceWith(btnSiguienteFecha.cloneNode(true));
  document.getElementById("btnSiguienteFecha").addEventListener("click", () => {
    document.getElementById("tBody2").remove();
    if(fecha == 27){
      mostrarCampeon(equipos[0]);
    }else{
      ordenarEquipos(equipos);
      llenarTablaPartidos(equipos, fecha + 1);
    }
  });

  const enfrentamientos = partidos.filter((partido) => partido.jornada == fecha );
  enfrentamientos.forEach((partido, i) =>{
    const local = partido.local.nombre;
    const visitante = partido.visitante.nombre;
    const tr = document.createElement("tr");

    if(i % 2 == 0){
      tr.classList.add("par");
    }else{
      tr.classList.add("impar");
    }

    const resultados = simularPartidoLiga(equipos, local, visitante);

    for(let x = 0; x < 4; x++){
      const td = document.createElement("td");

      if(x == 0){
        const img = document.createElement("img");
        const p = document.createElement("p");

        img.src = partido.local.imgEquipo;
        img.alt = partido.local.nombre;
        img.classList.add("imgPosiciones");
        p.textContent = partido.local.nombre;

        td.appendChild(img);
        td.appendChild(p);
        tr.appendChild(td);
      }else if(x == 3){
        const img = document.createElement("img");
        const p = document.createElement("p");

        img.src = partido.visitante.imgEquipo;
        img.alt = partido.visitante.nombre;
        img.classList.add("imgPosiciones");
        p.textContent = partido.visitante.nombre;

        td.appendChild(img);
        td.appendChild(p);
        tr.appendChild(td);
      }else if(x == 1){
        td.textContent = resultados[0];
        td.classList.add("res");

        tr.appendChild(td);
      }else{
        td.textContent = resultados[1];
        td.classList.add("res");

        tr.appendChild(td);
      }
    }
    tbody.appendChild(tr);
  })
}


export {simularPartido, simularLiga};