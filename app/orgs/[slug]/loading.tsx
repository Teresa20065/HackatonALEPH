export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button Skeleton */}
        <div className="mb-6">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Header Skeleton */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Image Skeleton */}
          <div className="lg:col-span-1">
            <div className="h-80 lg:h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>

          {/* Content Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="w-3/4 h-12 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="w-24 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Cards Skeleton */}
            <div className="space-y-4">
              <div className="p-6 bg-white/80 rounded-lg border-0 shadow-lg">
                <div className="w-32 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-4">
                  <div>
                    <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-16 h-3 bg-gray-200 rounded mt-2 animate-pulse"></div>
                  </div>
                  <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="p-6 bg-white/80 rounded-lg border-0 shadow-lg">
                <div className="w-32 h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="text-center p-4 bg-gray-100 rounded-lg">
                      <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2 animate-pulse"></div>
                      <div className="w-20 h-5 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Goals Section Skeleton */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="w-48 h-8 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-5 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 bg-white rounded-lg shadow-lg">
                <div className="w-48 h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
                <div className="w-full h-4 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="text-center">
          <div className="p-8 bg-gradient-to-r from-green-50 to-amber-50 rounded-lg border-0 shadow-xl">
            <div className="w-64 h-8 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-5 bg-gray-200 rounded mx-auto mb-6 animate-pulse"></div>
            <div className="w-32 h-12 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
