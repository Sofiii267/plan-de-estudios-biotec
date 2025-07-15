const materias = {
  'Primer año': {
    'Cuatrimestre 1': [
      { nombre: "Análisis I", codigo: "analisis1", correlativas: [] },
      { nombre: "Ciencia, Tecnología y Sociedad", codigo: "cts", correlativas: [] },
      { nombre: "Química General", codigo: "quimicaGeneral", correlativas: [] },
      { nombre: "Biología I", codigo: "biologia1", correlativas: [] }
    ],
    'Cuatrimestre 2': [
      { nombre: "Álgebra y Geometría Analítica", codigo: "algebra", correlativas: [] },
      { nombre: "Introducción a la Biotecnología", codigo: "introBT", correlativas: ["quimicaGeneral", "cts"] },
      { nombre: "Biología II", codigo: "biologia2", correlativas: ["quimicaGeneral", "biologia1"] },
      { nombre: "Química Inorgánica", codigo: "quimicaInorganica", correlativas: ["quimicaGeneral", "analisis1"] }
    ]
  },
  'Segundo año': {
    'Cuatrimestre 3': [
      { nombre: "Química Orgánica", codigo: "quimicaOrganica", correlativas: ["quimicaInorganica"] },
      { nombre: "Análisis II", codigo: "analisis2", correlativas: ["analisis1"] },
      { nombre: "Física I", codigo: "fisica1", correlativas: ["analisis1"] }
    ],
    'Cuatrimestre 4': [
      { nombre: "Física II", codigo: "fisica2", correlativas: ["analisis2", "fisica1"] },
      { nombre: "Biología III", codigo: "biologia3", correlativas: ["biologia2"] },
      { nombre: "Estadística Aplicada", codigo: "estadistica", correlativas: ["analisis1", "algebra"] },
      { nombre: "Química Biológica I", codigo: "quimicaBio1", correlativas: ["quimicaOrganica", "biologia2"] }
    ]
  },
  'Tercer año': {
    'Cuatrimestre 5': [
      { nombre: "Fisicoquímica", codigo: "fisicoquimica", correlativas: ["quimicaInorganica", "fisica2"] },
      { nombre: "Genética General", codigo: "genetica", correlativas: ["biologia2", "estadistica", "quimicaBio1"] },
      { nombre: "Química Biológica II", codigo: "quimicaBio2", correlativas: ["quimicaBio1"] },
      { nombre: "Biología IV", codigo: "biologia4", correlativas: ["biologia2", "quimicaOrganica"] }
    ],
    'Cuatrimestre 6': [
      { nombre: "Microbiología", codigo: "microbiologia", correlativas: ["introBT", "quimicaBio2", "genetica"] },
      { nombre: "Biología Celular", codigo: "biocelular", correlativas: ["quimicaBio2", "biologia3"] },
      { nombre: "Introducción a la Bioinformática", codigo: "bioinfo", correlativas: ["estadistica", "biologia2"] }
    ]
  },
  'Cuarto año': {
    'Cuatrimestre 7': [
      { nombre: "Inmunología Básica", codigo: "inmunoBasica", correlativas: ["quimicaBio2", "genetica"] },
      { nombre: "Genética Molecular", codigo: "geneticaMol", correlativas: ["genetica", "microbiologia", "biocelular"] },
      { nombre: "Química Analítica", codigo: "quimicaAnalitica", correlativas: ["quimicaOrganica", "estadistica", "fisicoquimica"] }
    ],
    'Cuatrimestre 8': [
      { nombre: "Inmunología Molecular", codigo: "inmunoMol", correlativas: ["inmunoBasica", "geneticaMol"] },
      { nombre: "Biotecnología Animal", codigo: "biotecAnimal", correlativas: ["geneticaMol"] },
      { nombre: "Bioquímica de Proteínas", codigo: "bioqProteinas", correlativas: ["quimicaBio2", "quimicaAnalitica", "fisicoquimica"] }
    ]
  },
  'Quinto año': {
    'Cuatrimestre 9': [
      { nombre: "Biotecnología Vegetal", codigo: "biotecVegetal", correlativas: ["biologia4", "bioinfo", "geneticaMol"] },
      { nombre: "Bioprocesos", codigo: "bioprocesos", correlativas: ["microbiologia", "geneticaMol", "fisicoquimica"] },
      { nombre: "Métodos de Análisis de Biomoléculas", codigo: "metAnalisis", correlativas: ["quimicaAnalitica", "inmunoMol", "bioinfo"] }
    ],
    'Cuatrimestre 10': [
      { nombre: "Proyectos Biotecnológicos", codigo: "proyectos", correlativas: [] } // se habilita manualmente al final
    ]
  }
};

const aprobadas = new Set(JSON.parse(localStorage.getItem("aprobadas") || "[]"));

function puedeCursar(materia) {
  return materia.nombre === "Proyectos Biotecnológicos"
    ? Object.values(materias).flatMap(c => Object.values(c).flat()).every(m => m.codigo === "proyectos" || aprobadas.has(m.codigo))
    : materia.correlativas.every(c => aprobadas.has(c));
}

function renderMaterias() {
  const container = document.getElementById("materias-container");
  container.innerHTML = "";

  for (const [anio, cuatris] of Object.entries(materias)) {
    const anioDiv = document.createElement("div");
    anioDiv.className = "anio";
    anioDiv.innerHTML = `<h2>${anio}</h2>`;

    for (const [cuatri, listaMaterias] of Object.entries(cuatris)) {
      const cuatriDiv = document.createElement("div");
      cuatriDiv.className = "cuatrimestre";
      cuatriDiv.innerHTML = `<h3>${cuatri}</h3>`;

      const grid = document.createElement("div");
      grid.className = "materias-grid";

      listaMaterias.forEach(materia => {
        const btn = document.createElement("button");
        btn.textContent = materia.nombre;
        btn.className = "materia";

        const estaAprobada = aprobadas.has(materia.codigo);
        const habilitada = puedeCursar(materia);

        if (estaAprobada) {
          btn.classList.add("aprobada");
        } else if (habilitada) {
          btn.classList.add("habilitada");
        } else {
          btn.classList.add("bloqueada");
          btn.disabled = true;
        }

        btn.onclick = () => {
          if (aprobadas.has(materia.codigo)) {
            aprobadas.delete(materia.codigo);
          } else {
            aprobadas.add(materia.codigo);
          }
          localStorage.setItem("aprobadas", JSON.stringify([...aprobadas]));
          renderMaterias();
        };

        grid.appendChild(btn);
      });

      cuatriDiv.appendChild(grid);
      anioDiv.appendChild(cuatriDiv);
    }

    container.appendChild(anioDiv);
  }
}

renderMaterias();

