import { Card, CardContent } from "@/components/ui/card"
import videos from "@/data/videos.json"

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#00F3FF] mb-8">Learn Debugging</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {videos.map((video) => (
          <Card key={video.id} className="bg-black/50 border-[#00F3FF]/20 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-[#00F3FF] line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-400">{video.author.name}</p>
                <p className="text-sm text-gray-400 line-clamp-2">{video.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

