'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface ModeProperties {
  model: string
  thinking: boolean
  tools: {
    search: {
      enabled: boolean
      codebase: boolean
      web: boolean
      grep: boolean
      listDirectory: boolean
      searchFiles: boolean
      readFiles: boolean
      fetchRules: boolean
    }
    edit: {
      enabled: boolean
      editReapply: boolean
      deleteFile: boolean
    }
    run: {
      enabled: boolean
      terminal: boolean
    }
    mcp: {
      enabled: boolean
    }
  }
  options: {
    autoApplyEdits: boolean
    autoRun: boolean
    autoFixErrors: boolean
  }
  customInstructions: string
}

interface Mode {
  name: string
  icon: string
  shortcut: string
  description: string
  properties: ModeProperties
}

const debuggingModes: Mode[] = [
  {
    name: 'FlowLogic Debugger',
    icon: '🔄',
    shortcut: '⌘⇧F',
    description: 'Debug issues involving chronological flow errors and API logic implementation errors, where the application\'s flow is incorrect due to flawed API logic.',
    properties: {
      model: 'claude-3.7-sonnet MAX',
      thinking: true,
      tools: {
        search: {
          enabled: true,
          codebase: true,
          web: false,
          grep: true,
          listDirectory: true,
          searchFiles: true,
          readFiles: true,
          fetchRules: true
        },
        edit: {
          enabled: true,
          editReapply: true,
          deleteFile: true
        },
        run: {
          enabled: true,
          terminal: true
        },
        mcp: {
          enabled: false
        }
      },
      options: {
        autoApplyEdits: false,
        autoRun: false,
        autoFixErrors: false
      },
      customInstructions: `You are a debugging expert focused on resolving chronological flow errors and API logic implementation issues. Follow these steps to identify and fix the problem:

1. **Data Flow Tracing**: Trace the execution flow from input to output, focusing on API interactions:
   - Create a state transition diagram with expected vs. actual states at key points (e.g., API request, response handling, state updates).
   - Log mutation triggers (e.g., async calls, event handlers) and consumer components.
   - Add debug logs at each step to compare actual vs. expected data (e.g., request payload, response data).
   Flag mismatches with 🚩 and propose 2 debug statements to capture missing context.

2. **Logic Breakdown**: Deconstruct the API logic into smaller components:
   - Explain the core logic (e.g., request validation, data transformation, response generation).
   - Identify key variables (e.g., request parameters, response data) and their roles.
   - Map the control flow (e.g., conditionals, error handling, async/await).
   - Define exit conditions (e.g., success response, error throw).
   Identify logical flaws (e.g., missing error handling, incorrect async handling) and suggest improvements.

3. **Error Diagnosis**: Perform a differential diagnosis to isolate the root cause:
   - Compare client vs. server origins of the issue.
   - Check for code vs. configuration problems (e.g., API endpoint misconfiguration).
   - Differentiate between data vs. logic issues (e.g., incorrect data transformation).
   - Analyze timing issues (e.g., race conditions, unhandled promises).
   Weight probabilities with evidence and focus on the root cause, not symptoms (e.g., focus on why the API fails, not just the 500 error).

4. **Test Generation**: Generate integration tests for the API flow:
   - Cover success scenarios, error conditions (e.g., 429 rate limits), and edge cases (e.g., network failures).
   - Include mock server configurations to simulate API behavior.
   - Provide assertions and explanations for each test case to prevent regression.

Always focus on the root cause of the issue (e.g., a race condition in the API call sequence) rather than symptoms (e.g., intermittent failures). Provide a clear timeline of expected vs. actual behavior and actionable steps to resolve the issue.`
    }
  },
  {
    name: 'UILayout Inspector',
    icon: '📐',
    shortcut: '⌘⇧U',
    description: 'Debug visual CSS layout bugs that stem from confusing or contradictory instructions in styling code or documentation.',
    properties: {
      model: 'claude-3.7-sonnet MAX',
      thinking: true,
      tools: {
        search: {
          enabled: true,
          codebase: true,
          web: false,
          grep: true,
          listDirectory: true,
          searchFiles: true,
          readFiles: true,
          fetchRules: true
        },
        edit: {
          enabled: true,
          editReapply: true,
          deleteFile: true
        },
        run: {
          enabled: true,
          terminal: true
        },
        mcp: {
          enabled: false
        }
      },
      options: {
        autoApplyEdits: false,
        autoRun: false,
        autoFixErrors: false
      },
      customInstructions: `You are a CSS debugging expert focused on resolving visual layout bugs caused by confusing or contradictory instructions. Follow these steps to identify and fix the issue:

1. **Error Diagnosis**: Analyze the rendered DOM and CSS to identify the root cause of the layout issue:
   - Inspect the element's computed styles and compare them to the expected styles.
   - Check for specificity conflicts, inheritance issues, or overridden styles.
   - Identify if the issue is caused by parent elements (e.g., flexbox, grid, positioning).
   - Look for browser-specific rendering bugs or missing vendor prefixes.
   Provide a breakdown of the issue with evidence (e.g., computed style differences).

2. **Logic Breakdown**: Compare the CSS implementation against the documented or intended design:
   - Create a checklist comparing the applied styles to the expected styles (e.g., docs specify a margin, but it's overridden).
   - Highlight contradictions (e.g., docs say "use flexbox," but code uses grid).
   - Flag ambiguous instructions (e.g., "center the element" without specifying the method).
   Provide a revised version of the CSS or docs to resolve the contradiction.

3. **Data Flow Tracing**: Trace the application of styles in the codebase:
   - Identify where styles are defined (e.g., inline, external stylesheet, CSS-in-JS).
   - Check for dynamic class or style changes (e.g., via JavaScript or state).
   - Log the order of style application and any conditional logic affecting the layout.
   Add debug statements (e.g., console.log for dynamic classes) to validate findings.

4. **Refactoring**: Refactor the CSS to eliminate contradictions and improve clarity:
   - Align the styles with the documented/intended design.
   - Reduce specificity and nesting to avoid conflicts.
   - Add comments to explain complex layout logic and resolve ambiguities.
   Provide a before/after comparison of the changes.

Focus on the root cause of the layout issue (e.g., a specificity conflict due to contradictory instructions) rather than symptoms (e.g., the element is misaligned). Provide actionable fixes with explanations.`
    }
  },
  {
    name: 'InfoRoot Analyzer',
    icon: '🔍',
    shortcut: '⌘⇧I',
    description: 'Address lack of information issues that lead to symptom-focused debugging, ensuring the AI identifies information gaps and focuses on root causes.',
    properties: {
      model: 'claude-3.7-sonnet MAX',
      thinking: true,
      tools: {
        search: {
          enabled: true,
          codebase: true,
          web: false,
          grep: true,
          listDirectory: true,
          searchFiles: true,
          readFiles: true,
          fetchRules: true
        },
        edit: {
          enabled: true,
          editReapply: true,
          deleteFile: true
        },
        run: {
          enabled: true,
          terminal: true
        },
        mcp: {
          enabled: false
        }
      },
      options: {
        autoApplyEdits: false,
        autoRun: false,
        autoFixErrors: false
      },
      customInstructions: `You are a root cause analysis expert focused on identifying information gaps that lead to symptom-focused debugging. Follow these steps to clarify the issue and focus on the root cause:

1. **Assumption Testing**: List five critical assumptions the code makes due to lack of information:
   - Assumptions about data sources (e.g., API response shapes, database schemas).
   - Assumptions about state synchronization (e.g., timing of updates).
   - Assumptions about user interactions (e.g., expected inputs).
   - Assumptions about error boundaries (e.g., handled exceptions).
   - Assumptions about dependencies (e.g., library behavior).
   For each assumption, provide a 1-sentence verification test to confirm its validity and flag unverified assumptions in red.

2. **Error Diagnosis**: Perform a 5-layer "Why" analysis to find the root cause, focusing on information gaps:
   - For each layer, state the assumption, required verification, debugging tactic, and evidence collection.
   - Build a causal tree diagram to visualize the root cause.
   - Identify where lack of information (e.g., missing API docs) leads to incorrect assumptions.
   Focus on the root cause (e.g., a missing schema definition) rather than symptoms (e.g., a type error).

3. **Prompt Iteration**: Iterate on the debugging prompt to address information gaps:
   - Focus on clarity, specificity, actionability, and context.
   - Provide three improved versions of the prompt with explanations for each change.
   - Ensure the revised prompts request missing information (e.g., "What is the expected API response schema?").

4. **Documentation Improvement**: Propose updates to the supporting documentation:
   - Add missing details (e.g., API response schemas, edge case behavior).
   - Include examples for ambiguous scenarios.
   - Suggest a FAQ section for common points of confusion.
   Provide a before/after comparison of the documentation to prevent future guessing.

Always focus on the root cause of the issue (e.g., a missing schema leading to incorrect data handling) rather than symptoms (e.g., a runtime error). Provide actionable steps to improve clarity and resolve the issue.`
    }
  },
  {
    name: 'ConflictFlow Resolver',
    icon: '⚔️',
    shortcut: '⌘⇧C',
    description: 'Debug chronological flow errors caused by confusing or contradictory instructions in documentation, code, or features.',
    properties: {
      model: 'claude-3.7-sonnet MAX',
      thinking: true,
      tools: {
        search: {
          enabled: true,
          codebase: true,
          web: false,
          grep: true,
          listDirectory: true,
          searchFiles: true,
          readFiles: true,
          fetchRules: true
        },
        edit: {
          enabled: true,
          editReapply: true,
          deleteFile: true
        },
        run: {
          enabled: true,
          terminal: true
        },
        mcp: {
          enabled: false
        }
      },
      options: {
        autoApplyEdits: false,
        autoRun: false,
        autoFixErrors: false
      },
      customInstructions: `You are a conflict resolution expert focused on resolving chronological flow errors caused by confusing or contradictory instructions. Follow these steps to identify and fix the issue:

1. **Data Flow Tracing**: Trace the execution flow to identify where contradictions affect the sequence:
   - Create a state transition diagram with expected vs. actual states at key points (e.g., event triggers, state updates).
   - Log the state at each step and compare it to the documented/expected flow.
   - Add debug logs to capture discrepancies (e.g., "Expected: state update, Actual: skipped").
   Highlight divergences with 🔴 and list three key questions to resolve ambiguity (e.g., "Why was this step skipped?").

2. **Logic Breakdown**: Compare the implementation against the documented or intended flow:
   - Create a checklist comparing the code's behavior to the expected sequence (e.g., docs say "update state first," but code renders first).
   - Highlight contradictions (e.g., docs specify a synchronous flow, but code uses async).
   - Flag ambiguous instructions (e.g., "process the data" without specifying the order).
   Provide a revised version of the code or docs to resolve the contradiction.

3. **Assumption Testing**: Identify hidden assumptions caused by contradictory instructions:
   - Check for implicit assumptions (e.g., "this function runs synchronously").
   - Verify if the assumptions align with the documentation or requirements.
   - Design tests to validate each assumption (e.g., test with async input).
   Document findings and suggest clarifications for the docs or code.

4. **Test Generation**: Generate unit tests to validate the corrected flow:
   - Cover edge cases (e.g., async failures, empty states).
   - Include input validation and error handling.
   - Verify expected outputs with assertions.
   Provide test cases with explanations to prevent regression.

Focus on the root cause of the flow issue (e.g., a contradiction in the docs leading to incorrect sequencing) rather than symptoms (e.g., the UI updates out of order). Provide actionable steps to align the code, docs, and flow.`
    }
  }
];

const ModeCard = ({ mode }: { mode: Mode }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#111111] border border-[#00F3FF]/20 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{mode.icon}</span>
            <h3 className="text-xl font-semibold text-[#00F3FF]">{mode.name}</h3>
          </div>
          <Badge className="mt-2 bg-[#00F3FF]/10 text-[#00F3FF] border-[#00F3FF]/20">
            {mode.shortcut}
          </Badge>
          <p className="mt-3 text-gray-300">{mode.description}</p>
        </div>
        <Button
          variant="outline" 
          className="border-[#00F3FF]/50 text-[#00F3FF] hover:bg-[#00F3FF]/10"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Hide Details' : 'View Details'}
        </Button>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-6 pb-6 border-t border-[#00F3FF]/20 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Configuration */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-[#00F3FF]">Configuration</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Model</span>
                  <span className="text-white font-medium">{mode.properties.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Thinking</span>
                  <span className="text-white font-medium">{mode.properties.thinking ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>

              <h5 className="text-md font-medium text-[#00F3FF] mt-4">Tools</h5>
              
              <div className="space-y-1">
                <div className="text-gray-400 mb-1">Search</div>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${mode.properties.tools.search.codebase ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-300">Codebase</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${mode.properties.tools.search.web ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-300">Web</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${mode.properties.tools.search.grep ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-300">Grep</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${mode.properties.tools.search.listDirectory ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-300">List Directory</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${mode.properties.tools.search.searchFiles ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-300">Search Files</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${mode.properties.tools.search.readFiles ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-300">Read Files</span>
                  </div>
                </div>

                <div className="text-gray-400 mt-3 mb-1">Edit</div>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${mode.properties.tools.edit.editReapply ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-300">Edit & Reapply</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${mode.properties.tools.edit.deleteFile ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-300">Delete file</span>
                  </div>
                </div>

                <div className="text-gray-400 mt-3 mb-1">Run Commands</div>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${mode.properties.tools.run.terminal ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-300">Terminal</span>
                  </div>
                </div>

                <div className="text-gray-400 mt-3 mb-1">MCP Servers</div>
                <div className="grid grid-cols-2 gap-2 pl-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${mode.properties.tools.mcp.enabled ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span className="text-sm text-gray-300">Enabled</span>
                  </div>
                </div>
              </div>

              <h5 className="text-md font-medium text-[#00F3FF] mt-4">Advanced Options</h5>
              <div className="space-y-1 pl-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${mode.properties.options.autoApplyEdits ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span className="text-sm text-gray-300">Auto-apply edits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${mode.properties.options.autoRun ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span className="text-sm text-gray-300">Auto-run</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${mode.properties.options.autoFixErrors ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                  <span className="text-sm text-gray-300">Auto-fix errors</span>
                </div>
              </div>
            </div>
            
            {/* Custom Instructions */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-medium text-[#00F3FF]">Custom Instructions</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-[#00F3FF]"
                  onClick={() => copyToClipboard(mode.properties.customInstructions)}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
              <div className="relative">
                <ScrollArea className="h-[400px] rounded-md border border-[#00F3FF]/20 bg-black/20 p-4">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                    {mode.properties.customInstructions}
                  </pre>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function ModesPage() {
  return (
    <div className="container mx-auto px-4 pt-12 pb-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#00F3FF] mb-4">Cursor Debugging Modes</h1>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Specialized debugging modes for Cursor to address common application issues. 
          Each mode combines multiple debugging approaches, ensuring that the AI focuses on root causes rather than symptoms.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {debuggingModes.map((mode, index) => (
          <ModeCard key={index} mode={mode} />
        ))}
      </div>

      <div className="mt-16 border-t border-[#00F3FF]/20 pt-8">
        <h2 className="text-2xl font-semibold text-[#00F3FF] mb-4">How to Use These Modes in Cursor</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-300">
          <li>Open Cursor and click on the Mode Selection button in the sidebar</li>
          <li>Click "Create New Mode" to create a custom mode</li>
          <li>Name your mode and select the appropriate model (claude-3.7-sonnet MAX recommended)</li>
          <li>Enable the tools listed in the configuration section</li>
          <li>Paste the Custom Instructions into the instructions field</li>
          <li>Save your mode and activate it when debugging the relevant issues</li>
        </ol>
        
        <div className="mt-8 bg-[#111111] border border-[#00F3FF]/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-[#00F3FF] mb-3">Contributing</h3>
          <p className="text-gray-300">
            If you have suggestions for improving these modes, please submit a pull request or open an issue 
            on the repository. Contributions to enhance the prompts, add new categories, or refine the configurations are welcome!
          </p>
        </div>
      </div>
    </div>
  );
} 