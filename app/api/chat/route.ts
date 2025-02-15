import { generateText } from 'ai'
import { google } from '@ai-sdk/google'
import categoriesData from '@/data/categories.json'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const lastMessage = messages[messages.length - 1].content

    const categories = categoriesData as string[]

    const prompt = `You are a debugging prompt generator. Analyze this issue and generate a debugging prompt:
${lastMessage}

Based on our categories (${categories.join(', ')}), generate a debugging prompt that matches the style of these examples:

Example 1: "Analyze this TypeScript error. \n\nBreak down the error message into its core components: \n1) What is the type mismatch? \n2) Where is it occurring? \n3) What are the possible causes? \n4) Provide three potential fixes with pros and cons for each."

Example 2: "Trace the data flow in this React component. \n\nIdentify: \n1) Where state is initialized \n2) How props are passed down \n3) Where side effects occur \n4) How data flows between parent and child components. \n\nAdd console.log statements to validate your findings."

Your response should:
1. Be concise and focused
2. Use numbered lists for steps
3. Include validation points
4. Use \n for line breaks

Format your response EXACTLY like this, with no additional text:
[The debugging prompt with proper line breaks and formatting]`

    const { text } = await generateText({
      model: google('gemini-pro'),
      prompt,
      temperature: 0.7, // Add some creativity while maintaining structure
      topP: 0.8,
      maxTokens: 500,
    })

    return new Response(JSON.stringify({ content: text }), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error in chat route:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate response' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
} 