export type AIModel = string

export interface Prompt {
  id: string
  category: string
  tags: string[]
  prompt: string
  author: {
    github: string
  }
  model?: string[]
  copyCount?: number
}

