export type ResourceType = 'video' | 'article' | 'interactive' | 'pdf' | 'website'
export type QuestionType = 'single' | 'mcq' | 'true_false'

export interface Program {
  id: string
  name: string
  subject: string
  grade: string
  state: string
  county: string
  district?: string
  description?: string
  source_url?: string
  is_published: boolean
  created_at: string
}

export interface StudyDay {
  id: string
  program_id: string
  day_number: number
  week_number: number
  title: string
  topic: string
  overview?: string
  key_concepts: string[]
  learning_objectives: string[]
}

export interface Resource {
  id: string
  study_day_id: string
  title: string
  url: string
  resource_type: ResourceType
  source: string
  description?: string
  order_index: number
}

export interface QuizOption {
  id: string
  text: string
}

export interface QuizQuestion {
  id: string
  study_day_id: string
  question: string
  question_type: QuestionType
  options: QuizOption[]
  correct_answer: string | string[]
  explanation?: string
  points: number
  order_index: number
}

export interface Experiment {
  id: string
  study_day_id: string
  title: string
  description?: string
  materials: string[]
  steps: string[]
  safety_notes?: string
  bonus_points: number
}

export interface AchievementLevel {
  id: string
  program_id: string
  name: string
  min_points: number
  badge_icon: string
  description?: string
}

export interface Enrollment {
  id: string
  user_id: string
  program_id: string
  enrolled_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  program_id: string
  study_day_id: string
  is_lesson_complete: boolean
  lesson_completed_at?: string
  quiz_score?: number
  quiz_max_points?: number
  quiz_completed_at?: string
  experiment_completed: boolean
  experiment_completed_at?: string
  experiment_bonus_points: number
  total_points: number
}

export interface Profile {
  id: string
  display_name?: string
  is_admin: boolean
  created_at: string
}
