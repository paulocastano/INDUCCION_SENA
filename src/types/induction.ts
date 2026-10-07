export interface ApprenticeProfile {
  name: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  ficha?: string;
  email?: string;
  program: string;
  programType: 'Técnico' | 'Tecnólogo' | 'Operario' | 'Especialización Tecnológica';
  regional: string;
  center: string;
  avatarSeed: string;
  completedStations: number[];
  quizScores: Record<number, number>; // stationId -> percentage
  finalExamScore?: number;
  totalGamifiedPoints?: number;
  timeTakenSeconds?: number;
  inductionCompleted: boolean;
  completionDate?: string;
  certificateId?: string;
}

export interface ExamAnswerRecord {
  questionId: number;
  sectionId?: string;
  sectionTitle?: string;
  articleRef?: string;
  questionText: string;
  selectedOptionIndex: number;
  selectedOptionText: string;
  correctOptionIndex: number;
  isCorrect: boolean;
  explanation: string;
  positiveFeedback?: string;
  mistakeAnalysis?: string;
  timeSpentSeconds?: number;
}

export interface InductionLearnerRecord {
  id: string;
  name: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  ficha?: string;
  email?: string;
  program: string;
  programType?: string;
  regional: string;
  center: string;
  completedStationsCount: number;
  completedStations?: number[];
  finalExamScore: number;
  totalGamifiedPoints?: number;
  timeTakenSeconds?: number;
  speedBonusTotal?: number;
  streakMax?: number;
  accuracyPct?: number;
  sectionBreakdown?: Record<string, { correct: number; total: number; scorePct: number }>;
  status: 'Aprobado' | 'En Proceso';
  completionDate: string;
  completionTime?: string;
  certificateId: string;
  detailedAnswers?: ExamAnswerRecord[];
  dilemmasSolved?: number;
  notes?: string;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface DilemmaCase {
  id: number;
  title: string;
  category?: 'salud' | 'academico' | 'contrato' | 'innovacion' | 'convivencia' | 'debido_proceso';
  badge?: string;
  situation: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
    regulationRef: string;
  }[];
}

export interface RegulationArticle {
  article: string;
  chapter: string;
  title: string;
  category: 'derechos' | 'deberes' | 'prohibiciones' | 'tramites' | 'faltas' | 'debido_proceso' | 'representacion';
  content: string;
  keyRule: string;
  practicalTip?: string;
}

export interface DueProcessStep {
  step: number;
  phase: string;
  title: string;
  timeLimit: string;
  actors: string[];
  description: string;
  apprenticeRights: string;
  statusIcon?: string;
}

export interface LearnerProcedure {
  id: string;
  title: string;
  category: 'incapacidad' | 'contrato' | 'aplazamiento' | 'senasoft' | 'traslado' | 'voceria';
  badge: string;
  triggerCondition: string;
  deadlines: string;
  steps: string[];
  regulationRef: string;
  legalTip: string;
}

export interface StationTopic {
  id: string;
  title: string;
  summary: string;
  content: string[];
  keyHighlight?: string;
  badgeLabel?: string;
}

export interface Station {
  id: number;
  number: string;
  title: string;
  shortDesc: string;
  category: string;
  estimatedMinutes: number;
  topics: StationTopic[];
  quiz: Question[];
  interactiveType?: 'symbols' | 'hymn' | 'stages' | 'cases' | 'wellness';
}

export interface HymnStanza {
  number: number;
  title: string;
  lines: string[];
  context: string;
}
