export const dynamic = 'force-dynamic'

// Simple in-app SSE endpoint for local/dev usage
export async function GET(request: Request): Promise<Response> {
  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      // Send an initial event so client can confirm connection
      const sendEvent = (event: unknown) => {
        const payload = `data: ${JSON.stringify(event)}\n\n`
        controller.enqueue(encoder.encode(payload))
      }

      // Initial hello
      sendEvent({ type: 'hello', timestamp: Date.now() })

      // Heartbeat every 15s to keep the connection alive
      const heartbeatId = setInterval(() => {
        sendEvent({ type: 'heartbeat', timestamp: Date.now() })
      }, 15000)

      // If client closes, stop intervals
      const abort = (reason?: unknown) => {
        clearInterval(heartbeatId)
        try {
          controller.close()
        } catch {}
      }

      // Wire abort to request signal if available
      try {
        const maybeAny = request as unknown as { signal?: AbortSignal }
        maybeAny.signal?.addEventListener('abort', () => abort('signal-abort'))
      } catch {}
    },
    cancel() {
      // stream cancelled by client
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      // Allow cross-origin during dev; adjust for prod as needed
      'Access-Control-Allow-Origin': '*',
    },
  })
}


