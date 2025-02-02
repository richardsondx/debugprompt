import { Card, CardContent } from "@/components/ui/card"

const videos = [
  {
    id: "1",
    title: "Cursor AI for Beginners: A Complete Guide",
    videoId: "YG459bD8qmw",
    author: {
      name: "Richardson Dackam",
    },
    description:
      "Are you new to Cursor AI and wondering how to get started? In this video you'll learn exactly how to use Cursor AI (No Experience Needed).",
  },
  // Add more videos here
]

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

