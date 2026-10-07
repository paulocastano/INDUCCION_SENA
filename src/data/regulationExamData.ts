export interface RegulationSectionInfo {
  id: string;
  number: number;
  chapter: string;
  title: string;
  articlesCovered: string;
  iconName: string;
  description: string;
  colorScheme: {
    accent: string;
    bgBadge: string;
    textBadge: string;
    border: string;
  };
}

export interface RegulationExamQuestion {
  id: number;
  sectionId: string;
  sectionTitle: string;
  articleRef: string;
  chapterRef: string;
  question: string;
  options: string[];
  correctIndex: number;
  positiveReinforcement: string;
  mistakeAnalysis: string;
  regulationBasis: string;
}

export const REGULATION_SECTIONS: RegulationSectionInfo[] = [
  {
    id: 'derechos',
    number: 1,
    chapter: 'Capítulo II',
    title: 'Derechos y Estímulos del Aprendiz',
    articlesCovered: 'Artículos 7 y 8',
    iconName: 'Award',
    description: 'Educación gratuita, póliza contra accidentes 24/7, acceso a talleres, semilleros SENNOVA y estímulos al mérito.',
    colorScheme: {
      accent: '#00f2fe',
      bgBadge: 'bg-cyan-500/10 dark:bg-cyan-500/20',
      textBadge: 'text-cyan-700 dark:text-cyan-300',
      border: 'border-cyan-500/30'
    }
  },
  {
    id: 'deberes',
    number: 2,
    chapter: 'Capítulo III',
    title: 'Deberes Fundamentales y SST',
    articlesCovered: 'Artículo 9',
    iconName: 'ShieldCheck',
    description: 'Puntualidad, porte obligatorio del carné institucional, respeto, normas de bioseguridad y elementos EPP en talleres.',
    colorScheme: {
      accent: '#10b981',
      bgBadge: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      textBadge: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/30'
    }
  },
  {
    id: 'prohibiciones',
    number: 3,
    chapter: 'Capítulo IV',
    title: 'Prohibiciones Expresas',
    articlesCovered: 'Artículo 10',
    iconName: 'AlertTriangle',
    description: 'Cero tolerancia con el plagio, fraude académico, porte de armas, ingreso de sustancias psicoactivas o comercialización ilícita.',
    colorScheme: {
      accent: '#f59e0b',
      bgBadge: 'bg-amber-500/10 dark:bg-amber-500/20',
      textBadge: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30'
    }
  },
  {
    id: 'tramites',
    number: 4,
    chapter: 'Capítulo V',
    title: 'Trámites, Inasistencias y Novedades',
    articlesCovered: 'Artículos 21, 22 y 24',
    iconName: 'Clock',
    description: 'Plazo de 3 días para justificar faltas médicas por EPS, causal de deserción y trámites de aplazamiento o traslado en SofiaPlus.',
    colorScheme: {
      accent: '#8b5cf6',
      bgBadge: 'bg-purple-500/10 dark:bg-purple-500/20',
      textBadge: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-500/30'
    }
  },
  {
    id: 'faltas',
    number: 5,
    chapter: 'Capítulos VI y VII',
    title: 'Faltas, Medidas y Sanciones',
    articlesCovered: 'Artículos 25 al 29',
    iconName: 'Scale',
    description: 'Faltas académicas y disciplinarias (Leves, Graves, Gravísimas), Plan de Mejoramiento formativo y sanciones administrativas.',
    colorScheme: {
      accent: '#ec4899',
      bgBadge: 'bg-pink-500/10 dark:bg-pink-500/20',
      textBadge: 'text-pink-700 dark:text-pink-300',
      border: 'border-pink-500/30'
    }
  },
  {
    id: 'debido_proceso',
    number: 6,
    chapter: 'Capítulo VIII',
    title: 'Debido Proceso y Comité de Evaluación',
    articlesCovered: 'Artículos 30 al 34',
    iconName: 'FileCheck',
    description: 'Presunción de inocencia, citación previa por escrito (3 días), derecho a ser escuchado, vocería y recurso de reposición.',
    colorScheme: {
      accent: '#3b82f6',
      bgBadge: 'bg-blue-500/10 dark:bg-blue-500/20',
      textBadge: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-500/30'
    }
  },
  {
    id: 'representacion',
    number: 7,
    chapter: 'Capítulo IX',
    title: 'Representatividad y Vocería',
    articlesCovered: 'Artículos 38 al 42',
    iconName: 'Users',
    description: 'Elección de vocero de ficha, líder de programa, representante de centro y comisiones oficiales en SenaSoft y WorldSkills.',
    colorScheme: {
      accent: '#14b8a6',
      bgBadge: 'bg-teal-500/10 dark:bg-teal-500/20',
      textBadge: 'text-teal-700 dark:text-teal-300',
      border: 'border-teal-500/30'
    }
  }
];

export const REGULATION_SECTION_QUESTIONS: RegulationExamQuestion[] = [
  // ==========================================
  // SECCIÓN 1: DERECHOS Y ESTÍMULOS (CAPÍTULO II) - 5 PREGUNTAS
  // ==========================================
  {
    id: 101,
    sectionId: 'derechos',
    sectionTitle: 'Capítulo II: Derechos y Estímulos del Aprendiz',
    articleRef: 'Artículo 7, Numeral 5',
    chapterRef: 'Capítulo II',
    question: '¿Qué cobertura y características tiene la Póliza de Seguro de Accidentes que el SENA otorga a cada aprendiz matriculado?',
    options: [
      'Solo ampara accidentes dentro de la jornada lectiva y requiere pago mensual de copago.',
      'Cobertura médica gratuita e integral las 24 horas del día, los 7 días de la semana durante las etapas lectiva y productiva sin costo para el aprendiz.',
      'Es un seguro optativo que cubre únicamente los viajes internacionales en avión.',
      'Cubre únicamente daños mecánicos a motocicletas o bicicletas personales.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Excelente respuesta! Tienes total claridad sobre este derecho fundamental. La póliza médica estudiantil protege tu integridad física en todo momento sin ningún costo.',
    mistakeAnalysis: 'Error de apreciación. La póliza del SENA NO tiene costo ni se limita a horarios diurnos de clase; protege al aprendiz las 24 horas del día, 7 días a la semana.',
    regulationBasis: 'El Artículo 7 numeral 5 del Acuerdo 007 de 2012 establece el derecho a contar con póliza de seguro de accidentes personales durante el tiempo formativo.'
  },
  {
    id: 102,
    sectionId: 'derechos',
    sectionTitle: 'Capítulo II: Derechos y Estímulos del Aprendiz',
    articleRef: 'Artículo 7, Numeral 8',
    chapterRef: 'Capítulo II',
    question: 'Cuando un aprendiz entrega una evidencia de aprendizaje en Zajuna, ¿cuál es el plazo reglamentario para que el instructor realice la evaluación y retroalimentación?',
    options: [
      'El instructor tiene hasta el final del trimestre formativo para revisar.',
      'En un plazo máximo de ocho (8) días hábiles siguientes a la entrega de la evidencia.',
      'Veinticuatro (24) horas improrrogables desde la carga del archivo.',
      'No existe plazo legal, queda a discreción del instructor.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Muy bien dominado! Conocer los plazos de retroalimentación te permite exigir oportunamente tus garantías formativas en el ambiente virtual.',
    mistakeAnalysis: 'Identifica la falla: No puedes esperar meses para conocer tus notas ni exigir respuesta en 24 horas; el plazo justo concertado en el reglamento es de máximo 8 días hábiles.',
    regulationBasis: 'El Artículo 7 consagra el derecho a conocer los resultados de las evaluaciones dentro de los ocho (8) días hábiles posteriores a su presentación.'
  },
  {
    id: 103,
    sectionId: 'derechos',
    sectionTitle: 'Capítulo II: Derechos y Estímulos del Aprendiz',
    articleRef: 'Artículo 8, Numeral 1',
    chapterRef: 'Capítulo II',
    question: '¿Qué incentivo institucional se le puede otorgar a un aprendiz con sobresaliente rendimiento académico, actitudinal y de liderazgo en su Centro?',
    options: [
      'Aprobación automática de la etapa productiva sin realizar ninguna práctica.',
      'Designación como Monitor de Centro con un estímulo económico mensual concertado.',
      'Permiso para no asistir a clases durante todo el trimestre lectivo.',
      'Exención vitalicia del pago de impuestos nacionales.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Acierto total! Las Monitorías son el estímulo por excelencia que reconoce tu esfuerzo académico mediante apoyo a compañeros e instructores.',
    mistakeAnalysis: 'Ojo con el error: El mérito académico nunca exime de la etapa productiva ni exonera de asistir a formación; premia mediante monitorías remuneradas y pasantías.',
    regulationBasis: 'El Artículo 8 numeral 1 establece la condición de monitor de Centro de Formación como reconocimiento al alto rendimiento formativo.'
  },
  {
    id: 104,
    sectionId: 'derechos',
    sectionTitle: 'Capítulo II: Derechos y Estímulos del Aprendiz',
    articleRef: 'Artículo 8, Numeral 3',
    chapterRef: 'Capítulo II',
    question: '¿Qué derecho asiste a los aprendices con proyectos de investigación aplicada e innovación en TecnoParques o semilleros SENNOVA?',
    options: [
      'A recibir apoyo institucional, postulación a eventos tecnológicos y prioridad en convocatorias de innovación.',
      'A cobrar honorarios como contratistas de planta desde el primer día.',
      'A registrar patentes únicamente a título privado sin reconocimiento al centro.',
      'A no presentar evidencias del programa de formación.'
    ],
    correctIndex: 0,
    positiveReinforcement: '¡Correcto! SENNOVA es el ecosistema de ciencia y tecnología que respalda con asesoría, equipos y difusión tus ideas innovadoras.',
    mistakeAnalysis: 'Falla identificada: Participar en innovación no reemplaza tus competencias obligatorias ni constituye un contrato laboral directo; es una oportunidad formativa de excelencia.',
    regulationBasis: 'El Artículo 8 destaca la participación prioritaria en programas de desarrollo tecnológico, innovación y semilleros SENNOVA.'
  },
  {
    id: 105,
    sectionId: 'derechos',
    sectionTitle: 'Capítulo II: Derechos y Estímulos del Aprendiz',
    articleRef: 'Artículo 7, Numeral 2',
    chapterRef: 'Capítulo II',
    question: 'Respecto al uso de recursos físicos y tecnológicos del Centro (maquinaria, laboratorios, biblioteca y red de datos), ¿cuál es el derecho del aprendiz?',
    options: [
      'Usarlos libremente para fines comerciales ajenos a la formación.',
      'Disponer oportuna y equitativamente de los recursos y ambientes para el desarrollo de sus competencias formativas bajo normas de seguridad.',
      'Llevarse los equipos a su domicilio sin autorización firmada.',
      'Exigir que se destinen exclusivamente a su uso personal.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Excelente comprensión! Los recursos del SENA son patrimonio público puesto al servicio equitativo del aprendizaje técnico y tecnológico.',
    mistakeAnalysis: 'Cuidado: Los bienes del Centro jamás pueden ser usados con fines de lucro privado ni retirarse sin salvoconducto; están destinados a la formación integral.',
    regulationBasis: 'Artículo 7, Numeral 2: Hacer uso adecuado de los ambientes de aprendizaje, recursos tecnológicos, didácticos y bibliotecas del Centro.'
  },

  // ==========================================
  // SECCIÓN 2: DEBERES FUNDAMENTALES Y SST (CAPÍTULO III) - 5 PREGUNTAS
  // ==========================================
  {
    id: 201,
    sectionId: 'deberes',
    sectionTitle: 'Capítulo III: Deberes Fundamentales y SST',
    articleRef: 'Artículo 9, Numeral 2',
    chapterRef: 'Capítulo III',
    question: '¿Cuál es la norma reglamentaria obligatoria respecto al carné de identificación institucional del aprendiz SENA?',
    options: [
      'Puede dejarse en casa siempre que el compañero de ficha lo reconozca de palabra.',
      'Portarlo permanentemente en un lugar visible durante toda la permanencia en las instalaciones del SENA y salidas de campo institucionales.',
      'Prestarlo a amigos o familiares para que ingresen a la biblioteca o eventos recreativos.',
      'Ponerle calcomanías sobre el código de barras y la foto para personalizarlo.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Respuesta impecable! El carné no solo te identifica con orgullo como aprendiz SENA, sino que garantiza la seguridad y control de todos en el Centro.',
    mistakeAnalysis: 'Falla detectada: El carné institucional es personal, intransferible y de porte obligatorio y visible. Prestarlo o alterarlo constituye una falta disciplinaria.',
    regulationBasis: 'Artículo 9, Numeral 2: Portar permanentemente y en lugar visible el carné institucional que lo identifica como aprendiz SENA.'
  },
  {
    id: 202,
    sectionId: 'deberes',
    sectionTitle: 'Capítulo III: Deberes Fundamentales y SST',
    articleRef: 'Artículo 9, Numeral 7',
    chapterRef: 'Capítulo III',
    question: 'En talleres, laboratorios de biotecnología, obras o plantas de producción del SENA, ¿cuál es el deber del aprendiz en Seguridad y Salud en el Trabajo (SST)?',
    options: [
      'Usar los Elementos de Protección Personal (EPP) y la indumentaria reglamentaria de manera obligatoria durante toda la práctica técnica.',
      'Solo usar gafas y botas cuando el instructor esté mirando de frente.',
      'Comer alimentos y bebidas mientras opera tornos, fresadoras o reactivos químicos.',
      'Desconectar las guardas de seguridad para trabajar con mayor rapidez.'
    ],
    correctIndex: 0,
    positiveReinforcement: '¡Correcto! La vida y la integridad física son lo más sagrado. El uso disciplinado de EPP previene accidentes en talleres industriales.',
    mistakeAnalysis: 'Ten presente: La seguridad no se negocia ni es opcional. El incumplimiento de normas SST pone en riesgo la vida propia y de los demás.',
    regulationBasis: 'Artículo 9, Numeral 7: Acatar las normas de Seguridad y Salud en el Trabajo (SST), utilizando de manera responsable la dotación y EPP correspondientes.'
  },
  {
    id: 203,
    sectionId: 'deberes',
    sectionTitle: 'Capítulo III: Deberes Fundamentales y SST',
    articleRef: 'Artículo 9, Numeral 1',
    chapterRef: 'Capítulo III',
    question: 'Frente a la puntualidad y cumplimiento del horario académico concertado, ¿qué deber impone el reglamento al aprendiz?',
    options: [
      'Llegar a la hora que disponga sin importar que interrumpa la clase magistral.',
      'Asistir puntualmente a todas las actividades formativas teóricas y prácticas, cumpliendo con el calendario establecido.',
      'Asistir únicamente los días en que haya evaluaciones escritas presenciales.',
      'Delegar a otro compañero para que firme la lista de asistencia en su nombre.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Gran respuesta! La puntualidad es un hábito profesional que distingue a los egresados del SENA ante los empleadores más exigentes del país.',
    mistakeAnalysis: 'Aquí fallaste: Firmar por otro o llegar tarde reiteradamente incumple el principio de honestidad y compromiso contractual de la formación integral.',
    regulationBasis: 'Artículo 9, Numeral 1: Asistir puntualmente a todas las actividades programadas en el plan formativo y participar activamente.'
  },
  {
    id: 204,
    sectionId: 'deberes',
    sectionTitle: 'Capítulo III: Deberes Fundamentales y SST',
    articleRef: 'Artículo 9, Numeral 12',
    chapterRef: 'Capítulo III',
    question: 'Si un aprendiz causa un daño culposo o intencional a una máquina, equipo o mueble del Centro, ¿cuál es su deber reglamentario?',
    options: [
      'Ocultar la herramienta averiada en el fondo de una caja y marcharse sin avisar.',
      'Informar de inmediato al instructor y responder por la reposición o reparación según los mecanismos institucionales vigentes.',
      'Culpar públicamente a los aprendices del turno de la noche.',
      'Exigir que el SENA le compre una máquina nueva para su uso personal.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Muy bien! La ética y responsabilidad civil son pilares del Saber Ser en la Formación Profesional Integral.',
    mistakeAnalysis: 'Identifica la falta: Esconder averías o culpar a terceros agrava la falta disciplinaria de leve a grave por deshonestidad y dolo.',
    regulationBasis: 'Artículo 9, Numeral 12: Cuidar y responder por los bienes, muebles, equipos y materiales asignados para su formación.'
  },
  {
    id: 205,
    sectionId: 'deberes',
    sectionTitle: 'Capítulo III: Deberes Fundamentales y SST',
    articleRef: 'Artículo 9, Numeral 15',
    chapterRef: 'Capítulo III',
    question: 'Respecto al correo electrónico institucional (@misena.edu.co) y la plataforma Zajuna, ¿cuál es el deber del aprendiz?',
    options: [
      'Revisarlos periódicamente, utilizarlos exclusivamente para fines académicos y no compartir sus contraseñas con terceros.',
      'Usar el correo institucional para difundir publicidad comercial ajena y memes.',
      'Cambiar la contraseña cada 3 años y no leer los comunicados oficiales.',
      'Ceder la cuenta a un amigo para que responda los foros en su lugar.'
    ],
    correctIndex: 0,
    positiveReinforcement: '¡Excelente! Los canales Misena y Zajuna son los medios oficiales de notificación jurídica y académica en tu ruta de formación.',
    mistakeAnalysis: 'Error: El correo Misena es un canal institucional auditado; cederlo para suplantación acarrea apertura inmediata de investigación disciplinaria.',
    regulationBasis: 'Artículo 9, Numeral 15: Hacer uso adecuado de los medios de comunicación y plataformas virtuales oficiales provistas por la entidad.'
  },

  // ==========================================
  // SECCIÓN 3: PROHIBICIONES EXPRESAS (CAPÍTULO IV) - 5 PREGUNTAS
  // ==========================================
  {
    id: 301,
    sectionId: 'prohibiciones',
    sectionTitle: 'Capítulo IV: Prohibiciones Expresas',
    articleRef: 'Artículo 10, Numeral 1 y 2',
    chapterRef: 'Capítulo IV',
    question: '¿Qué consecuencia jurídica y formativa acarrea cometer plagio, copia o suplantación en evidencias evaluativas del SENA?',
    options: [
      'Es una práctica normal tolerada si se entrega antes de las 11:59 p.m.',
      'Constituye una infracción grave que vulnera la propiedad intelectual, invalida la evidencia y activa procedimiento disciplinario sancionatorio.',
      'Solo se sanciona si el texto copiado supera las 200 páginas.',
      'El instructor felicita al aprendiz por su habilidad de búsqueda.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Acertaste con contundencia! La honestidad intelectual es sagrada. En el SENA formamos personas íntegras capaces de crear con mérito propio.',
    mistakeAnalysis: 'No te equivoques: Copiar códigos, usar IA sin citar o plagiar proyectos ajenos califica como falta grave con consecuencias en tu hoja de vida.',
    regulationBasis: 'Artículo 10, Numerales 1 y 2: Prohibición expresa de plagio, fraude académico y suplantación de personas en pruebas o evidencias.'
  },
  {
    id: 302,
    sectionId: 'prohibiciones',
    sectionTitle: 'Capítulo IV: Prohibiciones Expresas',
    articleRef: 'Artículo 10, Numeral 8',
    chapterRef: 'Capítulo IV',
    question: '¿Qué estipula el reglamento sobre el ingreso, porte, consumo o distribución de bebidas alcohólicas o sustancias psicoactivas en el Centro?',
    options: [
      'Está estrictamente prohibido en cualquier horario y espacio del SENA, constituyendo una falta GRAVÍSIMA de cancelación de matrícula.',
      'Se permite en zonas verdes durante los recesos los viernes después de las 4:00 p.m.',
      'Está permitido si se traen en envases térmicos cerrados.',
      'Solo está prohibido para instructores, no para los aprendices.'
    ],
    correctIndex: 0,
    positiveReinforcement: '¡Totalmente claro! Los ambientes del SENA son espacios 100% seguros, pedagógicos y libres de alcohol y drogas.',
    mistakeAnalysis: 'Falla crítica: Esta conducta bajo ningún concepto está autorizada; es una causal de expulsión e inhabilidad institucional por hasta 2 años.',
    regulationBasis: 'Artículo 10, Numeral 8: Prohibido ingresar, comercializar o consumir bebidas alcohólicas o sustancias psicoactivas en instalaciones del SENA.'
  },
  {
    id: 303,
    sectionId: 'prohibiciones',
    sectionTitle: 'Capítulo IV: Prohibiciones Expresas',
    articleRef: 'Artículo 10, Numeral 4',
    chapterRef: 'Capítulo IV',
    question: 'Respecto al porte de armas de fuego, cortopunzantes o elementos contundentes, ¿cuál es la prohibición?',
    options: [
      'Se permite portar navajas de bolsillo si se muestran al celador.',
      'Está terminantemente prohibido portar armas de cualquier índole dentro de instalaciones del SENA o en actividades formativas externas.',
      'Solo se prohíbe en la cafetería del Centro.',
      'Se permite si el aprendiz afirma que es para defensa personal.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Muy bien! La seguridad física colectiva es innegociable. El SENA es un territorio de paz, convivencia y reconciliación ciudadana.',
    mistakeAnalysis: 'Error grave: Portar armas dentro del Centro atenta contra la vida comunitaria y transgrede las leyes de convivencia de Colombia.',
    regulationBasis: 'Artículo 10, Numeral 4: Prohibido ingresar o portar armas de fuego o cortopunzantes en el Centro de Formación.'
  },
  {
    id: 304,
    sectionId: 'prohibiciones',
    sectionTitle: 'Capítulo IV: Prohibiciones Expresas',
    articleRef: 'Artículo 10, Numeral 14',
    chapterRef: 'Capítulo IV',
    question: '¿Puede un aprendiz realizar ventas comerciales particulares o rifas dentro del Centro de Formación sin autorización de la Subdirección?',
    options: [
      'Sí, siempre que le comparta un porcentaje de las ganancias al vocero.',
      'No, está expresamente prohibido comercializar productos o realizar rifas no autorizadas en las instalaciones del SENA.',
      'Sí, cualquier aprendiz puede montar una tienda dentro de las aulas.',
      'Solo se prohíbe si el producto es perecedero.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Correcto! Los espacios del SENA están destinados a la formación profesional y el bienestar comunitario, no al comercio informal sin regulación sanitaria y administrativa.',
    mistakeAnalysis: 'Falla: El reglamento prohíbe el comercio informal no autorizado para salvaguardar la higiene, el orden y la concentración académica.',
    regulationBasis: 'Artículo 10, Numeral 14: Prohibición de comercializar productos, rifas o juegos de azar dentro de las instalaciones del SENA sin autorización.'
  },
  {
    id: 305,
    sectionId: 'prohibiciones',
    sectionTitle: 'Capítulo IV: Prohibiciones Expresas',
    articleRef: 'Artículo 10, Numeral 11',
    chapterRef: 'Capítulo IV',
    question: '¿Qué señala el reglamento acerca de alterar o falsificar firmas, listas de asistencia, calificaciones o documentos oficiales del SENA?',
    options: [
      'Es una falta disciplinaria y penal gravísima que da lugar a cancelación inmediata de matrícula y denuncias legales.',
      'Se considera una picardía estudiantil que solo amerita un apretón de manos.',
      'Se permite si el instructor olvidó llevar el lapicero a clase.',
      'Se soluciona fotocopiando el documento dos veces.'
    ],
    correctIndex: 0,
    positiveReinforcement: '¡Brillante! La falsedad documental es además un delito penal en Colombia. El aprendiz SENA actúa siempre con absoluta transparencia.',
    mistakeAnalysis: 'Identifica el error: La falsificación de documentos oficiales destruye la confianza pública y acarrea expulsión e inhabilidad en el sistema nacional.',
    regulationBasis: 'Artículo 10, Numeral 11: Prohibido alterar, falsificar o destruir firmas, calificaciones, documentos o registros académicos del SENA.'
  },

  // ==========================================
  // SECCIÓN 4: TRÁMITES, INASISTENCIAS Y NOVEDADES (CAPÍTULO V) - 5 PREGUNTAS
  // ==========================================
  {
    id: 401,
    sectionId: 'tramites',
    sectionTitle: 'Capítulo V: Trámites, Inasistencias y Novedades',
    articleRef: 'Artículo 22',
    chapterRef: 'Capítulo V',
    question: 'Si un aprendiz presenta una calamidad de salud que le impide asistir, ¿cuántos días hábiles tiene para radicar la incapacidad médica oficial de su EPS?',
    options: [
      'Hasta el último día del año lectivo.',
      'Hasta tres (3) días hábiles siguientes a la ocurrencia del hecho ante el instructor y la coordinación académica.',
      'Quince (15) días calendario después de curarse.',
      'No necesita presentar nada si un amigo le avisa por WhatsApp al profesor.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Perfecto! El plazo de 3 días hábiles con soporte oficial de EPS es la regla de oro para que tus ausencias por salud sean legalmente justificadas.',
    mistakeAnalysis: 'Recuerda: Si dejas pasar más de 3 días hábiles sin radicar la incapacidad EPS, la falta se convierte en inasistencia injustificada no subsanable.',
    regulationBasis: 'Artículo 22: El aprendiz debe justificar sus inasistencias dentro de los tres (3) días hábiles siguientes ante el instructor correspondiente.'
  },
  {
    id: 402,
    sectionId: 'tramites',
    sectionTitle: 'Capítulo V: Trámites, Inasistencias y Novedades',
    articleRef: 'Artículo 21 y 22, Parágrafo',
    chapterRef: 'Capítulo V',
    question: '¿Cuántos días continuos de inasistencia injustificada en formación presencial configuran la causal de Deserción del programa?',
    options: [
      'Veinte (20) días seguidos de inasistencia.',
      'Tres (3) días consecutivos de inasistencia injustificada en formación presencial.',
      'Medio día de retraso al ingreso del Centro.',
      'Solo se deserta si el aprendiz firma una renuncia formal.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Acierto total! 3 días consecutivos de inasistencia sin soporte radicado activan automáticamente el proceso de deserción con reporte al sistema SofiaPlus.',
    mistakeAnalysis: 'Falla clave: Dejar de asistir 3 días seguidos sin aviso formal no es una falta menor, es la causal directa de declaratoria de deserción.',
    regulationBasis: 'Artículo 22, Parágrafo: Se configura deserción cuando el aprendiz acumule tres (3) días consecutivos de inasistencia injustificada.'
  },
  {
    id: 403,
    sectionId: 'tramites',
    sectionTitle: 'Capítulo V: Trámites, Inasistencias y Novedades',
    articleRef: 'Artículo 22',
    chapterRef: 'Capítulo V',
    question: '¿Qué sanción legal conlleva la declaratoria oficial de Deserción en el sistema SofiaPlus?',
    options: [
      'Un llamado de atención verbal y cambio de horario.',
      'Cancelación definitiva de la matrícula e inhabilidad para inscribirse en cualquier oferta del SENA por seis (6) meses a nivel nacional.',
      'Exoneración de pago de transporte.',
      'Pérdida del carné sin consecuencias en SofiaPlus.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Muy bien razonado! La deserción bloquea tu usuario en SofiaPlus en todo el país durante 6 meses. Por eso es vital comunicarse siempre a tiempo.',
    mistakeAnalysis: 'Ojo con el error: La deserción no se queda en el Centro; se registra en SofiaPlus y te inhabilita durante 6 meses para cualquier carrera técnica o curso en Colombia.',
    regulationBasis: 'Artículo 22: La deserción declarada causa la cancelación de matrícula e inhabilidad para matricularse en el SENA por seis (6) meses.'
  },
  {
    id: 404,
    sectionId: 'tramites',
    sectionTitle: 'Capítulo V: Trámites, Inasistencias y Novedades',
    articleRef: 'Artículo 24, Numeral 2',
    chapterRef: 'Capítulo V',
    question: 'Si un aprendiz debe suspender temporalmente sus estudios por maternidad, fuerza mayor demostrada o servicio militar, ¿qué trámite debe radicar en SofiaPlus?',
    options: [
      'Dejar de ir y volver cuando quiera sin avisar a nadie.',
      'Solicitud formal de Aplazamiento de matrícula (hasta por 6 meses prorrogables a 1 año en causales de ley) para proteger su cupo.',
      'Pedir prestado el usuario de otro aprendiz.',
      'Solicitar cambio de nombre en el diploma.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Excelente! El Aplazamiento es la figura legal que congela tu cupo y expediente sin generarte ninguna sanción por deserción.',
    mistakeAnalysis: 'Ten cuidado: Ausentarse sin radicar el trámite formal de Aplazamiento en SofiaPlus resultará en cancelación por deserción.',
    regulationBasis: 'Artículo 24, Numeral 2: El aplazamiento es la solicitud formal radicada por el aprendiz para suspender temporalmente su formación hasta por 6 meses.'
  },
  {
    id: 405,
    sectionId: 'tramites',
    sectionTitle: 'Capítulo V: Trámites, Inasistencias y Novedades',
    articleRef: 'Artículo 24, Numeral 4',
    chapterRef: 'Capítulo V',
    question: '¿Cuál es la diferencia sustancial entre un Retiro Voluntario formal y una Deserción no informada?',
    options: [
      'El Retiro Voluntario se manifiesta por escrito sin sanción de inhabilidad de 6 meses; la deserción es abandono no justificado y acarrea inhabilidad en SofiaPlus.',
      'Son exactamente lo mismo y tienen las mismas sanciones de 2 años de cárcel.',
      'El Retiro Voluntario requiere pagar una multa de 5 salarios mínimos.',
      'La deserción te permite volver a estudiar al día siguiente sin requisitos.'
    ],
    correctIndex: 0,
    positiveReinforcement: '¡Distinción perfecta! Si por motivos mayores no puedes continuar, radica siempre tu Retiro Voluntario en SofiaPlus; las puertas del SENA seguirán abiertas sin sanciones.',
    mistakeAnalysis: 'Identifica la falla: El retiro voluntario formal te protege de la sanción; la deserción por abandono te inhabilita durante seis meses en el sistema.',
    regulationBasis: 'Artículo 24, Numeral 4: El retiro voluntario permite la desvinculación formal del aprendiz sin generar la sanción de inhabilidad propia de la deserción.'
  },

  // ==========================================
  // SECCIÓN 5: FALTAS, MEDIDAS Y SANCIONES (CAPÍTULOS VI Y VII) - 5 PREGUNTAS
  // ==========================================
  {
    id: 501,
    sectionId: 'faltas',
    sectionTitle: 'Capítulos VI y VII: Faltas, Medidas y Sanciones',
    articleRef: 'Artículo 25',
    chapterRef: 'Capítulo VI',
    question: 'Según su naturaleza, ¿cómo se clasifican formalmente las faltas en el Reglamento del Aprendiz SENA?',
    options: [
      'Faltas deportivas y faltas recreativas.',
      'Faltas Académicas (compromiso de aprendizaje y evidencias) y Faltas Disciplinarias (conducta, convivencia y orden).',
      'Faltas matutinas y faltas vespertinas.',
      'Faltas de primer grado y faltas presidenciales.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Correcto! Las académicas se relacionan con las competencias y resultados de aprendizaje; las disciplinarias con la convivencia y el respeto ético.',
    mistakeAnalysis: 'Falla: La clasificación legal del Acuerdo 007 de 2012 es bipartita: faltas académicas y faltas disciplinarias.',
    regulationBasis: 'Artículo 25: Las faltas del aprendiz se clasifican en académicas y disciplinarias.'
  },
  {
    id: 502,
    sectionId: 'faltas',
    sectionTitle: 'Capítulos VI y VII: Faltas, Medidas y Sanciones',
    articleRef: 'Artículo 26',
    chapterRef: 'Capítulo VI',
    question: '¿Bajo qué tres grados de gravedad califica el reglamento las faltas cometidas por un aprendiz?',
    options: [
      'Mínimas, Medianas y Máximas.',
      'Leves, Graves y Gravísimas.',
      'Perdonables, Incompletas y Terminales.',
      'Verbales, Escritas y Judiciales.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Muy bien! La graduación en Leves, Graves o Gravísimas permite aplicar medidas y sanciones proporcionales al daño, dolo o reiteración.',
    mistakeAnalysis: 'Identifica el error: Los términos normativos exactos de calificación en el Acuerdo 007 son Leves, Graves y Gravísimas.',
    regulationBasis: 'Artículo 26: Las faltas académicas y disciplinarias se calificarán como Leves, Graves o Gravísimas.'
  },
  {
    id: 503,
    sectionId: 'faltas',
    sectionTitle: 'Capítulos VI y VII: Faltas, Medidas y Sanciones',
    articleRef: 'Artículo 28',
    chapterRef: 'Capítulo VII',
    question: '¿Qué es un Plan de Mejoramiento formativo y cuál es el plazo máximo reglamentario para su ejecución?',
    options: [
      'Una sanción monetaria con descuento en el banco.',
      'Una medida formativa pedagógica concertada con actividades complementarias y un plazo máximo de hasta treinta (30) días calendario para ser evaluado.',
      'Un castigo físico consistente en correr 10 kilómetros diarios.',
      'Un trámite que se cumple en dos horas de clase.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Gran respuesta! El Plan de Mejoramiento es una oportunidad pedagógica, no un castigo. Te da hasta 30 días para alcanzar la competencia no superada.',
    mistakeAnalysis: 'Ojo con el fallo: El Plan de Mejoramiento busca nivelar pedagógicamente tus competencias, con un plazo formal de hasta 30 días calendario.',
    regulationBasis: 'Artículo 28: El Plan de Mejoramiento es una medida formativa que no puede superar los treinta (30) días calendario para su desarrollo y evaluación.'
  },
  {
    id: 504,
    sectionId: 'faltas',
    sectionTitle: 'Capítulos VI y VII: Faltas, Medidas y Sanciones',
    articleRef: 'Artículo 29, Numeral 1',
    chapterRef: 'Capítulo VII',
    question: '¿En qué consiste la sanción de "Condicionamiento de la Matrícula" dictada mediante acto administrativo motivado?',
    options: [
      'El aprendiz pierde de inmediato y para siempre su derecho a estudiar en Colombia.',
      'Es un llamado de máxima alerta formal: el aprendiz pierde temporalmente beneficios (apoyos, monitorías) y queda bajo seguimiento estricto durante el trimestre.',
      'Se le obliga a cambiarse a otra ciudad obligatoriamente.',
      'Es un permiso especial para faltar a clases.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Muy bien interpretado! El condicionamiento es el último llamado de atención sancionatorio antes de una eventual cancelación definitiva de matrícula.',
    mistakeAnalysis: 'Falla: El condicionamiento no te expulsa del Centro; te mantiene bajo observación rigurosa con pérdida transitoria de estímulos económicos.',
    regulationBasis: 'Artículo 29, Numeral 1: El condicionamiento de la matrícula cesa temporalmente estímulos e incentivos del aprendiz y condiciona su permanencia.'
  },
  {
    id: 505,
    sectionId: 'faltas',
    sectionTitle: 'Capítulos VI y VII: Faltas, Medidas y Sanciones',
    articleRef: 'Artículo 29, Numeral 2',
    chapterRef: 'Capítulo VII',
    question: '¿Quién es la única autoridad institucional facultada para imponer las sanciones de Condicionamiento o Cancelación de Matrícula?',
    options: [
      'Cualquier compañero del salón por votación de manos.',
      'El Subdirector del Centro de Formación mediante Resolución motivada previa recomendación del Comité.',
      'El celador de la puerta principal del Centro.',
      'El administrador del grupo de WhatsApp de la ficha.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Acierto legal perfecto! Ni el instructor ni el coordinador sancionan por sí solos; el Subdirector de Centro es la máxima autoridad que expide la resolución motivada.',
    mistakeAnalysis: 'Error institucional: El Comité solo recomienda; únicamente el Subdirector de Centro ostenta la competencia legal para expedir la resolución sancionatoria.',
    regulationBasis: 'Artículo 29: Las sanciones serán impuestas mediante acto administrativo motivado por el Subdirector del Centro de Formación respectivo.'
  },

  // ==========================================
  // SECCIÓN 6: DEBIDO PROCESO Y COMITÉ DE EVALUACIÓN (CAPÍTULO VIII) - 5 PREGUNTAS
  // ==========================================
  {
    id: 601,
    sectionId: 'debido_proceso',
    sectionTitle: 'Capítulo VIII: Debido Proceso y Comité de Evaluación',
    articleRef: 'Artículo 30 y 31',
    chapterRef: 'Capítulo VIII',
    question: '¿Con qué antelación mínima debe ser citado por escrito un aprendiz para comparecer ante el Comité de Evaluación y Seguimiento?',
    options: [
      'Diez minutos antes de iniciar la sesión por mensaje verbal.',
      'Mínimo con tres (3) días hábiles de anticipación mediante comunicación escrita con especificación de cargos y pruebas.',
      'Un año después de haber cometido la presunta falta.',
      'No se requiere citación previa si el caso es urgente.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Excelente! La citación formal con mínimo 3 días hábiles garantiza el derecho sagrado a la defensa y a preparar pruebas y argumentos con tu vocero.',
    mistakeAnalysis: 'Identifica la falta al debido proceso: Si no te citan por escrito con mínimo 3 días hábiles de antelación, se vicia de nulidad el procedimiento disciplinario.',
    regulationBasis: 'Artículo 31: La comunicación de citación al Comité debe entregarse al aprendiz con mínimo tres (3) días hábiles de antelación a la sesión.'
  },
  {
    id: 602,
    sectionId: 'debido_proceso',
    sectionTitle: 'Capítulo VIII: Debido Proceso y Comité de Evaluación',
    articleRef: 'Artículo 32',
    chapterRef: 'Capítulo VIII',
    question: 'Durante la audiencia del Comité de Evaluación y Seguimiento, ¿cuál es el derecho fundamental del aprendiz citado?',
    options: [
      'Permanecer en silencio y que se le declare culpable automáticamente.',
      'Ser escuchado, rendir su versión libre, aportar pruebas, controvertir cargos y contar con el acompañamiento de su Vocero de Ficha.',
      'Pagar una fianza en efectivo para que archiven el expediente.',
      'Exigir que despidan a los instructores del Centro.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Respuesta brillante! El debido proceso constitucional te ampara: presunción de inocencia, derecho a ser oído y defensa técnica respaldada por tu vocero.',
    mistakeAnalysis: 'No lo olvides: En el Comité nadie puede ser juzgado sin ser escuchado ni sin oportunidad de exhibir sus pruebas de descargo.',
    regulationBasis: 'Artículo 32: En la sesión, el aprendiz tiene derecho a ser escuchado en descargos, presentar pruebas y contar con el vocero de su ficha.'
  },
  {
    id: 603,
    sectionId: 'debido_proceso',
    sectionTitle: 'Capítulo VIII: Debido Proceso y Comité de Evaluación',
    articleRef: 'Artículo 33',
    chapterRef: 'Capítulo VIII',
    question: '¿Cuál es la función jurídica del Comité de Evaluación y Seguimiento frente al caso del aprendiz?',
    options: [
      'Emitir una recomendación motivada colegiada al Subdirector de Centro tras analizar descargos, pruebas y atenuantes.',
      'Arrestar al aprendiz y enviarlo a una celda.',
      'Cambiar el plan de estudios de todo el departamento.',
      'Vender el carné institucional en subasta pública.'
    ],
    correctIndex: 0,
    positiveReinforcement: '¡Muy bien! El comité no sanciona directamente; es un cuerpo colegiado consultivo y pedagógico que recomienda la decisión justa y proporcional al Subdirector.',
    mistakeAnalysis: 'Cuidado con la confusión: El comité emite un acta con recomendación; la sanción definitiva la expide el Subdirector mediante Resolución.',
    regulationBasis: 'Artículo 33: El Comité emite un acta con la recomendación debidamente motivada dirigida al Subdirector del Centro.'
  },
  {
    id: 604,
    sectionId: 'debido_proceso',
    sectionTitle: 'Capítulo VIII: Debido Proceso y Comité de Evaluación',
    articleRef: 'Artículo 34',
    chapterRef: 'Capítulo VIII',
    question: 'Una vez notificada la Resolución del Subdirector que impone una sanción, ¿cuántos días hábiles tiene el aprendiz para interponer el Recurso de Reposición?',
    options: [
      'Un mes completo calendario.',
      'Cinco (5) días hábiles siguientes a la notificación personal del acto administrativo.',
      'Veinticuatro horas exactas en fin de semana.',
      'No existe recurso alguno, la decisión no admite apelación.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Extraordinario! El Recurso de Reposición (5 días hábiles) es tu derecho irrenunciable para solicitar que el Subdirector revise y revoque la sanción.',
    mistakeAnalysis: 'Error de plazo: El plazo legal consagrado en el artículo 34 es de cinco (5) días hábiles; si no lo radicas en ese término, la sanción queda en firme.',
    regulationBasis: 'Artículo 34: Contra el acto administrativo sancionatorio procede el Recurso de Reposición dentro de los cinco (5) días hábiles siguientes a su notificación.'
  },
  {
    id: 605,
    sectionId: 'debido_proceso',
    sectionTitle: 'Capítulo VIII: Debido Proceso y Comité de Evaluación',
    articleRef: 'Artículo 30, Parágrafo',
    chapterRef: 'Capítulo VIII',
    question: '¿Qué ocurre con la sanción impuesta mientras el Subdirector resuelve el Recurso de Reposición radicado oportunamente por el aprendiz?',
    options: [
      'La sanción se aplica con el doble de castigo de inmediato.',
      'La sanción NO queda en firme y se suspende provisionalmente hasta que se resuelva formalmente el recurso.',
      'El aprendiz es expulsado provisionalmente a la calle.',
      'El expediente pasa a la Corte Suprema de Justicia.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Correcto! En virtud del debido proceso, la decisión no adquiere firmeza ni ejecutoriedad mientras esté pendiente de resolver el recurso de reposición.',
    mistakeAnalysis: 'Falla: Hasta tanto no se resuelva de fondo el Recurso de Reposición presentado en término, la sanción no puede ejecutarse en perjuicio del aprendiz.',
    regulationBasis: 'Artículo 34: El recurso de reposición se concederá en efecto suspensivo hasta tanto se expida el acto administrativo que lo resuelva.'
  },

  // ==========================================
  // SECCIÓN 7: REPRESENTATIVIDAD Y VOCERÍA (CAPÍTULO IX) - 5 PREGUNTAS
  // ==========================================
  {
    id: 701,
    sectionId: 'representacion',
    sectionTitle: 'Capítulo IX: Representatividad y Vocería',
    articleRef: 'Artículo 38',
    chapterRef: 'Capítulo IX',
    question: '¿Cuándo y cómo se elige al Vocero de Ficha del grupo de aprendices en el SENA?',
    options: [
      'Es nombrado a dedo por el celador del Centro al final del año.',
      'Por elección democrática y votación secreta o nominal del grupo durante el primer mes de iniciado el programa de formación.',
      'Por rifa o sorteo en la primera semana de vacaciones.',
      'Es el aprendiz con la matrícula más antigua de la sede.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Acierto democrático! La elección del vocero en el primer mes garantiza que cada ficha tenga su líder representante legítimo desde el inicio.',
    mistakeAnalysis: 'Falla: El vocero no es asignado a dedo; es un cargo democrático elegido por mayoría de votos entre los propios aprendices de la ficha.',
    regulationBasis: 'Artículo 38: El vocero de ficha será elegido democráticamente por los aprendices del respectivo grupo dentro del primer mes de formación.'
  },
  {
    id: 702,
    sectionId: 'representacion',
    sectionTitle: 'Capítulo IX: Representatividad y Vocería',
    articleRef: 'Artículo 39, Numeral 4',
    chapterRef: 'Capítulo IX',
    question: '¿Cuál es uno de los roles fundamentales del Vocero de Ficha ante el Comité de Evaluación y Seguimiento?',
    options: [
      'Ser el fiscal acusador que pide expulsar a su compañero.',
      'Acompañar al aprendiz citado, velar por sus garantías del debido proceso y participar en la sesión con voz y voto en la deliberación.',
      'Quedarse afuera cuidando las maletas de los instructores.',
      'Cobrar honorarios al aprendiz para defenderlo.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Impecable! El vocero de ficha es la voz de los aprendices en el comité: vigila que se respete el debido proceso y aporta la perspectiva de los compañeros.',
    mistakeAnalysis: 'Ten presente: El vocero de ficha es un garante de derechos que participa con voz y voto en el Comité, jamás un cómplice ni un enemigo de su compañero.',
    regulationBasis: 'Artículo 39: El vocero asiste a las reuniones del Comité de Evaluación y Seguimiento del Centro con voz y voto en representación de los aprendices.'
  },
  {
    id: 703,
    sectionId: 'representacion',
    sectionTitle: 'Capítulo IX: Representatividad y Vocería',
    articleRef: 'Artículo 40',
    chapterRef: 'Capítulo IX',
    question: '¿Cómo se elige al Representante General de Aprendices del Centro de Formación y qué duración tiene su periodo?',
    options: [
      'Por elección popular de todos los aprendices del Centro matriculados, por un periodo de un (1) año lectivo.',
      'Por decisión unilateral del Subdirector por un periodo de diez años.',
      'Es un cargo hereditario entre familias de aprendices.',
      'Se elige por votación de los directores de empresas privadas.'
    ],
    correctIndex: 0,
    positiveReinforcement: '¡Excelente cultura cívica! El Representante de Centro integra el Comité Directivo de Centro y lidera iniciativas de bienestar y convivencia para todos los aprendices.',
    mistakeAnalysis: 'Falla electoral: El representante de aprendices de Centro es electo democráticamente por sufragio de todos los aprendices para un periodo de un año.',
    regulationBasis: 'Artículo 40: La elección del Representante de Centro se realiza mediante votación universal de los aprendices para un periodo institucional de un año.'
  },
  {
    id: 704,
    sectionId: 'representacion',
    sectionTitle: 'Capítulo IX: Representatividad y Vocería',
    articleRef: 'Artículo 8 y 42',
    chapterRef: 'Capítulo IX',
    question: 'Cuando un aprendiz es seleccionado para representar al SENA en SenaSoft, WorldSkills, torneos deportivos o ferias científicas SENNOVA, ¿qué amparo le otorga la institución?',
    options: [
      'Le ponen faltas injustificadas y le cancelan la matrícula por ausentarse.',
      'Se expide un Acto de Comisión Oficial que justifica plenamente sus ausencias y le concede plazo concertado para nivelar sus evidencias de aprendizaje.',
      'Se le obliga a renunciar a su calidad de aprendiz.',
      'Debe pagar el costo de los tiquetes aéreos de los instructores.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Respuesta de orgullo SENA! Representar a la institución en competencias nacionales e internacionales es un alto honor que goza de comisión oficial y respaldo pedagógico.',
    mistakeAnalysis: 'Falla: La participación en competencias de talento es un estímulo institucional que justifica legalmente las ausencias y brinda plazos de nivelación concertados.',
    regulationBasis: 'Artículo 42: Los aprendices en comisión oficial de representación institucional tendrán justificadas sus inasistencias y derecho a concertar la entrega de evidencias.'
  },
  {
    id: 705,
    sectionId: 'representacion',
    sectionTitle: 'Capítulo IX: Representatividad y Vocería',
    articleRef: 'Artículo 41',
    chapterRef: 'Capítulo IX',
    question: '¿Bajo qué causales reglamentarias puede ser revocado el mandato de un Vocero de Ficha o Representante de Centro?',
    options: [
      'Por teñirse el cabello de un color diferente.',
      'Por bajo rendimiento académico, incumplimiento reiterado de sus funciones, imposición de sanción disciplinaria o renuncia formal voluntaria.',
      'Porque no salude con la mano izquierda.',
      'No puede ser revocado jamás bajo ninguna circunstancia.'
    ],
    correctIndex: 1,
    positiveReinforcement: '¡Cierre perfecto! El liderazgo representativo exige ejemplaridad ética y compromiso académico permanente para mantener la confianza de la comunidad.',
    mistakeAnalysis: 'Falla: El liderazgo SENA exige coherencia moral y académica; incurrir en sanciones o descuidar la formación acarrea la pérdida de la investidura de representación.',
    regulationBasis: 'Artículo 41: La revocatoria del mandato opera por bajo rendimiento, sanción disciplinaria o incumplimiento comprobado de las funciones de vocería.'
  }
];
