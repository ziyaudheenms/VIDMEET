import { Skeleton } from "@/components/ui/skeleton"

export function Loader() {
  return (
    <div className="flex items-center space-x-4 h-screen w-full justify-center">
      <Skeleton className="animate-bounce">
        <img src="https://img.icons8.com/?size=100&id=hCvhdugyicF1&format=png&color=000000" alt="" />
    </Skeleton> 
      
    </div>
  )
}
