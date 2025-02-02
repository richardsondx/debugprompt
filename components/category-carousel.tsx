import { Button } from "@/components/ui/button"

const categories = [
  "Error Diagnosis",
  "Data Flow Tracing",
  "Approach Comparison",
  "Pseudocode Analysis",
  "Assumption Testing",
]

export default function CategoryCarousel() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Categories</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className="border-[#00F3FF] text-[#00F3FF] hover:bg-[#00F3FF] hover:text-black whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  )
}

