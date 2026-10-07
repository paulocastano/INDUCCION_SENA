import { Station, HymnStanza, DilemmaCase, Question, RegulationArticle, DueProcessStep, LearnerProcedure } from '../types/induction';

export const HYMN_STANZAS: HymnStanza[] = [
  {
    number: 0,
    title: 'Coro Oficial',
    lines: [
      'Estudiantes del SENA adelante',
      'por Colombia luchad con amor',
      'con el ánimo noble y radiante',
      'transformémosle el mundo en flor.'
    ],
    context: 'Llamado a la juventud y a la clase trabajadora colombiana a avanzar con alegría, pasión y entrega por la transformación productiva y social del país.'
  },
  {
    number: 1,
    title: 'Primera Estrofa',
    lines: [
      'De la patria el futuro destino,',
      'en las manos del joven está,',
      'el trabajo es seguro camino,',
      'que la paz a Colombia dará.'
    ],
    context: 'Consagra que el verdadero camino a la paz duradera y al progreso nacional se forja mediante el trabajo digno, la educación técnica y el esfuerzo de cada aprendiz.'
  },
  {
    number: 2,
    title: 'Segunda Estrofa',
    lines: [
      'En la forja del SENA se forman,',
      'hombres libres que saben triunfar,',
      'sus impulsos la fuerza transforman,',
      'de la patria que empieza a brillar.'
    ],
    context: 'Define al SENA como un taller o "forja" del ser humano integral: profesionales autónomos, con pensamiento crítico y capaces de liderar el desarrollo.'
  },
  {
    number: 3,
    title: 'Tercera Estrofa',
    lines: [
      'Hoy la patria nos grita sentida,',
      '¡estudiantes del SENA triunfad!',
      'solo así lograréis en la vida,',
      'más justicia, mayor libertad.'
    ],
    context: 'Expresa el clamor colectivo de justicia social y equidad, alcanzadas a través del conocimiento tecnológico y la excelencia formativa.'
  },
  {
    number: 4,
    title: 'Cuarta Estrofa',
    lines: [
      'Avancemos con fuerza guerrera,',
      'estudiantes con firme tesón,',
      'que la patria en nosotros espera,',
      'su más noble y feliz redención.'
    ],
    context: 'Cierre triunfal que reafirma el compromiso cívico de los aprendices con el progreso moral y material de Colombia.'
  }
];

export const SYMBOL_SECTORS = [
  {
    id: 'primario',
    name: 'Sector Primario y Extractivo',
    iconType: 'coffee',
    symbolElement: 'El Café y las Espigas',
    color: 'emerald',
    description: 'Representa el campo colombiano, la agricultura, la ganadería, la silvicultura y los recursos naturales que alimentan y sostienen la nación.',
    impact: 'El SENA capacita campesinos, agropecuarios y técnicos ambientales para tecnificar el agro con sostenibilidad.'
  },
  {
    id: 'secundario',
    name: 'Sector Secundario y Construcción',
    iconType: 'gear',
    symbolElement: 'El Piñón o Rueda Dentada',
    color: 'amber',
    description: 'Simboliza la industria manufacturera, la metalmecánica, la transformación de materias primas, la construcción y la infraestructura.',
    impact: 'Forma la fuerza técnica que mueve las plantas industriales, las fábricas y las grandes obras de ingeniería del país.'
  },
  {
    id: 'terciario',
    name: 'Sector Terciario y Servicios',
    iconType: 'caduceus',
    symbolElement: 'El Caduceo del Conocimiento',
    color: 'sky',
    description: 'Representa el comercio, las tecnologías de la información, el turismo, la salud, la gestión empresarial y los servicios modernos.',
    impact: 'Prepara el talento digital, logístico y de servicios que conecta a Colombia con la economía global del siglo XXI.'
  }
];

export const SENA_VALUES = [
  {
    name: 'Respeto',
    tagline: 'Reconocimiento de la dignidad humana',
    detail: 'Aceptamos y valoramos la diversidad ideológica, étnica, de género y de capacidades de cada compañero e instructor en todos los ambientes de aprendizaje.'
  },
  {
    name: 'Libre Pensamiento y Actitud Crítica',
    tagline: 'Autonomía intelectual con criterio reflexivo',
    detail: 'Promovemos el debate argumentado, la formulación de preguntas constructivas y la búsqueda constante de la verdad basada en el conocimiento.'
  },
  {
    name: 'Liderazgo',
    tagline: 'Capacidad de inspirar e impulsar el cambio',
    detail: 'El aprendiz SENA asume la iniciativa frente a problemáticas comunitarias e industriales, proponiendo soluciones audaces y colaborativas.'
  },
  {
    name: 'Solidaridad',
    tagline: 'Empatía y vocación de ayuda mutua',
    detail: 'Construimos comunidad apoyando a compañeros en dificultad académica, socioeconómica o personal, entendiendo el éxito como un logro colectivo.'
  },
  {
    name: 'Justicia y Equidad',
    tagline: 'Imparcialidad y oportunidades para todos',
    detail: 'Garantizamos que cada persona reciba un trato digno y acceso transparente a los beneficios y deberes de la formación pública.'
  },
  {
    name: 'Transparencia',
    tagline: 'Honestidad en la acción académica y laboral',
    detail: 'Actuamos con rectitud en evaluaciones, proyectos y manejo de recursos, combatiendo el fraude, la copia y la deshonestidad.'
  },
  {
    name: 'Creatividad e Innovación',
    tagline: 'Mentalidad curiosa aplicada a soluciones reales',
    detail: 'Transformamos retos cotidianos en prototipos, modelos de negocio o mejoras productivas a través del ecosistema SENNOVA y el trabajo en equipo.'
  }
];

export const PRODUCTIVE_STAGE_ALTERNATIVES = [
  {
    id: 'contrato_aprendizaje',
    title: 'Contrato de Aprendizaje',
    badge: 'Modalidad Más Frecuente',
    description: 'Vinculación formativa con una empresa patrocinadora regulada por la Ley 789 de 2002. La empresa otorga un apoyo de sostenimiento mensual (mínimo 75% o 100% de 1 SMMLV en lectiva/productiva según desempleo nacional) más afiliación a EPS y ARL.',
    duration: 'Hasta 6 meses de etapa productiva',
    bestFor: 'Aprendices que buscan inserción directa en el sector productivo formal con respaldo legal.'
  },
  {
    id: 'vinculo_laboral',
    title: 'Vínculo Laboral o Contractual',
    badge: 'Para Trabajadores Activos',
    description: 'Aplica si el aprendiz ya labora en una empresa desempeñando funciones estrictamente relacionadas y coherentes con las competencias del programa de formación.',
    duration: '6 meses certificados por la empresa',
    bestFor: 'Aprendices que cursan formación nocturna o mixta y ya cuentan con empleo en su área técnica.'
  },
  {
    id: 'proyecto_productivo',
    title: 'Proyecto Productivo / Fondo Emprender',
    badge: 'Ruta Emprendedora',
    description: 'Desarrollo de una unidad productiva propia, plan de negocio o emprendimiento asesorado por el Centro de Desarrollo Empresarial (SBDC) y con acceso potencial a capital semilla de Fondo Emprender.',
    duration: 'Acreditación de hitos del proyecto',
    bestFor: 'Aprendices con vocación innovadora y deseos de fundar su propia empresa o cooperativa.'
  },
  {
    id: 'pasantia',
    title: 'Pasantía Empresarial o Institucional',
    badge: 'Sector Social y Público',
    description: 'Práctica concertada con entidades estatales, ONG, fundaciones o empresas, donde el aprendiz apoya procesos específicos. Requiere concertación y afiliación a ARL cubierta por la entidad o el SENA.',
    duration: 'Mínimo 864 horas reglamentarias',
    bestFor: 'Proyectos de impacto comunitario, entidades del Estado o instituciones sin ánimo de lucro.'
  },
  {
    id: 'monitoria',
    title: 'Monitoría en el SENA',
    badge: 'Mérito Académico',
    description: 'Los aprendices con rendimiento académico sobresaliente apoyan procesos técnicos, pedagógicos o tecnológicos en los laboratorios y centros de formación del SENA, recibiendo un estímulo económico reglamentario.',
    duration: 'Según convocatoria del centro',
    bestFor: 'Aprendices destacados con vocación pedagógica, técnica y de investigación aplicada.'
  }
];

export const REGULATION_CASES: DilemmaCase[] = [
  {
    id: 1,
    title: 'Inasistencia imprevista por quebranto de salud e incapacidad médica',
    category: 'salud',
    badge: 'Urgencia Médica',
    situation: 'Camilo presentó una urgencia médica y estuvo incapacitado durante 3 días hábiles. El médico de su EPS le entregó la constancia oficial. ¿Cuál es el procedimiento reglamentario que debe seguir Camilo según el Acuerdo 007 de 2012?',
    options: [
      {
        text: 'Esperar a que termine el trimestre y entregar todas las justificaciones juntas en la coordinación académica.',
        isCorrect: false,
        feedback: 'Incorrecto. Dejar pasar el tiempo sin avisar genera reportes de inasistencia injustificada y puede derivar en deserción automática tras 3 días continuos.',
        regulationRef: 'Artículo 22, Reglamento del Aprendiz'
      },
      {
        text: 'Radicar la incapacidad médica ante su instructor y coordinador dentro de los tres (3) días hábiles siguientes a la ocurrencia del hecho.',
        isCorrect: true,
        feedback: '¡Correcto! El aprendiz dispone de hasta tres (3) días hábiles siguientes al hecho para radicar la incapacidad oficial expedida por la EPS, solicitando concertar la entrega de evidencias pendientes.',
        regulationRef: 'Artículo 22, Parágrafo 1 - Trámite de justificación de inasistencias'
      },
      {
        text: 'Pedirle a un compañero que le firme la asistencia en las planillas del instructor para no perder la clase.',
        isCorrect: false,
        feedback: 'Incorrecto. Suplantar o falsificar firmas es una falta disciplinaria GRAVÍSIMA que acarrea cancelación inmediata de matrícula.',
        regulationRef: 'Artículo 10, Numeral 2 - Prohibiciones graves'
      }
    ]
  },
  {
    id: 2,
    title: 'Uso y porte obligatorio del carné institucional y prendas de seguridad',
    category: 'convivencia',
    badge: 'Seguridad y Acceso',
    situation: 'Al llegar a la portería del Centro de Formación, Valentina nota que olvidó su carné del SENA en casa y tiene prácticas de taller de mecatrónica. ¿Qué principios rigen el ingreso y porte de elementos de identificación y seguridad?',
    options: [
      {
        text: 'El carné es de uso obligatorio, visible, personal e intransferible. En talleres, además, se debe ingresar con los Elementos de Protección Personal (EPP) reglamentarios.',
        isCorrect: true,
        feedback: '¡Exacto! El carné garantiza la seguridad de la comunidad SENA, permite el control de acceso y préstamo de bienes. Los EPP protegen la vida en ambientes productivos.',
        regulationRef: 'Artículo 9, Numerales 1 y 14 - Deberes del Aprendiz y SST'
      },
      {
        text: 'Prestar el carné de un amigo que ya esté adentro para burlar el torniquete y entrar al taller sin gafas ni botas.',
        isCorrect: false,
        feedback: 'Falso y peligroso. Prestar o usar documentos ajenos es falta disciplinaria grave, e ingresar sin EPP infringe las normas de Seguridad y Salud en el Trabajo.',
        regulationRef: 'Artículo 10 - Prohibiciones expresas'
      },
      {
        text: 'El carné solo es necesario para reclamar refrigerio escolar o votar por vocero, no para estar en el centro.',
        isCorrect: false,
        feedback: 'Falso. El carné debe portarse de manera permanente y visible durante toda la permanencia en las instalaciones del SENA o sedes alternas.',
        regulationRef: 'Artículo 9 - Deberes'
      }
    ]
  },
  {
    id: 3,
    title: 'Evidencia técnica en Zajuna, honestidad intelectual y uso de IA',
    category: 'academico',
    badge: 'Propiedad Intelectual',
    situation: 'Sebastián debe entregar el informe de desarrollo de software en la plataforma Zajuna. Encontró un repositorio con un proyecto muy similar y utilizó una herramienta de IA generativa para redactar las conclusiones. ¿Cómo debe proceder éticamente?',
    options: [
      {
        text: 'Copiar el proyecto, cambiar la portada y entregar como si fuera autoría 100% propia sin citar fuentes.',
        isCorrect: false,
        feedback: 'Grave error. El plagio y la apropiación no autorizada violan los derechos de autor y constituyen falta académica y disciplinaria grave según el reglamento.',
        regulationRef: 'Artículo 10, Numeral 5 - Plagio y fraude intelectual'
      },
      {
        text: 'Referenciar adecuadamente las fuentes consultadas bajo normas de citación, explicar qué partes apoyó la IA de forma transparente y desarrollar el análisis y código propio requerido.',
        isCorrect: true,
        feedback: '¡Excelente! La honestidad intelectual y la transparencia son pilares del valor institucional SENA. La tecnología es una herramienta de apoyo, no un reemplazo de tus competencias.',
        regulationRef: 'Principio ético de Transparencia y Propiedad Intelectual SENA'
      },
      {
        text: 'Pagarle a un profesional externo para que realice la entrega de Zajuna desde su cuenta de aprendiz.',
        isCorrect: false,
        feedback: 'Incorrecto. Esto infringe las normas de evaluación y niega el desarrollo de competencias, constituyendo fraude en plataforma.',
        regulationRef: 'Artículo 10 - Prohibiciones'
      }
    ]
  },
  {
    id: 4,
    title: 'Formalización de Contrato de Aprendizaje y Patrocinio',
    category: 'contrato',
    badge: 'Ley 789 de 2002',
    situation: 'Mariana recibió una propuesta de contrato de aprendizaje de una empresa multinacional mientras aún está en etapa lectiva. ¿Cuáles son las reglas legales que debe verificar?',
    options: [
      {
        text: 'Firmar inmediatamente sin avisar al SENA y abandonar las clases del centro para ir a la empresa a tiempo completo.',
        isCorrect: false,
        feedback: 'Incorrecto. Durante la etapa lectiva el contrato contempla dedicación al estudio con apoyo del 50% de 1 SMMLV, y debe registrarse formalmente ante la coordinación del centro.',
        regulationRef: 'Ley 789 de 2002 y Acuerdo 007 de 2012'
      },
      {
        text: 'Verificar que esté habilitada en el sistema Caprendizaje (SGVA), que las funciones correspondan al perfil del programa y concertar el registro previo ante la coordinación de etapa productiva.',
        isCorrect: true,
        feedback: '¡Correcto! El contrato de aprendizaje es una forma especial del derecho laboral formativo: solo se puede suscribir uno por nivel formativo, debe alinearse a las competencias del programa y registrarse en Caprendizaje.',
        regulationRef: 'Artículo 12 y Ley 789 de 2002 - Sistema Caprendizaje'
      },
      {
        text: 'Firmar dos contratos de aprendizaje simultáneos con dos empresas diferentes para recibir doble apoyo económico.',
        isCorrect: false,
        feedback: 'Prohibido por ley. Está expresamente prohibido suscribir más de un contrato de aprendizaje al mismo tiempo; genera anulación y reporte legal.',
        regulationRef: 'Régimen de Contrato de Aprendizaje SENA'
      }
    ]
  },
  {
    id: 5,
    title: 'Convocatoria SenaSoft, WorldSkills y Semilleros SENNOVA',
    category: 'innovacion',
    badge: 'Representación Oficial',
    situation: 'Daniel fue seleccionado por su Centro de Formación para competir en el evento nacional tecnológico SenaSoft en otra ciudad durante 4 días hábiles. ¿Cómo se maneja su asistencia a las sesiones del programa regular?',
    options: [
      {
        text: 'Sus instructores deben colocarle fallas injustificadas y cancelarle la matrícula por inasistencia prolongada.',
        isCorrect: false,
        feedback: 'Falso. La representación institucional es un derecho y honor formativo que cuenta con pleno respaldo normativo.',
        regulationRef: 'Artículo 8, Numeral 3 - Estímulos e incentivos'
      },
      {
        text: 'La Subdirección expide un acto de permiso institucional y comisión pedagógica; sus fallas se justifican automáticamente y se le brinda plazo para concertar la entrega de evidencias.',
        isCorrect: true,
        feedback: '¡Exacto! El SENA estimula la excelencia y la innovación. Quienes representan a la entidad en SenaSoft, WorldSkills, torneos deportivos o culturales gozan de permiso oficial y acompañamiento.',
        regulationRef: 'Artículo 8 y 22 - Justificación por representación institucional'
      },
      {
        text: 'El aprendiz debe pagarle a un suplente para que asista a clases en el centro mientras él compite.',
        isCorrect: false,
        feedback: 'Totalmente absurdo e ilegal dentro de la normativa formativa.',
        regulationRef: 'Reglamento del Aprendiz'
      }
    ]
  },
  {
    id: 6,
    title: 'Fuerza mayor imprevista: Solicitud de Aplazamiento vs Deserción',
    category: 'salud',
    badge: 'Novedades de Matrícula',
    situation: 'Andrea debe someterse a una intervención quirúrgica compleja con un periodo de rehabilitación de 4 meses que le impide continuar las clases. ¿Qué trámite reglamentario debe radicar en SofiaPlus?',
    options: [
      {
        text: 'Dejar de asistir sin comunicar nada al SENA y esperar a que el sistema la retire por inasistencia.',
        isCorrect: false,
        feedback: 'Grave error. Incurriría en Deserción, lo cual acarrea una sanción de inhabilidad de seis (6) meses en SofiaPlus para volver a inscribirse en el SENA.',
        regulationRef: 'Artículo 22, Numeral 4 - Deserción e inhabilidad'
      },
      {
        text: 'Radicar formalmente la novedad de "Aplazamiento" por razones de salud o fuerza mayor a través de SofiaPlus con los soportes médicos anexos.',
        isCorrect: true,
        feedback: '¡Muy bien! El Aplazamiento permite congelar el cupo hasta por un tiempo máximo de seis (6) meses (prorrogable en casos médicos excepcionales o servicio militar) sin perder el avance ni generar sanciones.',
        regulationRef: 'Artículo 21 - Trámite de Aplazamiento y Novedades'
      },
      {
        text: 'Exigir que le entreguen el título de tecnólogo inmediatamente sin culminar los trimestres restantes.',
        isCorrect: false,
        feedback: 'Imposible. La certificación exige cumplir la totalidad de resultados de aprendizaje de la etapa lectiva y productiva.',
        regulationRef: 'Artículo 14 - Requisitos de certificación'
      }
    ]
  },
  {
    id: 7,
    title: 'Citación formal al Comité de Evaluación y Seguimiento',
    category: 'debido_proceso',
    badge: 'Garantía Constitucional',
    situation: 'Mateo recibió una comunicación escrita citándolo a sesión del Comité de Evaluación y Seguimiento por presunto bajo rendimiento reiterado. ¿Qué garantías asisten a Mateo en esta instancia?',
    options: [
      {
        text: 'Debe ser notificado con mínimo tres (3) días hábiles de anticipación, tiene derecho a ser escuchado, presentar pruebas, controvertir cargos y estar acompañado por el Vocero de su ficha.',
        isCorrect: true,
        feedback: '¡Correcto! El debido proceso constitucional garantiza el derecho a la defensa y contradicción. El Vocero de ficha tiene voz y voto en el comité para velar por los derechos del aprendiz.',
        regulationRef: 'Capítulo VIII, Artículos 30 al 34 - Debido Proceso'
      },
      {
        text: 'El comité sesiona en secreto y Mateo es expulsado sin enterarse de cuáles fueron los motivos del llamado.',
        isCorrect: false,
        feedback: 'Violatorio de la ley. En el SENA está proscrita cualquier decisión arbitraria o sin audiencia previa de descargos.',
        regulationRef: 'Artículo 30 - Principios del Debido Proceso'
      },
      {
        text: 'Mateo debe contratar un abogado penalista particular o no se le permitirá hablar en la reunión.',
        isCorrect: false,
        feedback: 'Incorrecto. La instancia es de carácter formativo-administrativo; el aprendiz se representa a sí mismo y es respaldado por su vocero estudiantil.',
        regulationRef: 'Artículo 32 - Integración del Comité'
      }
    ]
  },
  {
    id: 8,
    title: 'Doble contratación o terminación unilateral de Contrato de Aprendizaje',
    category: 'contrato',
    badge: 'Régimen Contractual',
    situation: 'Un aprendiz en etapa productiva tiene dificultades de trato con su jefe inmediato en la empresa patrocinadora y decide no volver más a la empresa de un día para otro sin avisar. ¿Qué consecuencias genera?',
    options: [
      {
        text: 'Ninguna consecuencia, el aprendiz puede empezar en otra empresa al día siguiente sin ningún trámite.',
        isCorrect: false,
        feedback: 'Falso. El abandono injustificado del puesto de trabajo faculta a la empresa para terminar el contrato por justa causa, lo cual reporta incumplimiento en Caprendizaje.',
        regulationRef: 'Artículo 13 y Régimen de Etapa Productiva'
      },
      {
        text: 'Debe informar de inmediato a su instructor de seguimiento de etapa productiva y a la coordinación del Centro para realizar una mediación formal antes de cualquier decisión unilateral.',
        isCorrect: true,
        feedback: '¡Exacto! El SENA cuenta con instructores de seguimiento para mediar ante situaciones complejas con la empresa patrocinadora y velar por el cumplimiento del plan formativo.',
        regulationRef: 'Guía de Etapa Productiva SENA y Resolución de Controversias'
      },
      {
        text: 'Demandar a la empresa ante la Corte Internacional sin notificar al SENA.',
        isCorrect: false,
        feedback: 'No corresponde a los conductos regulares establecidos.',
        regulationRef: 'Normativa SENA'
      }
    ]
  },
  {
    id: 9,
    title: 'Incumplimiento reiterado de un Plan de Mejoramiento formativo',
    category: 'academico',
    badge: 'Medidas Formativas',
    situation: 'A Felipe se le otorgó un Plan de Mejoramiento pedagógico de 30 días para recuperar dos competencias no aprobadas. Cumplido el plazo, Felipe no presentó ninguna de las evidencias acordadas. ¿Cuál es el paso a seguir según el reglamento?',
    options: [
      {
        text: 'El instructor aprueba automáticamente las competencias para evitarle molestias administrativas al aprendiz.',
        isCorrect: false,
        feedback: 'Falso. El instructor no puede certificar competencias que no han sido demostradas con evidencias reales.',
        regulationRef: 'Modelo Pedagógico Institucional FPI'
      },
      {
        text: 'El instructor elabora un informe motivado remitiendo el caso a la Coordinación Académica para que se convoque al Comité de Evaluación y Seguimiento.',
        isCorrect: true,
        feedback: '¡Correcto! Cuando no se supera el Plan de Mejoramiento, el instructor remite el caso al Comité para que determine medidas como el condicionamiento o la cancelación de la matrícula.',
        regulationRef: 'Artículo 28, Parágrafo - Seguimiento a Planes de Mejoramiento'
      },
      {
        text: 'Felipe debe reiniciar el programa desde el primer día de inducción sin importar que vaya en el último trimestre.',
        isCorrect: false,
        feedback: 'El comité evalúa el caso específico y determina la medida proporcional según el debido proceso.',
        regulationRef: 'Artículo 29 - Sanciones y medidas'
      }
    ]
  },
  {
    id: 10,
    title: 'Porte o consumo de sustancias y respeto a la convivencia',
    category: 'convivencia',
    badge: 'Falta Gravísima',
    situation: 'Durante el receso en una sede del SENA, un grupo de aprendices ingresa bebidas alcohólicas al centro en envases térmicos. ¿Qué tipo de falta constituye esta conducta según el Acuerdo 007 de 2012?',
    options: [
      {
        text: 'Es una falta leve que se soluciona barriendo el patio del centro durante 15 minutos.',
        isCorrect: false,
        feedback: 'Incorrecto. El ingreso, porte o consumo de bebidas embriagantes o sustancias psicoactivas en el centro es una falta disciplinaria GRAVÍSIMA.',
        regulationRef: 'Artículo 10, Numeral 8 y Artículo 26 - Calificación de faltas'
      },
      {
        text: 'Es una falta disciplinaria gravísima que inicia de inmediato procedimiento sancionatorio y puede ocasionar la Cancelación de la Matrícula con inhabilidad de hasta 2 años.',
        isCorrect: true,
        feedback: '¡Muy claro! El SENA promueve ambientes sanos, seguros y libres de adicciones. Las faltas gravísimas comprometen la permanencia inmediata en la institución.',
        regulationRef: 'Artículo 26 y 29 - Faltas Gravísimas y Cancelación de Matrícula'
      },
      {
        text: 'Está permitido los días viernes después de las 4:00 p.m. con permiso verbal de los compañeros.',
        isCorrect: false,
        feedback: 'Totalmente falso. La prohibición rige 24 horas al día, 365 días al año en todas las sedes del SENA.',
        regulationRef: 'Artículo 10 - Prohibiciones expresas'
      }
    ]
  }
];

export const REGULATION_ARTICLES: RegulationArticle[] = [
  {
    article: 'Artículo 7',
    chapter: 'Capítulo II',
    title: 'Derechos del Aprendiz SENA',
    category: 'derechos',
    content: 'El aprendiz tiene derecho a recibir formación profesional integral de calidad, acorde con el programa matriculado; hacer uso de los recursos físicos, tecnológicos, bibliográficos y didácticos del Centro; recibir inducción oportuna; contar con la póliza de seguro de accidentes personales 24/7; ser escuchado y respetado en su dignidad personal; y disfrutar de los beneficios del Plan de Bienestar al Aprendiz.',
    keyRule: 'Educación pública gratuita de calidad y acompañamiento integral en el Ser, Saber y Saber Hacer.',
    practicalTip: 'Tienes derecho a que tus evaluaciones sean retroalimentadas en un plazo máximo de 8 días hábiles tras la entrega en Zajuna.'
  },
  {
    article: 'Artículo 8',
    chapter: 'Capítulo II',
    title: 'Estímulos e Incentivos al Aprendiz',
    category: 'derechos',
    content: 'Los aprendices destacados pueden acceder a estímulos por su rendimiento académico, liderazgo, investigación e innovación, tales como: designación como monitor de Centro con apoyo económico; postulación a apoyos de sostenimiento regular o FIC; participación en eventos tecnológicos y científicos como SenaSoft, WorldSkills y semilleros SENNOVA; y reconocimiento en cuadro de honor.',
    keyRule: 'El mérito académico y la vocación innovadora abren puertas a estímulos y pasantías.',
    practicalTip: 'Pregunta en la coordinación por las convocatorias semestrales de Monitorías y semilleros de investigación SENNOVA.'
  },
  {
    article: 'Artículo 9',
    chapter: 'Capítulo III',
    title: 'Deberes del Aprendiz SENA',
    category: 'deberes',
    content: 'Son deberes del aprendiz: Asistir puntualmente a todas las actividades programadas en el horario asignado; portar permanentemente y en lugar visible el carné institucional; acatar las normas de Seguridad y Salud en el Trabajo (SST) y usar la dotación y EPP correspondientes; justificar debidamente las inasistencias dentro de los 3 días hábiles siguientes; cuidar los bienes, equipos y muebles del Centro; y mantener un trato respetuoso hacia instructores, directivos, compañeros y comunidad.',
    keyRule: 'El carné visible y la puntualidad son la carta de presentación de la disciplina técnica SENA.',
    practicalTip: 'Si te enfermas, tramita de inmediato la incapacidad ante la EPS y envíala a tu instructor y coordinación antes de que pasen 3 días hábiles.'
  },
  {
    article: 'Artículo 10',
    chapter: 'Capítulo IV',
    title: 'Prohibiciones Expresas del Aprendiz',
    category: 'prohibiciones',
    content: 'Está expresamente prohibido al aprendiz: Cometer plagio o copia total o parcial en evidencias evaluativas; suplantar o permitir ser suplantado en actividades presenciales o virtuales; portar armas de cualquier índole; ingresar, comercializar o consumir bebidas alcohólicas o sustancias psicoactivas en el Centro; alterar o falsificar firmas, calificaciones o documentos oficiales; comercializar productos dentro del Centro sin autorización; y cualquier conducta que atente contra la integridad moral o física de la comunidad.',
    keyRule: 'Cero tolerancia con el plagio, la suplantación, las sustancias y la falsedad documental.',
    practicalTip: 'Siempre cita tus fuentes bibliográficas. El uso indebido de IA o copiar códigos sin atribución califica como fraude intelectual.'
  },
  {
    article: 'Artículo 21 y 22',
    chapter: 'Capítulo V',
    title: 'Trámites de Inasistencias y Deserción',
    category: 'tramites',
    content: 'Las inasistencias deben ser justificadas dentro de los tres (3) días hábiles siguientes ante el instructor y coordinador. Se considera Deserción cuando el aprendiz acumule tres (3) días consecutivos de inasistencia injustificada en formación presencial, o cuando no ingrese a la plataforma virtual por más de 10 días continuos sin causa justificada. La deserción declarada genera la cancelación de la matrícula y una inhabilidad para inscribirse en programas del SENA por seis (6) meses.',
    keyRule: 'Máximo 3 días hábiles para radicar justificantes médicos de EPS. 3 faltas continuas sin aviso = Deserción.',
    practicalTip: 'Comunícate siempre con tu vocero de ficha o instructor ante cualquier imprevisto; nunca abandones el proceso en silencio.'
  },
  {
    article: 'Artículo 24',
    chapter: 'Capítulo V',
    title: 'Novedades del Aprendiz: Traslado, Aplazamiento y Retiro',
    category: 'tramites',
    content: 'El aprendiz puede solicitar novedades a través del sistema SofiaPlus: 1. Traslado de Centro o de Jornada (por cambio comprobado de domicilio o empleo, previa disponibilidad de cupo); 2. Aplazamiento de matrícula (hasta por 6 meses por motivos de salud, maternidad, calamidad o servicio militar); 3. Reingreso (solicitado un mes antes de vencerse el aplazamiento); 4. Retiro Voluntario (manifestación escrita del aprendiz para desvincularse sin sanciones de deserción).',
    keyRule: 'El Aplazamiento protege tu cupo hasta por 6 meses (prorrogable en casos legales).',
    practicalTip: 'El retiro voluntario formal te permite postularte nuevamente en el futuro sin la inhabilidad de 6 meses que genera la deserción.'
  },
  {
    article: 'Artículo 25 y 26',
    chapter: 'Capítulo VI',
    title: 'Clasificación y Calificación de Faltas',
    category: 'faltas',
    content: 'Las faltas se clasifican en Académicas (relacionadas con el compromiso formativo, evidencias y resultados de aprendizaje) y Disciplinarias (relacionadas con el comportamiento, convivencia y orden institucional). Se califican como Leves, Graves o Gravísimas, evaluando criterios como: grado de culpabilidad (dolo o culpa), reiteración de la conducta, daño causado a personas o bienes, y antecedentes disciplinarios.',
    keyRule: 'Las faltas gravísimas conducen directamente a la Cancelación de Matrícula.',
    practicalTip: 'El daño intencional a maquinaria o redes informáticas del SENA es considerado falta grave o gravísima.'
  },
  {
    article: 'Artículo 27 y 28',
    chapter: 'Capítulo VII',
    title: 'Medidas Formativas y Planes de Mejoramiento',
    category: 'faltas',
    content: 'Las medidas formativas buscan corregir conductas sin carácter sancionatorio punitivo: 1. Llamado de atención verbal reflexivo; 2. Llamado de atención por escrito con copia a la hoja de vida del aprendiz; 3. Plan de Mejoramiento pedagógico o disciplinario: acuerdo formativo concertado con actividades complementarias y un plazo máximo de ejecución de hasta treinta (30) días calendario para ser evaluado.',
    keyRule: 'El Plan de Mejoramiento es tu oportunidad pedagógica de recuperar competencias y nivelarte.',
    practicalTip: 'Firma y cumple rigurosamente los compromisos del Plan de Mejoramiento; de lo contrario, el caso pasará al Comité.'
  },
  {
    article: 'Artículo 29',
    chapter: 'Capítulo VII',
    title: 'Sanciones Reglamentarias',
    category: 'faltas',
    content: 'Cuando la gravedad de la falta o el incumplimiento reiterado lo ameriten, el Subdirector de Centro puede imponer sanciones mediante Acto Administrativo motivado: 1. Condicionamiento de la matrícula (pérdida temporal de beneficios como monitorías y apoyos, bajo seguimiento estricto); 2. Cancelación de la matrícula: pérdida definitiva del cupo con inhabilidad de seis (6) meses a dos (2) años para inscribirse en cualquier oferta del SENA.',
    keyRule: 'La cancelación de matrícula acarrea inhabilidad en el sistema SofiaPlus a nivel nacional.',
    practicalTip: 'El condicionamiento de matrícula es la última advertencia antes de la cancelación definitiva.'
  },
  {
    article: 'Artículo 30 al 34',
    chapter: 'Capítulo VIII',
    title: 'Debido Proceso y Comité de Evaluación y Seguimiento',
    category: 'debido_proceso',
    content: 'Garantiza el derecho constitucional a la presunción de inocencia y a la defensa. El Comité de Evaluación y Seguimiento se reúne previa citación escrita con al menos 3 días hábiles de antelación. En la sesión participan el Coordinador Académico, instructores, el Vocero de Ficha del aprendiz y un delegado de Bienestar. El aprendiz presenta sus descargos y pruebas. El Comité emite una recomendación motivada al Subdirector, quien expide la resolución. Contra esta procede el Recurso de Reposición dentro de los cinco (5) días hábiles siguientes a la notificación.',
    keyRule: 'Ningún aprendiz puede ser sancionado sin haber sido citado y escuchado con todas las garantías de ley.',
    practicalTip: 'El Vocero de tu ficha debe acompañarte a la sesión del Comité y velar porque se respeten tus derechos.'
  },
  {
    article: 'Artículo 38 al 42',
    chapter: 'Capítulo IX',
    title: 'Representatividad y Liderazgo de Aprendices',
    category: 'representacion',
    content: 'Los aprendices participan democráticamente en la vida institucional a través de: 1. Vocero de Ficha (elegido por votación del grupo en el primer mes, sirve de puente con instructores y asiste con voz y voto al Comité); 2. Líder de Programa; 3. Representante General de Aprendices del Centro (elegido por votación universal anual, participa en el Comité Directivo de Centro y lidera iniciativas de bienestar).',
    keyRule: 'La democracia estudiantil del SENA te da voz y voto en las decisiones del Centro.',
    practicalTip: 'Postúlate a la vocería de tu ficha para desarrollar habilidades de liderazgo y vocación de servicio comunitario.'
  }
];

export const DUE_PROCESS_STEPS: DueProcessStep[] = [
  {
    step: 1,
    phase: 'Etapa 1: Notificación de la Queja o Informe',
    title: 'Radicación del Informe de Novedad',
    timeLimit: 'Dentro de los 5 días posteriores al hecho',
    actors: ['Instructor', 'Coordinador Académico', 'Quejoso'],
    description: 'El instructor o integrante de la comunidad que identifica una presunta falta académica o disciplinaria elabora un informe detallado con exposición clara de los hechos, fechas, antecedentes y soportes probatorios anexos, radicándolo ante la Coordinación.',
    apprenticeRights: 'El informe debe estar fundamentado en hechos objetivos y verificables, no en apreciaciones subjetivas.'
  },
  {
    step: 2,
    phase: 'Etapa 2: Citación Formal y Escrita',
    title: 'Citación con Plazo Reglamentario',
    timeLimit: 'Mínimo tres (3) días hábiles de anticipación',
    actors: ['Coordinador Académico', 'Aprendiz Citado', 'Vocero de Ficha'],
    description: 'La coordinación notifica formalmente al aprendiz vía correo institucional Misena y físico. La citación debe especificar con precisión la presunta falta cometida, las normas infringidas del Acuerdo 007, las pruebas que obran en su contra y la fecha, hora y lugar de la audiencia.',
    apprenticeRights: 'Derecho a conocer con antelación suficiente todos los cargos y pruebas para preparar sus argumentos y solicitar acompañamiento de su vocero.'
  },
  {
    step: 3,
    phase: 'Etapa 3: Audiencia de Descargos y Pruebas',
    title: 'Sesión del Comité de Evaluación y Seguimiento',
    timeLimit: 'Día y hora señalados en la citación',
    actors: ['Aprendiz', 'Vocero de Ficha', 'Instructores', 'Coordinador', 'Bienestar'],
    description: 'En sesión formal, el Comité da lectura a los hechos. El aprendiz ejerce su derecho a ser escuchado, rinde su versión libre, presenta pruebas (certificados médicos, testimonios, capturas, evidencias técnicas) y contradice los testimonios en su contra con el respaldo del vocero de grupo.',
    apprenticeRights: 'Derecho a no autoincriminarse, a ser tratado con respeto, a que se escuchen sus justificaciones y a que el vocero defienda sus garantías.'
  },
  {
    step: 4,
    phase: 'Etapa 4: Deliberación y Acta Motivada',
    title: 'Emisión de Recomendación al Subdirector',
    timeLimit: 'Dentro de los 3 días hábiles siguientes a la sesión',
    actors: ['Miembros del Comité de Evaluación'],
    description: 'El comité evalúa colegiadamente la gravedad de la falta, atenuantes (buena conducta previa, confesión, reparación espontánea) y agravantes. Elabora un acta motivada recomendando: archivo del caso, medida formativa (Plan de mejoramiento) o sanción (condicionamiento o cancelación).',
    apprenticeRights: 'La recomendación del comité debe ser colegiada, imparcial y guardar estricta proporcionalidad con los hechos demostrados.'
  },
  {
    step: 5,
    phase: 'Etapa 5: Acto Administrativo y Recurso',
    title: 'Resolución y Recurso de Reposición',
    timeLimit: 'Cinco (5) días hábiles para interponer recurso',
    actors: ['Subdirector de Centro', 'Aprendiz'],
    description: 'El Subdirector de Centro expide la Resolución motivada que acoge o modifica la recomendación y la notifica personalmente. Si el aprendiz no está de acuerdo, tiene derecho legal a interponer por escrito el Recurso de Reposición en los 5 días hábiles siguientes para que la decisión sea reconsiderada.',
    apprenticeRights: 'Derecho irrenunciable al Recurso de Reposición. La sanción no queda en firme hasta que dicho recurso sea resuelto formalmente.'
  }
];

export const LEARNER_PROCEDURES: LearnerProcedure[] = [
  {
    id: 'incapacidad',
    title: 'Trámite de Incapacidad Médica y Excusas',
    category: 'incapacidad',
    badge: 'Máximo 3 Días Hábiles',
    triggerCondition: 'Urgencia médica, enfermedad general comprobada, cita médica especializada o calamidad de salud.',
    deadlines: 'Radicación dentro de los tres (3) días hábiles siguientes a la ocurrencia del hecho.',
    steps: [
      '1. Acude a tu EPS o entidad de salud adscrita y solicita el certificado oficial de incapacidad médica con sello y firma del médico tratante.',
      '2. Escanea el certificado médico e ingresa al correo institucional Misena para redactar la justificación formal.',
      '3. Envía el correo con copia al Instructor Técnico de la competencia y al Coordinador Académico del programa dentro de los 3 días hábiles.',
      '4. Solicita a tus instructores la concertación de un plan de nivelación para entregar evidencias o presentar evaluaciones que hayan tenido lugar durante tu ausencia.',
      '5. Conserva el soporte radicado en tu archivo personal hasta la finalización del trimestre.'
    ],
    regulationRef: 'Acuerdo 007 de 2012, Artículo 22, Parágrafo 1',
    legalTip: 'Las recetas médicas o simples constancias de asistencia a consulta no son incapacidades, salvo que el médico prescriba reposo explícito en días.'
  },
  {
    id: 'contrato',
    title: 'Gestión y Reglas del Contrato de Aprendizaje',
    category: 'contrato',
    badge: 'Ley 789 de 2002',
    triggerCondition: 'Selección por parte de una empresa patrocinadora o postulación a vacantes en Caprendizaje (SGVA).',
    deadlines: 'Registro previo y aval de la coordinación antes de iniciar labores en la empresa.',
    steps: [
      '1. Mantén actualizado tu perfil y hoja de vida en el aplicativo Caprendizaje (caprendizaje.sena.edu.co).',
      '2. Cuando una empresa te seleccione, verifica que las funciones a desempeñar correspondan 100% al perfil del programa técnico o tecnólogo.',
      '3. Suscribe la minuta del Contrato de Aprendizaje asegurando que incluya: apoyo de sostenimiento (mínimo legal vigente), afiliación a EPS y ARL.',
      '4. Radica la copia firmada del contrato ante la Coordinación de Etapa Productiva del Centro para que te asignen tu instructor de seguimiento.',
      '5. Diligencia periódicamente las bitácoras quincenales y agenda las 3 visitas de seguimiento concertadas con tu instructor y jefe inmediato.'
    ],
    regulationRef: 'Ley 789 de 2002 y Acuerdo 007 de 2012, Artículo 12',
    legalTip: 'Recuerda que solo se puede celebrar un único Contrato de Aprendizaje por nivel de formación (un contrato para Técnico, un contrato para Tecnólogo).'
  },
  {
    id: 'aplazamiento',
    title: 'Solicitud Formal de Aplazamiento de Matrícula',
    category: 'aplazamiento',
    badge: 'Hasta 6 Meses Prorrogables',
    triggerCondition: 'Calamidad doméstica grave, maternidad, intervención quirúrgica prolongada, o prestación del servicio militar.',
    deadlines: 'Radicación antes de acumular 3 inasistencias consecutivas para evitar deserción.',
    steps: [
      '1. Reúne los soportes documentales que acrediten la causa de fuerza mayor (historia clínica, acta de defunción, orden de reclutamiento militar, etc.).',
      '2. Ingresa a la plataforma SofiaPlus con tu rol de Aprendiz y navega al menú "Gestión de Novedades del Aprendiz".',
      '3. Selecciona la opción "Crear Novedad", tipo "Aplazamiento", adjunta la carta motivada y los soportes en PDF.',
      '4. El Comité de Centro evaluará la solicitud y emitirá respuesta oficial en un plazo estimado de 10 días hábiles.',
      '5. Al acercarse el cumplimiento del plazo (mínimo 30 días antes), radica la novedad de "Reingreso" para reincorporarte al siguiente trimestre formativo.'
    ],
    regulationRef: 'Acuerdo 007 de 2012, Artículo 24, Numeral 2',
    legalTip: 'El aplazamiento no te penaliza. Te permite congelar tus resultados de aprendizaje alcanzados y regresar sin perder lo estudiado.'
  },
  {
    id: 'senasoft',
    title: 'Participación en SenaSoft, WorldSkills y Semilleros',
    category: 'senasoft',
    badge: 'Permiso Institucional',
    triggerCondition: 'Selección en olimpiadas técnicas, maratones de desarrollo, concursos de innovación o proyectos SENNOVA.',
    deadlines: 'Trámite con antelación mínima de 5 días hábiles al evento.',
    steps: [
      '1. El instructor líder del semillero o proyecto postula al equipo de aprendices ante la Coordinación y Subdirección.',
      '2. La Subdirección de Centro expide un Acto Administrativo de Comisión o Permiso Institucional por Representación.',
      '3. Se notifica a todos los instructores de las competencias que el aprendiz estará en representación oficial con justificación plena de asistencia.',
      '4. El aprendiz participa en el certamen (SenaSoft, WorldSkills nacional, Expociencia, torneos deportivos institucionales).',
      '5. Al retornar, el aprendiz cuenta con un plazo concertado de hasta 10 días para nivelar y presentar las evidencias de la semana.'
    ],
    regulationRef: 'Acuerdo 007 de 2012, Artículo 8, Numeral 3 y Artículo 22',
    legalTip: 'Los aprendices que representan al SENA en certámenes nacionales o internacionales adquieren puntajes de mérito para monitorías y pasantías.'
  },
  {
    id: 'traslado',
    title: 'Solicitud de Traslado de Centro o de Jornada',
    category: 'traslado',
    badge: 'Cambio de Domicilio / Empleo',
    triggerCondition: 'Mudanza comprobada a otra ciudad o departamento, o incompatibilidad de jornada laboral demostrada con contrato.',
    deadlines: 'Radicación antes del cierre del trimestre en curso.',
    steps: [
      '1. Verifica que hayas aprobado satisfactoriamente todos los resultados de aprendizaje del trimestre anterior.',
      '2. Consulta si el Centro de destino cuenta con el mismo programa de formación y disponibilidad de cupo en la ficha correspondiente.',
      '3. Redacta la solicitud dirigida al Subdirector del Centro actual explicando la causa y adjuntando soportes de traslado o contrato laboral.',
      '4. Ambas coordinaciones de Centro revisan la compatibilidad del plan formativo y autorizan el traslado en el sistema SofiaPlus.',
      '5. Preséntate en el Centro receptor con tu documento y paz y salvo para legalizar la matrícula en el nuevo grupo.'
    ],
    regulationRef: 'Acuerdo 007 de 2012, Artículo 24, Numeral 1',
    legalTip: 'El traslado está sujeto a la disponibilidad de cupo en el Centro de destino y a que el diseño curricular sea equivalente.'
  },
  {
    id: 'voceria',
    title: 'Postulación a Vocero de Ficha y Líder de Aprendices',
    category: 'voceria',
    badge: 'Democracia Estudiantil',
    triggerCondition: 'Convocatoria democrática durante las primeras 4 semanas de inicio del programa de formación.',
    deadlines: 'Elección durante el primer mes de formación.',
    steps: [
      '1. Postúlate voluntariamente ante tu grupo de formación durante la jornada de elección orientada por Bienestar al Aprendiz.',
      '2. Presenta tus propuestas de liderazgo, mediación, comunicación asertiva y apoyo solidario a los compañeros.',
      '3. La ficha vota democráticamente y se levanta el Acta de Elección de Vocero de Ficha Principal y Suplente.',
      '4. Participa en los talleres de inducción al liderazgo ofrecidos por Bienestar al Aprendiz del Centro.',
      '5. Cumple tu rol asistiendo con voz y voto a las sesiones del Comité de Evaluación y Seguimiento cuando citen a integrantes de tu ficha.'
    ],
    regulationRef: 'Acuerdo 007 de 2012, Artículos 38 al 42',
    legalTip: 'Ser vocero de ficha desarrolla tu perfil de liderazgo, oratoria y resolución de conflictos, y otorga méritos destacados en tu hoja de vida SENA.'
  }
];

export const INDUCTION_STATIONS: Station[] = [
  {
    id: 1,
    number: '01',
    title: 'Origen, Identidad y Misión',
    category: 'Historia y Fundamentos',
    shortDesc: 'Descubre las raíces del SENA en 1957 con Rodolfo Martínez Tono, su misión como motor social y los 7 valores que guían a cada aprendiz.',
    estimatedMinutes: 8,
    interactiveType: 'symbols',
    topics: [
      {
        id: 'historia',
        title: 'Nacimiento del SENA (1957)',
        summary: 'Fruto de la visión tripartita entre trabajadores, empresarios y el Estado colombiano.',
        content: [
          'El Servicio Nacional de Aprendizaje (SENA) nació el 21 de junio de 1957 bajo el Decreto Ley 118, gracias a la iniciativa visionaria del economista cartagenero Rodolfo Martínez Tono.',
          'Su creación respondió a un pacto social histórico entre las organizaciones sindicales (UTC y CTC), los gremios empresariales (especialmente la ANDI) y el Gobierno Nacional.',
          'El objetivo fundacional sigue vivo hoy: brindar a los trabajadores colombianos formación técnica gratuita y de alta calidad para dignificar sus vidas y modernizar la economía del país.'
        ],
        keyHighlight: 'Fundado el 21 de Junio de 1957 por Rodolfo Martínez Tono.'
      },
      {
        id: 'mision_vision',
        title: 'Misión y Visión Institucional',
        summary: 'Compromiso inquebrantable con el desarrollo humano y la productividad de Colombia.',
        content: [
          'Misión: El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.',
          'Visión: El SENA será una organización de conocimiento para todos los colombianos, innovando permanentemente en sus procesos formativos y de intermediación laboral para responder con pertinencia a las demandas del mercado global.'
        ],
        keyHighlight: 'Educación 100% gratuita, incluyente y sin intermediarios.'
      },
      {
        id: 'valores',
        title: 'Los 7 Valores Éticos del SENA',
        summary: 'El ADN moral que orienta el comportamiento de instructores, directivos y aprendices.',
        content: [
          'La formación en el SENA no solo transmite habilidades técnicas: forja seres humanos íntegros guiados por Respeto, Libre Pensamiento, Liderazgo, Solidaridad, Justicia y Equidad, Transparencia y Creatividad.',
          'Cada aprendiz representa a la entidad tanto en los ambientes formativos como en su vida ciudadana y laboral.'
        ],
        keyHighlight: 'Formar en el Ser, el Saber y el Saber Hacer.'
      }
    ],
    quiz: [
      {
        id: 101,
        question: '¿En qué año y por iniciativa de quién fue fundado el Servicio Nacional de Aprendizaje (SENA)?',
        options: [
          'En 1980 por el Ministerio de Educación Nacional.',
          'El 21 de junio de 1957 por iniciativa del doctor Rodolfo Martínez Tono.',
          'En 1948 durante la creación de la OEA.',
          'En 1991 junto a la nueva Constitución Política.'
        ],
        correctIndex: 1,
        explanation: 'El SENA fue fundado el 21 de junio de 1957 por Rodolfo Martínez Tono mediante el Decreto Ley 118.'
      },
      {
        id: 102,
        question: '¿Qué sectores conformaron la alianza histórica tripartita que dio origen al SENA?',
        options: [
          'Exclusivamente la banca privada internacional.',
          'Únicamente el ejército y la policía nacional.',
          'Los trabajadores organizados, los empresarios (ANDI) y el Estado colombiano.',
          'Colegios privados y universidades extranjeras.'
        ],
        correctIndex: 2,
        explanation: 'El SENA nació del acuerdo tripartito entre trabajadores sindicales, empresarios y el Estado.'
      }
    ]
  },
  {
    id: 2,
    number: '02',
    title: 'Símbolos Patrios e Himno',
    category: 'Mística Institucional',
    shortDesc: 'Explora en detalle el Escudo con sus 3 sectores productivos, la Bandera blanca, el Isotipo del Caminante y aprende el Himno oficial del SENA.',
    estimatedMinutes: 10,
    interactiveType: 'hymn',
    topics: [
      {
        id: 'escudo',
        title: 'El Escudo Institucional y los 3 Sectores',
        summary: 'Reflejo heráldico de la economía colombiana y su interdependencia productiva.',
        content: [
          'El Escudo del SENA sintetiza la matriz productiva nacional en tres elementos fundamentales:',
          '1. Sector Primario (Agrícola y Extractivo): Representado por el grano de café y las espigas doradas.',
          '2. Sector Secundario (Industria y Construcción): Simbolizado por la rueda dentada o piñón industrial.',
          '3. Sector Terciario (Comercio y Servicios): Encarnado en el caduceo alado, emblema de la comunicación, el intercambio y el saber.'
        ],
        keyHighlight: 'Los tres sectores integrados generan la riqueza y bienestar de Colombia.'
      },
      {
        id: 'bandera_logo',
        title: 'La Bandera y el Isotipo del Caminante',
        summary: 'Paz, esperanza y el aprendiz avanzando decididamente hacia el porvenir.',
        content: [
          'La Bandera: De fondo blanco inmaculado, representa la paz, la serenidad y la reconciliación social que la educación genera en Colombia, con el escudo en verde institucional en su centro.',
          'El Isotipo (Logotipo): La silueta estilizada de un ser humano erguido dando un paso firme hacia adelante sobre un sendero. Representa al aprendiz como protagonista de su propio destino, avanzando hacia el horizonte de oportunidades que el conocimiento abre para él y su familia.'
        ],
        keyHighlight: 'El aprendiz siempre es el centro del proceso formativo.'
      },
      {
        id: 'himno',
        title: 'El Himno del SENA: Canto a la Esperanza',
        summary: 'Composición de Luis Alfredo Sánchez y música de Daniel Marlez.',
        content: [
          'El Himno del SENA se entona solemnemente en todos los actos institucionales con profundo respeto cívico.',
          'Sus estrofas invitan a la juventud trabajadora a "transformarle el mundo en flor" a Colombia a través de la forja del estudio riguroso, la solidaridad y la justicia social.'
        ],
        keyHighlight: '¡Estudiantes del SENA adelante, por Colombia luchad con amor!'
      }
    ],
    quiz: [
      {
        id: 201,
        question: '¿Qué representa la rueda dentada (piñón) en el Escudo oficial del SENA?',
        options: [
          'El sector agrícola y cafetero.',
          'El sector industrial, manufacturero y de la construcción.',
          'Las finanzas y el sector bancario.',
          'Los medios de transporte marítimo.'
        ],
        correctIndex: 1,
        explanation: 'El piñón o rueda dentada simboliza el sector secundario: la industria y la construcción.'
      },
      {
        id: 202,
        question: '¿Qué simboliza la figura humana caminando (isotipo) en el logotipo del SENA?',
        options: [
          'Un deportista corriendo una maratón internacional.',
          'El aprendiz como protagonista que avanza con firmeza hacia su futuro profesional sobre un sendero de oportunidades.',
          'Un peatón cruzando una vía pública.',
          'La señal de salida de emergencia del centro.'
        ],
        correctIndex: 1,
        explanation: 'Simboliza al aprendiz que camina erguido hacia el horizonte de superación y progreso personal y colectivo.'
      }
    ]
  },
  {
    id: 3,
    number: '03',
    title: 'Ruta Formativa FPI y Ecosistema Digital',
    category: 'Metodología y Plataformas',
    shortDesc: 'Aprende cómo funciona la Formación Profesional Integral (FPI), la Etapa Lectiva, las 5 alternativas de Etapa Productiva y plataformas como Zajuna y SofiaPlus.',
    estimatedMinutes: 12,
    interactiveType: 'stages',
    topics: [
      {
        id: 'fpi',
        title: 'Formación Profesional Integral (FPI)',
        summary: 'Enfoque pedagógico basado en competencias laborales.',
        content: [
          'La FPI articula tres dimensiones inseparables en cada sesión de formación:',
          '• Saber (Conocimiento teórico, principios científicos y normativos).',
          '• Saber Hacer (Habilidades técnicas, manejo de herramientas, destreza práctica en talleres y laboratorios).',
          '• Saber Ser (Valores éticos, trabajo en equipo, empatía, resiliencia y responsabilidad social).'
        ],
        keyHighlight: 'Aprender haciendo: proyectos reales orientados a solucionar retos del entorno.'
      },
      {
        id: 'etapas',
        title: 'Las Dos Etapas del Programa de Formación',
        summary: 'Etapa Lectiva + Etapa Productiva.',
        content: [
          '1. Etapa Lectiva: Desarrollo estructurado de competencias en aulas, talleres y entornos virtuales.',
          '2. Etapa Productiva (6 meses): Aplicación real de los conocimientos en contextos laborales, empresariales o comunitarios.',
          'Existen 5 alternativas reglamentadas: Contrato de Aprendizaje, Vínculo Laboral, Proyecto Productivo / Fondo Emprender, Pasantía y Monitoría institucional.'
        ],
        keyHighlight: 'Ningún aprendiz se gradúa sin culminar y certificar exitosamente su etapa productiva.'
      },
      {
        id: 'plataformas',
        title: 'Ecosistema de Plataformas Digitales SENA',
        summary: 'Herramientas esenciales durante toda tu trayectoria.',
        content: [
          '• SofiaPlus (www.senasofiaplus.edu.co): Portal de gestión académica, matrícula, consulta de notas y descarga de certificados.',
          '• Zajuna LMS (zajuna.sena.edu.co): Ambiente virtual de aprendizaje donde interactúas con guías de aprendizaje, foros y subes tus evidencias.',
          '• Correo Institucional Misena: Tu canal oficial de comunicación con instructores y directivos.',
          '• Biblioteca Digital SENA: Millones de libros técnicos, bases de datos científicas e investigaciones accesibles sin costo.'
        ],
        keyHighlight: 'Zajuna es tu aula virtual; SofiaPlus es tu secretaría académica digital.'
      }
    ],
    quiz: [
      {
        id: 301,
        question: '¿Cuáles son las tres dimensiones inseparables que componen la Formación Profesional Integral (FPI) del SENA?',
        options: [
          'Memorizar, repetir y examinar.',
          'Saber, Saber Hacer y Saber Ser.',
          'Comprar, vender y comercializar.',
          'Teoría básica, examen parcial y examen final.'
        ],
        correctIndex: 1,
        explanation: 'La FPI integra el Saber (conocimiento), Saber Hacer (destreza técnica) y Saber Ser (actitud y ética humana).'
      },
      {
        id: 302,
        question: '¿Cuánto tiempo dura habitualmente la Etapa Productiva en los programas técnicos y tecnólogos del SENA?',
        options: [
          '1 semana de inducción.',
          'Seis (6) meses continuos bajo una alternativa reglamentaria aprobada.',
          'Dos años completos sin descanso.',
          'Es optativa y no se requiere para graduarse.'
        ],
        correctIndex: 1,
        explanation: 'La etapa productiva dura 6 meses y es un requisito obligatorio e indispensable para la titulación.'
      }
    ]
  },
  {
    id: 4,
    number: '04',
    title: 'Reglamento del Aprendiz y Convivencia',
    category: 'Normativa y Ética',
    shortDesc: 'Conoce tus derechos, deberes, prohibiciones, clasificación de faltas y el debido proceso garantizado en el Acuerdo 007 de 2012.',
    estimatedMinutes: 12,
    interactiveType: 'cases',
    topics: [
      {
        id: 'derechos_estimulos',
        title: 'Capítulo II: Derechos y Estímulos del Aprendiz',
        summary: 'Educación pública gratuita, seguro médico 24/7 y oportunidades de mérito.',
        content: [
          'El Artículo 7 consagra el derecho inalienable a recibir Formación Profesional Integral gratuita y de excelencia, acceder a laboratorios, bibliotecas y herramientas digitales (Zajuna), recibir inducción y disfrutar de los programas de Bienestar al Aprendiz.',
          'Todo aprendiz cuenta con una Póliza de Seguro de Accidentes Personales activa las 24 horas del día, los 7 días de la semana durante las etapas lectiva y productiva sin ningún costo.',
          'El Artículo 8 establece estímulos por alto desempeño: designación como Monitor de Centro con retribución económica, participación en semilleros SENNOVA y postulación prioritaria a apoyos de sostenimiento.'
        ],
        keyHighlight: 'Póliza médica gratuita 24/7 y retroalimentación evaluativa en máximo 8 días.'
      },
      {
        id: 'deberes_convivencia',
        title: 'Capítulo III: Deberes Fundamentales y SST',
        summary: 'Compromiso cívico, puntualidad, porte del carné y bioseguridad en ambientes.',
        content: [
          'El Artículo 9 estipula como deber permanente asistir puntualmente a todas las jornadas formativas y portar el carné institucional visible e intransferible en toda sede del SENA.',
          'En talleres, laboratorios y plantas de producción es obligatorio cumplir las normas de Seguridad y Salud en el Trabajo (SST) y portar los Elementos de Protección Personal (EPP).',
          'Es deber ineludible radicar las justificaciones de inasistencia dentro de los tres (3) días hábiles siguientes al hecho, así como cuidar y preservar los equipos tecnológicos del Estado.'
        ],
        keyHighlight: 'Carné visible y EPP en talleres: seguridad y disciplina técnica.'
      },
      {
        id: 'prohibiciones_eticas',
        title: 'Capítulo IV: Prohibiciones Expresas y Propiedad Intelectual',
        summary: 'Límites innegociables para garantizar la convivencia, la ética y la transparencia.',
        content: [
          'El Artículo 10 prohíbe categóricamente el plagio, la copia o el fraude en evidencias de aprendizaje, así como la suplantación de identidad en plataformas presenciales o virtuales como Zajuna.',
          'Está terminantemente prohibido el porte de armas, el ingreso, comercialización o consumo de bebidas alcohólicas o sustancias psicoactivas en cualquier instalación del SENA.',
          'Asimismo, se prohíbe alterar calificaciones, falsificar firmas en listas de asistencia, comercializar productos sin autorización y cualquier acto de discriminación o violencia física o verbal.'
        ],
        keyHighlight: 'Cero tolerancia al plagio y al ingreso de sustancias en ambientes de formación.'
      },
      {
        id: 'tramites_novedades',
        title: 'Capítulo V: Novedades, Incapacidades Médicas y Aplazamiento',
        summary: 'Conducto regular para justificar ausencias, congelar cupos o cambiar de centro.',
        content: [
          'Incapacidades Médicas (Art. 22): Se deben radicar ante el instructor y la coordinación en un plazo improrrogable de hasta tres (3) días hábiles con el soporte expedido por la EPS.',
          'Deserción: Acumular tres (3) días consecutivos de inasistencia injustificada o diez (10) días continuos sin ingresar al LMS genera cancelación de matrícula e inhabilidad de 6 meses en SofiaPlus.',
          'Novedades de Matrícula (Art. 24): El aprendiz puede solicitar Aplazamiento por fuerza mayor (hasta por 6 meses prorrogables a 1 año en servicio militar o calamidad), Traslado de Centro o Jornada, o Retiro Voluntario formal.'
        ],
        keyHighlight: 'Radica incapacidades médicas en máximo 3 días hábiles para evitar reportes de deserción.'
      },
      {
        id: 'contrato_productiva',
        title: 'Contrato de Aprendizaje y Etapa Productiva (Ley 789 de 2002)',
        summary: 'Relación formativa-empresarial, exclusividad de contrato y apoyos económicos.',
        content: [
          'El Contrato de Aprendizaje es una vinculación formativa especial regulada por la Ley 789 de 2002, donde la empresa patrocinadora brinda apoyo de sostenimiento mensual más afiliación a EPS y ARL.',
          'Regla de Exclusividad: Un aprendiz solo puede celebrar UN contrato de aprendizaje por nivel de formación (uno para técnico, uno para tecnólogo).',
          'Toda empresa y alternativa debe ser concertada y avalada previamente por la Coordinación de Etapa Productiva del Centro antes de comenzar labores para garantizar el seguimiento legal.'
        ],
        keyHighlight: 'Solo un Contrato de Aprendizaje por nivel y aval previo obligatorio del Centro.'
      },
      {
        id: 'faltas_sanciones',
        title: 'Capítulo VI y VII: Clasificación de Faltas, Medidas y Sanciones',
        summary: 'Graduación de faltas (Leves, Graves, Gravísimas) y medidas pedagógicas.',
        content: [
          'Las faltas son Académicas (incumplimiento formativo) o Disciplinarias (conducta y convivencia). Se califican como Leves, Graves o Gravísimas según el dolo, reiteración y daño.',
          'Medidas Formativas (pedagógicas): Llamado de atención verbal, llamado de atención escrito, y Plan de Mejoramiento concertado con plazo de hasta 30 días calendario.',
          'Sanciones Reglamentarias: Impuestas por el Subdirector de Centro: Condicionamiento de matrícula (pérdida temporal de beneficios) o Cancelación de Matrícula (pérdida de cupo con inhabilidad de 6 meses a 2 años).'
        ],
        keyHighlight: 'El Plan de Mejoramiento dura hasta 30 días para recuperar competencias pendientes.'
      },
      {
        id: 'debido_proceso',
        title: 'Capítulo VIII: Debido Proceso y Comité de Evaluación',
        summary: 'Garantía constitucional: citación previa, descargos, pruebas y recurso de reposición.',
        content: [
          'El Artículo 30 consagra la presunción de inocencia y el debido proceso. Para sesionar, el Comité debe citar al aprendiz por escrito con mínimo tres (3) días hábiles de antelación.',
          'En la audiencia, el aprendiz tiene derecho a ser escuchado, presentar pruebas (documentos, justificaciones, testimonios) y estar acompañado por su Vocero de Ficha.',
          'Una vez el Subdirector expide la resolución motivada, el aprendiz cuenta con cinco (5) días hábiles tras la notificación personal para interponer el Recurso de Reposición si no está conforme.'
        ],
        keyHighlight: 'Citación con mínimo 3 días hábiles de anticipación y 5 días para apelar con Recurso de Reposición.'
      },
      {
        id: 'representatividad',
        title: 'Capítulo IX: Vocería de Ficha y Representación en SenaSoft/SENNOVA',
        summary: 'Democracia estudiantil y permisos institucionales por talento destacado.',
        content: [
          'Vocero de Ficha: Elegido democráticamente en el primer mes de formación, actúa como mediador de su grupo y participa con voz y voto en las sesiones del Comité de Evaluación y Seguimiento.',
          'Representante de Centro: Elegido por votación universal de todos los aprendices del centro para integrar el Comité Directivo de Centro.',
          'Representación Institucional: Los aprendices que compiten en SenaSoft, WorldSkills, ferias científicas SENNOVA o juegos deportivos cuentan con Acto de Comisión Oficial que justifica automáticamente sus ausencias.'
        ],
        keyHighlight: 'Los participantes en SenaSoft y WorldSkills cuentan con permiso institucional oficial.'
      }
    ],
    quiz: [
      {
        id: 401,
        question: '¿Cuántos días hábiles tiene un aprendiz para radicar una incapacidad médica expedida por su EPS ante el instructor y coordinador?',
        options: [
          'Hasta un mes después de ocurrida la falta.',
          'Hasta tres (3) días hábiles siguientes a la ocurrencia del hecho con el soporte correspondiente.',
          'No se permite justificar bajo ninguna circunstancia.',
          'El último día del trimestre académico.'
        ],
        correctIndex: 1,
        explanation: 'El Acuerdo 007 de 2012 estipula un plazo perentorio de máximo 3 días hábiles para justificar inasistencias con soporte médico oficial.'
      },
      {
        id: 402,
        question: '¿Con qué antelación mínima debe ser citado por escrito un aprendiz para una audiencia del Comité de Evaluación y Seguimiento?',
        options: [
          '10 minutos antes de la reunión por mensaje informal.',
          'Mínimo con tres (3) días hábiles de anticipación, conociendo los hechos y con derecho al acompañamiento de su vocero.',
          'No se requiere citación previa en ningún caso.',
          'Seis meses antes de iniciar el trimestre.'
        ],
        correctIndex: 1,
        explanation: 'El debido proceso garantiza citación escrita con al menos 3 días hábiles de antelación para que el aprendiz prepare descargos y pruebas junto a su vocero.'
      },
      {
        id: 403,
        question: '¿Qué consecuencia normativa genera la declaración de Deserción por 3 días consecutivos de inasistencia injustificada?',
        options: [
          'Una felicitación formal en el cuadro de honor.',
          'Cancelación de la matrícula e inhabilidad para inscribirse en programas del SENA durante seis (6) meses en SofiaPlus.',
          'Un aumento automático del subsidio de sostenimiento.',
          'Traslado obligatorio a otro centro de formación.'
        ],
        correctIndex: 1,
        explanation: 'La deserción declarada extingue la matrícula e impone una sanción de inhabilidad de 6 meses en el sistema nacional SofiaPlus.'
      },
      {
        id: 404,
        question: '¿Cuántos contratos de aprendizaje puede suscribir legalmente una persona por cada nivel de formación técnica o tecnológica?',
        options: [
          'Tantos como desee de manera simultánea.',
          'Únicamente un (1) solo contrato de aprendizaje por nivel de formación (Ley 789 de 2002).',
          'Tres contratos en etapa lectiva y cuatro en productiva.',
          'El contrato de aprendizaje no está regulado por la ley colombiana.'
        ],
        correctIndex: 1,
        explanation: 'La Ley 789 de 2002 consagra el principio de exclusividad: solo se puede celebrar un único contrato de aprendizaje por nivel de formación.'
      }
    ]
  },
  {
    id: 5,
    number: '05',
    title: 'Bienestar al Aprendiz y Oportunidades',
    category: 'Beneficios y Crecimiento',
    shortDesc: 'Accede a las 9 dimensiones de bienestar: apoyos de sostenimiento, monitorías, póliza de accidentes, deportes, cultura y semilleros SENNOVA.',
    estimatedMinutes: 8,
    interactiveType: 'wellness',
    topics: [
      {
        id: 'dimensiones',
        title: 'Las 9 Dimensiones de Bienestar',
        summary: 'Acompañamiento holístico para evitar la deserción y potenciar tu talento.',
        content: [
          '1. Salud integral y prevención de riesgos.',
          '2. Deporte y recreación (Juegos Nacionales SENA, torneos internos).',
          '3. Arte y cultura (grupos de danza, teatro, música y pintura).',
          '4. Liderazgo y habilidades socioemocionales.',
          '5. Acompañamiento psicosocial y consejería estudiantil.',
          '6. Equidad, inclusión y diversidad.',
          '7. Apoyo socioeconómico (subsidios de transporte/alimentación según disponibilidad).',
          '8. Convivencia y permanencia educativa.',
          '9. Promoción de la comunidad de egresados.'
        ],
        keyHighlight: 'El bienestar acompaña tu proyecto de vida de principio a fin.'
      },
      {
        id: 'apoyos_economicos',
        title: 'Apoyos de Sostenimiento y Beneficios',
        summary: 'Incentivos reales para garantizar tu permanencia formativa.',
        content: [
          '• Apoyos de Sostenimiento Regular: Subsidio mensual para aprendices en condiciones de vulnerabilidad socioeconómica (estratos 1 y 2).',
          '• Apoyos de Sostenimiento FIC (Fondo de la Industria de la Construcción): Específico para aprendices del área de edificación y obras civiles.',
          '• Póliza Estudiantil contra Accidentes: Cobertura médica gratuita las 24 horas del día, los 7 días de la semana, durante tu etapa lectiva y productiva.',
          '• Monitorías Académicas: Oportunidad de ser monitor y recibir estímulo económico mensual.'
        ],
        keyHighlight: 'Póliza médica de accidentes 24/7 sin ningún costo para el aprendiz.'
      },
      {
        id: 'sennova',
        title: 'Investigación Aplicada: Ecosistema SENNOVA',
        summary: 'Innovación tecnológica, semilleros y patentes colombianas.',
        content: [
          'SENNOVA (Sistema de Investigación, Innovación y Desarrollo Tecnológico del SENA) te permite participar en semilleros científicos.',
          'Acceso a TecnoParques y TecnoAcademias para prototipar proyectos de robótica, biotecnología, inteligencia artificial y software.',
          'Participación en eventos nacionales como WorldSkills y ferias de ciencia aplicada.'
        ],
        keyHighlight: 'WorldSkills premia las mejores destrezas técnicas del planeta.'
      }
    ],
    quiz: [
      {
        id: 501,
        question: '¿Qué cobertura brinda la Póliza de Seguro de Accidentes a los aprendices matriculados en el SENA?',
        options: [
          'Solo cubre los días domingos y festivos.',
          'Cobertura médica gratuita las 24 horas del día, 7 días a la semana durante lectiva y productiva sin costo para el aprendiz.',
          'Cobra una cuota mensual de afiliación obligatoria.',
          'Solo aplica para directivos y funcionarios de planta.'
        ],
        correctIndex: 1,
        explanation: 'Todo aprendiz matriculado cuenta con póliza estudiantil contra accidentes 24/7 de forma 100% gratuita.'
      },
      {
        id: 502,
        question: '¿Qué es SENNOVA dentro de la estructura formativa del SENA?',
        options: [
          'La cafetería central del centro de formación.',
          'El Sistema de Investigación, Desarrollo Tecnológico e Innovación que impulsa semilleros y prototipos.',
          'Una empresa extranjera de transporte.',
          'La marca de los uniformes deportivos.'
        ],
        correctIndex: 1,
        explanation: 'SENNOVA es el ecosistema de investigación aplicada, desarrollo e innovación tecnológica del SENA.'
      }
    ]
  }
];

export const FINAL_EXAM_QUESTIONS: Question[] = [
  {
    id: 1,
    question: '¿En qué fecha fue fundado el SENA y quién fue su principal gestor?',
    options: [
      '20 de Julio de 1810 por Simón Bolívar.',
      '21 de Junio de 1957 por el doctor Rodolfo Martínez Tono.',
      '7 de Agosto de 1991 por la Asamblea Nacional Constituyente.',
      '1 de Mayo de 1975 por el Ministerio de Trabajo.'
    ],
    correctIndex: 1,
    explanation: 'El SENA fue fundado el 21 de junio de 1957 por Rodolfo Martínez Tono mediante el Decreto 118.'
  },
  {
    id: 2,
    question: '¿Qué sectores económicos están representados en el Escudo del SENA?',
    options: [
      'Sector Minero, Sector Espacial y Sector Militar.',
      'Sector Primario (agrícola), Secundario (industria/construcción) y Terciario (comercio/servicios).',
      'Únicamente el sector automotriz y de autopartes.',
      'Sector público y sector diplomático internacional.'
    ],
    correctIndex: 1,
    explanation: 'El Escudo integra los tres sectores de la economía nacional: campo, industria y servicios.'
  },
  {
    id: 3,
    question: '¿Qué significado tiene el fondo blanco en la Bandera oficial del SENA?',
    options: [
      'La riqueza mineral del subsuelo.',
      'La paz, la tranquilidad, la libertad y la reconciliación que produce la educación.',
      'La neutralidad política estricta.',
      'El papel sobre el que se imprimen los diplomas.'
    ],
    correctIndex: 1,
    explanation: 'El blanco simboliza la paz, la serenidad y la libertad que el saber promueve en la sociedad.'
  },
  {
    id: 4,
    question: '¿Qué postula la metodología de Formación Profesional Integral (FPI)?',
    options: [
      'La memorización mecánica de manuales técnicos sin práctica.',
      'La formación articulada del Saber (conocimiento), Saber Hacer (habilidad técnica) y Saber Ser (valores y convivencia).',
      'El estudio individual sin instructores ni interacción con compañeros.',
      'La graduación automática sin evaluaciones ni proyectos.'
    ],
    correctIndex: 1,
    explanation: 'La FPI articula el saber cognitivo, el desempeño práctico y la actitud humana ética.'
  },
  {
    id: 5,
    question: '¿Cuál de las siguientes NO es una alternativa válida para realizar la Etapa Productiva?',
    options: [
      'Contrato de Aprendizaje con empresa patrocinadora.',
      'Proyecto Productivo o emprendimiento acompañado.',
      'Inasistencia voluntaria no reportada durante seis meses.',
      'Vínculo Laboral formal en funciones afines al programa.'
    ],
    correctIndex: 2,
    explanation: 'La inasistencia no es una alternativa válida; constituye deserción del programa.'
  },
  {
    id: 6,
    question: '¿Cuál es la función principal de la plataforma virtual Zajuna en el SENA?',
    options: [
      'Es la red social recreativa para jugar en línea.',
      'Es el Ambiente Virtual de Aprendizaje (LMS) para consultar materiales, guías y enviar evidencias formativas.',
      'Es el portal exclusivo para pedir citas médicas de la EPS.',
      'Es el catálogo de uniformes y calzado institucional.'
    ],
    correctIndex: 1,
    explanation: 'Zajuna es el LMS oficial institucional para la gestión del aprendizaje y desarrollo de evidencias.'
  },
  {
    id: 7,
    question: 'Según el Reglamento del Aprendiz (Acuerdo 007 de 2012), ¿cuál es el plazo máximo para radicar justificaciones de inasistencia?',
    options: [
      'Dentro de los tres (3) días hábiles siguientes al hecho con su debido soporte.',
      'Al terminar el año lectivo durante la clausura.',
      'Diez días calendario después de la sanción.',
      'No es necesario justificar si el compañero le avisa al profesor.'
    ],
    correctIndex: 0,
    explanation: 'El artículo 22 establece un plazo improrrogable de 3 días hábiles.'
  },
  {
    id: 8,
    question: '¿Qué consecuencia disciplinaria y académica tiene cometer plagio en un proyecto formativo?',
    options: [
      'Una felicitación por encontrar información rápida en internet.',
      'Se considera una falta que puede llevar a llamado de atención, plan de mejoramiento o cancelación de matrícula según su gravedad.',
      'Ninguna, porque en internet toda la información es de uso anónimo.',
      'Un descuento en la matrícula del siguiente trimestre.'
    ],
    correctIndex: 1,
    explanation: 'El plagio vulnera la propiedad intelectual y el código de ética, acarreando sanciones severas.'
  },
  {
    id: 9,
    question: '¿Qué cubre la Póliza Estudiantil de Accidentes para los aprendices matriculados?',
    options: [
      'Solo accidentes ocurridos en el trayecto en bus de la casa al centro.',
      'Atención médica por accidentes las 24 horas del día, 7 días a la semana durante lectiva y productiva sin costo alguno.',
      'Solo cubre daños materiales de computadores personales.',
      'Únicamente cirugías estéticas programadas.'
    ],
    correctIndex: 1,
    explanation: 'Cubre accidentes personales las 24 horas del día, los 7 días de la semana de forma gratuita.'
  },
  {
    id: 10,
    question: '¿Qué es el fondo de capital semilla para emprendedores aprendices del SENA?',
    options: [
      'Fondo Rotatorio de Crédito Bancario con altas tasas de interés.',
      'Fondo Emprender, que financia iniciativas empresariales viables con capital semilla condonable.',
      'Lotería Nacional de Aprendices.',
      'Subsidio de vivienda militar.'
    ],
    correctIndex: 1,
    explanation: 'Fondo Emprender es el fondo estatal administrado por el SENA que otorga capital semilla condonable a planes de negocio viables.'
  }
];

export const COLOMBIAN_REGIONALS = [
  'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá',
  'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba',
  'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena',
  'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda',
  'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca',
  'Vaupés', 'Vichada'
];

export const SAMPLE_CENTERS = [
  'Centro de Biotecnología Agropecuaria',
  'Centro de Tecnologías del Transporte',
  'Centro de Servicios Financieros',
  'Centro de Gestión de Mercados, Logística y TI',
  'Centro de Electricidad, Electrónica y Telecomunicaciones',
  'Centro de Comercio y Servicios',
  'Centro de Formación en Actividad Física y Cultura',
  'Centro de Metalmecánica',
  'Centro de Materiales y Ensayos',
  'Centro de Manufactura en Textiles y Cuero',
  'Centro Agroempresarial y Minero',
  'Centro Tecnológico del Mobiliario',
  'Centro de Innovación, la Agroindustria y la Aviación'
];

export const SAMPLE_PROGRAMS = [
  'Análisis y Desarrollo de Software (ADSO)',
  'Gestión Administrativa',
  'Contabilización de Operaciones Comerciales y Financieras',
  'Mantenimiento Mecatrónico de Automotores',
  'Gestión de Redes de Datos',
  'Producción Multimedia y Animación Digital',
  'Control de Calidad en Alimentos',
  'Mantenimiento Electrónico e Instrumental Industrial',
  'Gestión del Talento Humano',
  'Distribución Física Internacional',
  'Construcción de Edificaciones',
  'Gestión de Recursos Naturales y Sostenibilidad'
];
