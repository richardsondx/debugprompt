"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const modelData = [
    {
      category: "Error Diagnosis",
      reasoningRequirement: "Models that can analyze code, identify errors, and provide detailed explanations.",
      recommendedModels: "o3-mini-high, claude-3.5-sonnet, deepseek-r1",
    },
    {
      category: "Data Flow Tracing",
      reasoningRequirement: "Models capable of understanding and tracking complex data flows and execution paths.",
      recommendedModels: "o3-mini, gemini-2.0-flash-experimental, cursor-small",
    },
    {
      category: "Approach Comparison",
      reasoningRequirement: "Models that can evaluate and compare multiple problem-solving approaches.",
      recommendedModels: "claude-3-opus, o1, cascade-base",
    },
    {
      category: "Pseudocode Analysis",
      reasoningRequirement: "Models that excel at breaking down algorithms into logical steps and explaining them clearly.",
      recommendedModels: "o1, claude-3.5-haiku, gpt-4o-mini",
    },
    {
      category: "Assumption Testing",
      reasoningRequirement: "Models proficient in identifying and questioning implicit assumptions in code logic.",
      recommendedModels: "deepseek-r1, gpt-4-turbo-2024-04-09, claude-3.5-sonnet",
    },
    {
      category: "Refactoring",
      reasoningRequirement: "Models optimized for code restructuring and improving code quality within IDEs.",
      recommendedModels: "cursor-fast, claude-3-opus, o3-mini-high",
    },
    {
      category: "Performance Tuning",
      reasoningRequirement: "Models capable of identifying performance bottlenecks and suggesting optimizations.",
      recommendedModels: "gemini-2.0-flash-experimental, o3-mini, deepseek-r1",
    },
    {
      category: "Prompt Iteration",
      reasoningRequirement: "Models that can quickly refine and improve prompts for better results.",
      recommendedModels: "gpt-4o-mini, cascade-base, claude-3.5-haiku",
    },
    {
      category: "Test Generation",
      reasoningRequirement: "Models skilled at creating comprehensive test cases based on code functionality.",
      recommendedModels: "deepseek-r1, o3-mini-high, cursor-small",
    },
    {
      category: "Environment Debugging",
      reasoningRequirement: "Models with strong understanding of system dependencies and environment configurations.",
      recommendedModels: "o1, gemini-2.0-flash-experimental, cascade-base",
    },
    {
      category: "Security Analysis",
      reasoningRequirement: "Models specialized in identifying potential security vulnerabilities and suggesting fixes.",
      recommendedModels: "gpt-4-turbo-2024-04-09, deepseek-r1, claude-3.5-sonnet",
    },
    {
      category: "Edge Case Handling",
      reasoningRequirement: "Models adept at identifying and addressing potential edge cases in code execution.",
      recommendedModels: "claude-3.5-sonnet, o3-mini-high, cursor-fast",
    },
    {
      category: "Logic Breakdown",
      reasoningRequirement: "Models that excel at dissecting complex logic and proposing alternative approaches.",
      recommendedModels: "o1, claude-3.5-opus, deepseek-r1",
    },
    {
      category: "Dependency Debugging",
      reasoningRequirement: "Models with strong capabilities in analyzing and resolving package and module dependencies.",
      recommendedModels: "o3-mini, gemini-2.0-flash-experimental, cascade-base",
    },
    {
      category: "Code Optimization",
      reasoningRequirement: "Models specialized in improving code efficiency and readability.",
      recommendedModels: "o3-mini-high, claude-3-opus, deepseek-r1, cursor-fast",
    },
  ]

export function ModelCompare() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-[#00F3FF] hover:text-[#00F3FF]/80 p-0">
          Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-[#00F3FF]">AI Model Recommendations</DialogTitle>
          <DialogDescription className="text-gray-300">
            Recommended AI models for different debugging categories.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#00F3FF]">Debugging Category</TableHead>
                <TableHead className="text-[#00F3FF]">Reasoning Requirement</TableHead>
                <TableHead className="text-[#00F3FF]">Recommended Models</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modelData.map((row) => (
                <TableRow key={row.category}>
                  <TableCell className="font-medium">{row.category}</TableCell>
                  <TableCell>{row.reasoningRequirement}</TableCell>
                  <TableCell>{row.recommendedModels}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 