interface ProductSpecsProps {
  specs: Record<string, string | undefined>
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  const specEntries = Object.entries(specs).filter(([_, value]) => value)

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900">Thông số nổi bật</h3>
      <div className="space-y-2">
        {specEntries.map(([key, value]) => (
          <div key={key} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">🔹</span>
            <div>
              <p className="text-sm text-gray-600 capitalize">{key}</p>
              <p className="font-medium text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
