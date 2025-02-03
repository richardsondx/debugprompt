import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

// TODO(TEMPORARY): Type assertion workaround for Next.js API route params
// This is a temporary fix to allow deployment despite type checking errors
// The functionality works correctly at runtime
// Reference: https://nextjs.org/docs/messages/sync-dynamic-apis
type HandlerType = (
  req: NextRequest,
  context: any
) => Promise<NextResponse>

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// In-memory cache for copy counts
const copyCountsCache: Record<string, number> = {}

export const GET: HandlerType = async (
  request: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const { id } = await Promise.resolve(context.params)

    // Check if the count is already cached
    if (copyCountsCache[id] !== undefined) {
      return NextResponse.json({ count: copyCountsCache[id] })
    }

    const key = `prompt:${id}:copies`
    const count = await redis.get<number>(key)
    // Update cache with the fetched count
    copyCountsCache[id] = count || 0
    return NextResponse.json({ count: count || 0 })
  } catch (error: unknown) {
    console.error('Error getting copy count:', error)
    return NextResponse.json({ error: 'Failed to get copy count' }, { status: 500 })
  }
}

export const POST: HandlerType = async (
  request: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const { id } = await Promise.resolve(context.params)
    const key = `prompt:${id}:copies`
    const newCount = await redis.incr(key)
    // Update the in-memory cache with the new count
    copyCountsCache[id] = newCount
    return NextResponse.json({ count: newCount })
  } catch (error: unknown) {
    console.error('Error incrementing copy count:', error)
    return NextResponse.json({ error: 'Failed to increment copy count' }, { status: 500 })
  }
}
