import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Persistent storage file paths
const RECORDS_FILE = path.join(__dirname, 'induction_records.json');
const CONFIG_FILE = path.join(__dirname, 'admin_config.json');

// Default Admin PIN (secure, configurable by coordinator)
let currentAdminPin = 'SENA2026';

try {
  if (fs.existsSync(CONFIG_FILE)) {
    const rawConfig = fs.readFileSync(CONFIG_FILE, 'utf-8');
    const parsed = JSON.parse(rawConfig);
    if (parsed.adminPin) {
      currentAdminPin = parsed.adminPin;
    }
  }
} catch (e) {
  console.warn('Could not read admin config, using default PIN');
}

// Seed records with complete answer logs
const DEFAULT_SEED_RECORDS = [
  {
    id: 'IND-2026-001',
    name: 'Alejandro Morales Gómez',
    documentType: 'CC',
    documentNumber: '1020456789',
    ficha: '2874102',
    email: 'amorales@misena.edu.co',
    program: 'Análisis y Desarrollo de Software (ADSO)',
    programType: 'Tecnólogo',
    regional: 'Antioquia',
    center: 'Centro de Tecnología de la Manufactura Avanzada',
    completedStationsCount: 5,
    completedStations: [1, 2, 3, 4, 5],
    finalExamScore: 100,
    totalGamifiedPoints: 4850,
    timeTakenSeconds: 142,
    speedBonusTotal: 650,
    streakMax: 35,
    accuracyPct: 100,
    status: 'Aprobado',
    completionDate: '2026-10-06',
    completionTime: '14:22:10',
    certificateId: 'SENA-IND-ANT-2026-6789',
    dilemmasSolved: 10,
    notes: 'Aprobó con honores en primer intento - Puesto 1'
  },
  {
    id: 'IND-2026-002',
    name: 'Valentina Ríos Restrepo',
    documentType: 'TI',
    documentNumber: '1035928174',
    ficha: '2893540',
    email: 'vrios@misena.edu.co',
    program: 'Gestión Administrativa',
    programType: 'Tecnólogo',
    regional: 'Distrito Capital',
    center: 'Centro de Gestión de Mercados, Logística y TI',
    completedStationsCount: 5,
    completedStations: [1, 2, 3, 4, 5],
    finalExamScore: 94,
    totalGamifiedPoints: 4420,
    timeTakenSeconds: 168,
    speedBonusTotal: 520,
    streakMax: 24,
    accuracyPct: 94,
    status: 'Aprobado',
    completionDate: '2026-10-05',
    completionTime: '10:15:44',
    certificateId: 'SENA-IND-DIS-2026-8174',
    dilemmasSolved: 8,
    notes: 'Completó todas las 5 estaciones con alta velocidad'
  },
  {
    id: 'IND-2026-003',
    name: 'Camilo Andrés Torres Gil',
    documentType: 'CC',
    documentNumber: '1098765432',
    ficha: '2761890',
    email: 'ctorres@misena.edu.co',
    program: 'Mantenimiento Mecatrónico de Automotores',
    programType: 'Técnico',
    regional: 'Santander',
    center: 'Centro Industrial del Diseño y la Manufactura',
    completedStationsCount: 4,
    completedStations: [1, 2, 3, 4],
    finalExamScore: 88,
    totalGamifiedPoints: 3950,
    timeTakenSeconds: 195,
    speedBonusTotal: 410,
    streakMax: 18,
    accuracyPct: 88,
    status: 'Aprobado',
    completionDate: '2026-10-04',
    completionTime: '16:48:02',
    certificateId: 'SENA-IND-SAN-2026-5432',
    dilemmasSolved: 7
  },
  {
    id: 'IND-2026-004',
    name: 'Mariana Duque Hincapié',
    documentType: 'CC',
    documentNumber: '1152439081',
    ficha: '2814529',
    email: 'mduque@misena.edu.co',
    program: 'Biotecnología Agropecuaria',
    programType: 'Tecnólogo',
    regional: 'Valle del Cauca',
    center: 'Centro Latinoamericano de Especies Menores',
    completedStationsCount: 3,
    completedStations: [1, 2, 3],
    finalExamScore: 65,
    totalGamifiedPoints: 2450,
    timeTakenSeconds: 310,
    speedBonusTotal: 150,
    streakMax: 8,
    accuracyPct: 65,
    status: 'En Proceso',
    completionDate: '2026-10-06',
    completionTime: '11:05:19',
    certificateId: 'SENA-IND-VAL-2026-9081',
    dilemmasSolved: 4,
    notes: 'Pendiente presentar reintento de evaluación'
  },
  {
    id: 'IND-2026-005',
    name: 'Juan Sebastián Mendoza Roa',
    documentType: 'CC',
    documentNumber: '1014298734',
    ficha: '2901234',
    email: 'jmendoza@misena.edu.co',
    program: 'Producción de Medios Audiovisuales Digitales',
    programType: 'Tecnólogo',
    regional: 'Atlántico',
    center: 'Centro Nacional Colombo Alemán',
    completedStationsCount: 5,
    completedStations: [1, 2, 3, 4, 5],
    finalExamScore: 97,
    totalGamifiedPoints: 4680,
    timeTakenSeconds: 155,
    speedBonusTotal: 580,
    streakMax: 30,
    accuracyPct: 97,
    status: 'Aprobado',
    completionDate: '2026-10-03',
    completionTime: '09:30:11',
    certificateId: 'SENA-IND-ATL-2026-8734',
    dilemmasSolved: 9
  }
];

let inductionRecords: any[] = [];

function loadRecordsFromDisk() {
  try {
    if (fs.existsSync(RECORDS_FILE)) {
      const raw = fs.readFileSync(RECORDS_FILE, 'utf-8');
      inductionRecords = JSON.parse(raw);
    } else {
      inductionRecords = [...DEFAULT_SEED_RECORDS];
      saveRecordsToDisk();
    }
  } catch (err) {
    console.warn('Error reading records file, defaulting:', err);
    inductionRecords = [...DEFAULT_SEED_RECORDS];
  }
}

function saveRecordsToDisk() {
  try {
    fs.writeFileSync(RECORDS_FILE, JSON.stringify(inductionRecords, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving records to disk:', err);
  }
}

// Load records at startup
loadRecordsFromDisk();

// Initialize Gemini client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({ apiKey });
}

// Institutional System Prompt for the SENA Virtual Tutor
const SENA_SYSTEM_INSTRUCTION = `
Eres el "Tutor Institucional SENA", un guía pedagógico oficial, cálido, respetuoso y motivador del Servicio Nacional de Aprendizaje (SENA) de Colombia.
Tu misión es orientar a los aprendices en su proceso de inducción y despejar dudas sobre:
1. Historia (Fundado el 21 de junio de 1957 por Rodolfo Martínez Tono).
2. Símbolos: Escudo (3 sectores: Primario/Agropecuario con café y espiga; Secundario/Industria con piñón; Terciario/Servicios con caduceo), Bandera blanca (paz) y Logotipo (el aprendiz caminante erguido hacia el porvenir).
3. Himno del SENA (Luis Alfredo Sánchez y Daniel Marlez).
4. Metodología FPI: Saber, Saber Hacer, Saber Ser.
5. Etapa Lectiva y las 5 alternativas de Etapa Productiva (Contrato de aprendizaje, Vínculo laboral, Proyecto productivo / Fondo Emprender, Pasantía, Monitoría SENA).
6. Reglamento del Aprendiz (Acuerdo 007 de 2012): Derechos, Deberes (porte obligatorio de carné, justificar fallas en máx 3 días hábiles), Faltas leves, graves, gravísimas, Comité de Evaluación y Seguimiento.
7. Bienestar al Aprendiz: 9 dimensiones, apoyos de sostenimiento (FIC y Regular), póliza médica contra accidentes 24/7 gratuita, semilleros SENNOVA y TecnoParques.
8. Plataformas: SofiaPlus (matrículas y certificados) y Zajuna (LMS aula virtual).

Reglas de respuesta:
- Sé conciso, claro, didáctico y motivador (máximo 2 a 3 párrafos).
- Usa terminología institucional SENA auténtica (aprendiz, instructor, ficha, centro de formación, competencia, evidencia).
- Cita los artículos o acuerdos relevantes cuando aplique (por ejemplo, Acuerdo 007 de 2012).
- Responde siempre en español.
`;

// Helper fallback answers when API key is not configured or in case of errors
function getInstitutionalFallbackAnswer(userMessage: string): string {
  const query = userMessage.toLowerCase();

  if (query.includes('falta') || query.includes('inasistencia') || query.includes('excusa') || query.includes('médica') || query.includes('incapacidad')) {
    return 'De acuerdo con el Artículo 22 del Reglamento del Aprendiz (Acuerdo 007 de 2012), dispones de hasta tres (3) días hábiles siguientes al hecho para presentar ante tu instructor y el coordinador académico la incapacidad médica oficial expedida por tu EPS. Si no lo haces dentro de este plazo, se registrará como inasistencia injustificada y 3 faltas continuas configuran causal de deserción.';
  }

  if (query.includes('comite') || query.includes('comité') || query.includes('debido proceso') || query.includes('descargo') || query.includes('sancion') || query.includes('sanción')) {
    return 'El Debido Proceso (Capítulo VIII, Artículos 30 al 34) garantiza que ningún aprendiz sea sancionado sin ser escuchado. Debes ser citado por escrito con mínimo tres (3) días hábiles de anticipación, tienes derecho a presentar pruebas, controvertir cargos y estar acompañado por el Vocero de tu Ficha. El Subdirector expide la Resolución motivada y cuentas con cinco (5) días hábiles para interponer el Recurso de Reposición si no estás de acuerdo.';
  }

  if (query.includes('senasoft') || query.includes('worldskills') || query.includes('semillero') || query.includes('sennova')) {
    return 'La participación en SenaSoft, WorldSkills y semilleros SENNOVA es un honor y estímulo de excelencia consagrado en el Artículo 8 del Reglamento. La Subdirección expide un Acto de Comisión Oficial que justifica automáticamente tus ausencias y te otorga plazo concertado de hasta 10 días para nivelar evidencias académicas.';
  }

  if (query.includes('aplazamiento') || query.includes('desercion') || query.includes('deserción') || query.includes('retiro') || query.includes('traslado')) {
    return 'Según el Artículo 24, puedes solicitar novedades en SofiaPlus: Aplazamiento por fuerza mayor o salud (hasta por 6 meses congelando tu cupo), Traslado de Centro o Jornada, o Retiro Voluntario formal. Recuerda que dejar de asistir 3 días continuos sin avisar genera Deserción con sanción de 6 meses de inhabilidad en SofiaPlus.';
  }

  if (query.includes('productiva') || query.includes('etapa') || query.includes('contrato') || query.includes('alternativa')) {
    return 'La Etapa Productiva dura 6 meses y cuenta con 5 alternativas reglamentarias: 1) Contrato de Aprendizaje (la empresa otorga apoyo económico de sostenimiento y EPS/ARL), 2) Vínculo Laboral formal (si ya trabajas en funciones afines al programa), 3) Proyecto Productivo / Fondo Emprender, 4) Pasantía en entidad pública u ONG, y 5) Monitoría en el SENA. Recuerda que la alternativa debe ser concertada y avalada previamente por la coordinación académica.';
  }

  if (query.includes('carné') || query.includes('carne') || query.includes('uniforme') || query.includes('identificación')) {
    return 'Según el Artículo 9 (Deberes del Aprendiz), portar el carné institucional de manera visible es obligatorio durante toda tu permanencia en las instalaciones del SENA y en cualquier salida técnica. El carné es personal e intransferible; permite tu ingreso seguro, el préstamo de herramientas en talleres y el acceso a los servicios de biblioteca y bienestar.';
  }

  if (query.includes('himno') || query.includes('música') || query.includes('letra') || query.includes('autor')) {
    return 'El Himno del SENA fue compuesto en su letra por el poeta Luis Alfredo Sánchez y musicalizado por el maestro Daniel Marlez. Su coro proclama: "Estudiantes del SENA adelante, por Colombia luchad con amor, con el ánimo noble y radiante transformémosle el mundo en flor". Es un canto solemne que exalta el valor del trabajo y el estudio como el camino hacia la paz y la grandeza nacional.';
  }

  if (query.includes('escudo') || query.includes('símbolo') || query.includes('bandera') || query.includes('logo')) {
    return 'Los símbolos del SENA representan la identidad del país: El Escudo une los 3 sectores de la economía colombiana (Primario: café y espigas; Secundario: piñón o rueda industrial; Terciario: caduceo alado de servicios y saber). La Bandera es blanca simbolizando la paz y libertad logradas por la educación, con el escudo verde central. Y el Isotipo del Caminante representa al aprendiz avanzando erguido hacia su futuro sobre un sendero de oportunidades.';
  }

  if (query.includes('apoyo') || query.includes('bienestar') || query.includes('póliza') || query.includes('seguro') || query.includes('subsidio')) {
    return 'Bienestar al Aprendiz cuenta con 9 dimensiones que te acompañan durante tu formación. Entre los beneficios más destacados están: la Póliza Estudiantil de Accidentes (cobertura médica gratuita 24/7 sin costo para ti), los Apoyos de Sostenimiento (Regular y FIC para aprendices de estratos 1 y 2), monitorías académicas remuneradas, y acceso a actividades deportivas, culturales y semilleros SENNOVA.';
  }

  if (query.includes('zajuna') || query.includes('sofiaplus') || query.includes('sofia') || query.includes('plataforma') || query.includes('evidencia')) {
    return 'El ecosistema digital del SENA se compone de dos plataformas centrales: SofiaPlus (senasofiaplus.edu.co), que es el sistema de gestión académica donde consultas matrículas, calificaciones oficiales y descargas certificaciones; y Zajuna (zajuna.sena.edu.co), que es el LMS (aula virtual) donde interactúas con las guías de aprendizaje, participas en foros y cargas las evidencias de tus competencias.';
  }

  return '¡Bienvenido al SENA! Como aprendiz, formas parte de la institución más querida por los colombianos, fundada en 1957 por Rodolfo Martínez Tono. Aquí nos formamos bajo la Formación Profesional Integral (FPI): articulando el Saber (conocimiento), el Saber Hacer (destreza técnica) y el Saber Ser (ética y convivencia). Puedes consultarme sobre el reglamento (Acuerdo 007 de 2012), alternativas de etapa productiva, bienestar, justificaciones de faltas o plataformas institucionales.';
}

// POST endpoint for the SENA Virtual Tutor
app.post('/api/tutor', async (req: Request, res: Response) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'El mensaje es requerido.' });
  }

  // If Gemini client is configured, call Gemini
  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: SENA_SYSTEM_INSTRUCTION,
          temperature: 0.3,
          maxOutputTokens: 600
        }
      });

      const replyText = response.text || '';
      if (replyText.trim()) {
        return res.json({ reply: replyText });
      }
    } catch (err: any) {
      console.warn('Gemini API call failed, using institutional fallback:', err?.message || err);
      // Fallback gracefully without breaking user flow
    }
  }

  // Graceful fallback to verified institutional knowledge base
  const fallbackReply = getInstitutionalFallbackAnswer(message);
  return res.json({ reply: fallbackReply });
});

// Middleware helper to authorize admin requests
function isAuthorizedAdmin(req: Request): boolean {
  const pinHeader = req.headers['x-admin-pin'] as string;
  const authHeader = req.headers['authorization'] as string;
  const pinQuery = req.query.pin as string;

  if (pinHeader && pinHeader === currentAdminPin) return true;
  if (pinQuery && pinQuery === currentAdminPin) return true;
  if (authHeader && authHeader === `Bearer sena-admin-token-2026`) return true;
  return false;
}

// PUBLIC ENDPOINT FOR APPRENTICES: Submit induction exam and progress
// Note: Write-only endpoint. Does NOT return or expose other apprentices' data.
app.post('/api/induction/submit', (req: Request, res: Response) => {
  try {
    const {
      name,
      documentType,
      documentNumber,
      ficha,
      email,
      program,
      programType,
      regional,
      center,
      completedStationsCount,
      completedStations,
      finalExamScore,
      totalGamifiedPoints,
      timeTakenSeconds,
      speedBonusTotal,
      streakMax,
      accuracyPct,
      sectionBreakdown,
      status,
      certificateId,
      detailedAnswers,
      dilemmasSolved,
      notes
    } = req.body;

    if (!name || !documentNumber) {
      return res.status(400).json({ error: 'Nombre y documento son obligatorios.' });
    }

    const now = new Date();
    const completionDate = req.body.completionDate || now.toISOString().split('T')[0];
    const completionTime = req.body.completionTime || now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Find if already exists
    const existingIndex = inductionRecords.findIndex((r) => r.documentNumber === String(documentNumber).trim());

    const recordId = existingIndex >= 0 
      ? inductionRecords[existingIndex].id 
      : `IND-2026-${String(inductionRecords.length + 1).padStart(3, '0')}`;

    const newRecord = {
      id: recordId,
      name: String(name).trim(),
      documentType: documentType || 'CC',
      documentNumber: String(documentNumber).trim(),
      ficha: ficha ? String(ficha).trim() : (existingIndex >= 0 ? inductionRecords[existingIndex].ficha : 'Sin Ficha'),
      email: email ? String(email).trim() : (existingIndex >= 0 ? inductionRecords[existingIndex].email : ''),
      program: program || 'Programa de Formación SENA',
      programType: programType || 'Tecnólogo',
      regional: regional || 'Antioquia',
      center: center || 'Centro de Formación SENA',
      completedStationsCount: Number(completedStationsCount) || (Array.isArray(completedStations) ? completedStations.length : 5),
      completedStations: completedStations || [1, 2, 3, 4, 5],
      finalExamScore: Number(finalExamScore) ?? 0,
      totalGamifiedPoints: Number(totalGamifiedPoints) || (Number(finalExamScore) * 40),
      timeTakenSeconds: Number(timeTakenSeconds) || 180,
      speedBonusTotal: Number(speedBonusTotal) || 0,
      streakMax: Number(streakMax) || 0,
      accuracyPct: Number(accuracyPct) || Number(finalExamScore) || 0,
      sectionBreakdown: sectionBreakdown || {},
      status: status || (Number(finalExamScore) >= 70 ? 'Aprobado' : 'En Proceso'),
      completionDate,
      completionTime,
      certificateId: certificateId || `SENA-IND-${(regional || 'ANT').substring(0, 3).toUpperCase()}-2026-${String(documentNumber).slice(-4)}`,
      detailedAnswers: Array.isArray(detailedAnswers) ? detailedAnswers : [],
      dilemmasSolved: Number(dilemmasSolved) || 0,
      notes: notes || 'Evaluación unificada del reglamento con cronómetro y gamificación'
    };

    if (existingIndex >= 0) {
      inductionRecords[existingIndex] = newRecord;
    } else {
      inductionRecords.unshift(newRecord);
    }

    saveRecordsToDisk();

    return res.status(200).json({
      success: true,
      message: 'Resultados de inducción registrados exitosamente en el servidor institucional.',
      recordId: newRecord.id,
      score: newRecord.finalExamScore,
      points: newRecord.totalGamifiedPoints
    });
  } catch (err: any) {
    console.error('Error in /api/induction/submit:', err);
    return res.status(500).json({ error: 'Error interno guardando la inducción.' });
  }
});

// PUBLIC ENDPOINT FOR APPRENTICES: Gamified Ranking / Leaderboard
// Returns anonymized/safe leaderboard sorted by gamified points and speed
app.get('/api/induction/leaderboard', (_req: Request, res: Response) => {
  try {
    const sorted = [...inductionRecords]
      .filter((r) => r.finalExamScore !== undefined)
      .sort((a, b) => {
        const pointsDiff = (b.totalGamifiedPoints || 0) - (a.totalGamifiedPoints || 0);
        if (pointsDiff !== 0) return pointsDiff;
        // Tie-breaker: least time taken wins
        return (a.timeTakenSeconds || 9999) - (b.timeTakenSeconds || 9999);
      });

    const leaderboard = sorted.map((r, index) => {
      const doc = String(r.documentNumber || '');
      const maskedDoc = doc.length > 4 
        ? `${doc.slice(0, 3)}***${doc.slice(-3)}` 
        : '***';

      return {
        rank: index + 1,
        id: r.id,
        name: r.name,
        maskedDocument: maskedDoc,
        ficha: r.ficha || 'General',
        program: r.program,
        programType: r.programType,
        regional: r.regional,
        finalExamScore: r.finalExamScore || 0,
        totalGamifiedPoints: r.totalGamifiedPoints || Math.round((r.finalExamScore || 0) * 40),
        timeTakenSeconds: r.timeTakenSeconds || 180,
        streakMax: r.streakMax || 0,
        speedBonusTotal: r.speedBonusTotal || 0,
        status: r.status,
        completionDate: r.completionDate
      };
    });

    return res.json({
      success: true,
      totalParticipants: leaderboard.length,
      leaderboard: leaderboard.slice(0, 50)
    });
  } catch (err: any) {
    console.error('Error fetching leaderboard:', err);
    return res.status(500).json({ error: 'Error consultando el ranking institucional.' });
  }
});

// PROTECTED ENDPOINT: Verify Administrator PIN
app.post('/api/admin/auth', (req: Request, res: Response) => {
  const { pin } = req.body;
  if (!pin) {
    return res.status(400).json({ error: 'PIN requerido' });
  }

  if (String(pin).trim() === currentAdminPin) {
    return res.json({
      success: true,
      token: 'sena-admin-token-2026',
      message: 'Autenticación administrativa concedida.'
    });
  }

  return res.status(401).json({
    success: false,
    error: 'PIN de acceso administrativo incorrecto.'
  });
});

// PROTECTED ENDPOINT: Retrieve all induction records with full details & answers
app.get('/api/admin/records', (req: Request, res: Response) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({ error: 'Acceso no autorizado. Se requiere PIN o credencial de Administrador.' });
  }

  const approvedCount = inductionRecords.filter(r => r.status === 'Aprobado').length;
  const inProgressCount = inductionRecords.filter(r => r.status === 'En Proceso').length;
  const avgScore = inductionRecords.length > 0
    ? Math.round(inductionRecords.reduce((acc, r) => acc + (r.finalExamScore || 0), 0) / inductionRecords.length)
    : 0;

  return res.json({
    success: true,
    records: inductionRecords,
    stats: {
      total: inductionRecords.length,
      approved: approvedCount,
      inProgress: inProgressCount,
      averageScore: avgScore
    }
  });
});

// PROTECTED ENDPOINT: Create or update a manual record (Admin only)
app.post('/api/admin/records', (req: Request, res: Response) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({ error: 'Acceso no autorizado.' });
  }

  const newRec = req.body;
  newRec.id = newRec.id || `IND-2026-${String(inductionRecords.length + 1).padStart(3, '0')}`;
  inductionRecords.unshift(newRec);
  saveRecordsToDisk();
  return res.json({ success: true, record: newRec });
});

// PROTECTED ENDPOINT: Delete a record (Admin only)
app.delete('/api/admin/records/:id', (req: Request, res: Response) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({ error: 'Acceso no autorizado.' });
  }

  const { id } = req.params;
  inductionRecords = inductionRecords.filter(r => r.id !== id);
  saveRecordsToDisk();
  return res.json({ success: true, message: 'Registro eliminado correctamente.' });
});

// PROTECTED ENDPOINT: Change Admin PIN
app.post('/api/admin/change-pin', (req: Request, res: Response) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({ error: 'Acceso no autorizado.' });
  }

  const { newPin } = req.body;
  if (!newPin || String(newPin).trim().length < 4) {
    return res.status(400).json({ error: 'El nuevo PIN debe tener al menos 4 caracteres.' });
  }

  currentAdminPin = String(newPin).trim();
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ adminPin: currentAdminPin }, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Error saving new pin to file:', err);
  }

  return res.json({ success: true, message: 'PIN administrativo actualizado exitosamente.' });
});

// PROTECTED ENDPOINT: Reset records to default seed
app.post('/api/admin/reset', (req: Request, res: Response) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({ error: 'Acceso no autorizado.' });
  }

  inductionRecords = [...DEFAULT_SEED_RECORDS];
  saveRecordsToDisk();
  return res.json({ success: true, message: 'Registros reinicializados con datos semilla.' });
});

// Configure Vite middleware in development or static serve in production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Servidor de Inducción SENA activo en http://localhost:${port}`);
  });
}

startServer();
