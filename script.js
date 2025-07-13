const materias = [
  // Primer año
  { nombre: "Análisis I", codigo: "analisis1", correlativas: [] },
  { nombre: "Ciencia, Tecnología y Sociedad", codigo: "cts", correlativas: [] },
  { nombre: "Química General", codigo: "quimicaGeneral", correlativas: [] },
  { nombre: "Biología I", codigo: "biologia1", correlativas: [] },
  { nombre: "Álgebra y Geometría Analítica", codigo: "algebra", correlativas: [] },
  { nombre: "Introducción a la Biotecnología", codigo: "introBT", correlativas: ["quimicaGeneral", "cts"] },
  { nombre: "Biología II", codigo: "biologia2", correlativas: ["quimicaGeneral", "biologia1"] },
  { nombre: "Química Inorgánica", codigo: "quimicaInorganica", correlativas: ["quimicaGeneral", "analisis1"] },

  // Segundo año
  { nombre: "Química Orgánica", codigo: "quimicaOrganica", correlativas: ["quimicaInorganica"] },
  { nombre: "Análisis II", codigo: "analisis2", correlativas: ["analisis1"] },
  { nombre: "Física I", codigo: "fisica1", correlativas: ["analisis1"] },
  { nombre: "Física II", codigo: "fisica2", correlativas: ["analisis2", "fisica1"] },
  { nombre: "Biología III", codigo: "biologia3", correlativas: ["biologia2"] },
  { nombre: "Estadística Aplicada", codigo: "estadistica", correlativas: ["analisis1", "algebra"] },
  { nombre: "Química Biológica I", codigo: "quimicaBio1", correlativas: ["quimicaOrganica", "biologia2"] },

  // Tercer año
  { nombre: "Fisicoquímica", codigo: "fisicoquimica", correlativas: ["quimicaInorganica", "fisica2"] },
  { nombre: "Genética General", codigo: "genetica", correlativas: ["biologia2", "estadistica", "quimicaBio1"] },
  { nombre: "Química Biológica II", codigo: "quimicaBio2", correlativas: ["quimicaBio1"] },
  { nombre: "Biología IV", codigo: "biologia4", correlativas: ["biologia2", "quimicaOrganica"] },
  { nombre: "Microbiología", codigo: "microbiologia", correlativas: ["introBT", "quimicaBio2", "genetica"] },
  { nombre: "Biología Celular", codigo: "biocelular", correlativas: ["quimicaBio2", "biologia3"] },
  { nombre: "Introducción a la Bioinformática", codigo: "bioinfo", correlativas: ["estadistica", "biologia2"] },

  // Cuarto año
  { nombre: "Inmunología Básica", codigo: "inmunoBasica", correlativas: ["quimicaBio2", "genetica"] },
  { nombre: "Genética Molecular", codigo: "geneticaMol", correlativas: ["genetica", "microbiologia", "biocelular"] },
  { nombre: "Química Analítica", codigo: "quimicaAnalitica", correlativas: ["quimicaOrganica", "estadistica", "fisicoquimica"] },
  { nombre: "Inmunología Molecular", codigo: "inmunoMol", correlativas: ["inmunoBasica", "geneticaMol"] },
  { nombre: "Biotecnología Animal", codigo: "biotecAnimal", correlativas: ["geneticaMol"] },
  { nombre: "Bioquímica de Proteínas", codigo: "bioqProteinas", correlativas: ["quimicaBio2", "quimicaAnalitica", "fisicoquimica"] },

  // Quinto año
  { nombre: "Biotecnología Vegetal", codigo: "biotecVegetal", correlativas: ["biologia4", "bioinfo", "geneticaMol"] },
  { nombre: "Bioprocesos", codigo: "bioprocesos", correlativas: ["microbiologia", "geneticaMol", "fisicoquimica"] },
  { nombre: "Métodos de Análisis de Biomoléculas", codigo: "metAnalisis", correlativas: ["quimicaAnalitica", "inmunoMol", "bioinfo"] },

  // Optativas y cierre
  // { nombre: "Materia Optativa", codigo: "optativa", correlativas: [] },
  { nombre: "Proyectos Biotecnológicos", codigo: "proyectos", correlativas: materias => materias.every(m => aprobadas.has(m.codigo)) }, // requiere TODAS
];

// Estado
const aprobadas = new Set();

// Renderizar
function renderMaterias() {
  const container = document.getElementById("materias");
  container.innerHTML = "";

  materias.forEach(materia => {
    const button = document.createElement("button");
    button.textContent = materia.nombre;
    button.className = "materia";

    // Deshabilitar si no cumple correlativas
    const puedeCursar = typeof materia.correlativas === "function"
      ? materia.correlativas(materias)
      : materia.correlativas.every(c => aprobadas.has(c));

    button.disabled = !puedeCursar;
    button.classList.toggle("aprobada", aprobadas.has(materia.codigo));

    button.onclick = () => {
      if (aprobadas.has(materia.codigo)) {
        aprobadas.delete(materia.codigo);
      } else {
        aprobadas.add(materia.codigo);
      }
      renderMaterias();
    };

    container.appendChild(button);
  });
}

renderMaterias();
