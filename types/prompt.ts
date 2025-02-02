export type AIModel = string

export interface Prompt {
  id: string
  title: string
  category: string
  tags: string[]
  prompt: string
  model: AIModel
  author: {
    avatar: string
    github: string
  }
  upvotes: number
}

