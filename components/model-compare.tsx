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

const categoryData = [
    {
      category: "Error Diagnosis",
      description: "Systematic analysis of error messages, stack traces, and runtime exceptions to identify root causes and potential fixes.",
    },
    {
      category: "Data Flow Tracing",
      description: "Tracking how data moves through your application, from input to output, identifying transformation points and state changes.",
    },
    {
      category: "Approach Comparison",
      description: "Evaluating different solutions to the same problem, analyzing tradeoffs in performance, maintainability, and scalability.",
    },
    {
      category: "Pseudocode Analysis",
      description: "Breaking down algorithms and logic flows into human-readable steps before implementation to catch potential issues early.",
    },
    {
      category: "Assumption Testing",
      description: "Identifying and validating implicit assumptions in code, testing edge cases, and verifying expected behaviors.",
    },
    {
      category: "Refactoring",
      description: "Restructuring existing code to improve readability, maintainability, and performance without changing its external behavior.",
    },
    {
      category: "Performance Tuning",
      description: "Identifying bottlenecks, optimizing resource usage, and improving execution speed through targeted improvements.",
    },
    {
      category: "Prompt Iteration",
      description: "Refining and improving debugging prompts to get more accurate and actionable responses from AI models.",
    },
    {
      category: "Test Generation",
      description: "Creating comprehensive test suites that cover edge cases, error conditions, and expected behaviors.",
    },
    {
      category: "Environment Debugging",
      description: "Troubleshooting issues related to development environments, dependencies, and configuration settings.",
    },
    {
      category: "Security Analysis",
      description: "Identifying potential security vulnerabilities, reviewing authentication flows, and validating data protection measures.",
    },
    {
      category: "Edge Case Handling",
      description: "Systematically identifying and addressing boundary conditions, unexpected inputs, and error scenarios.",
    },
    {
      category: "Logic Breakdown",
      description: "Decomposing complex algorithms and business logic into smaller, verifiable components for easier debugging.",
    },
    {
      category: "Dependency Debugging",
      description: "Resolving issues with external libraries, version conflicts, and integration points between different modules.",
    },
    {
      category: "Code Optimization",
      description: "Improving code efficiency, reducing complexity, and enhancing maintainability through targeted refactoring.",
    },
]

export function ModelCompare() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-[#00F3FF] hover:text-[#00F3FF]/80 p-0">
          Categories
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-[#00F3FF]">Debugging Categories</DialogTitle>
          <DialogDescription className="text-gray-300">
            Different approaches to debugging and their descriptions.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#00F3FF]">Category</TableHead>
                <TableHead className="text-[#00F3FF]">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData.map((row) => (
                <TableRow key={row.category}>
                  <TableCell className="font-medium">{row.category}</TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 