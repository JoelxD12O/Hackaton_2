// src/components/Filters/YearMonthFilter.tsx
interface YearMonthFilterProps {
  year: number
  month: number
  onYearChange: (y: number) => void
  onMonthChange: (m: number) => void
}

export function YearMonthFilter({
  year, month, onYearChange, onMonthChange
}: YearMonthFilterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex gap-4 mb-6 justify-center">
      <label>
        Año:{' '}
        <select
          value={year}
          onChange={e => onYearChange(+e.target.value)}
          className="border p-2 rounded"
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const y = currentYear - i
            return <option key={y} value={y}>{y}</option>
          })}
        </select>
      </label>

      <label>
        Mes:{' '}
        <select
          value={month}
          onChange={e => onMonthChange(+e.target.value)}
          className="border p-2 rounded"
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const m = i + 1
            return <option key={m} value={m}>{String(m).padStart(2, '0')}</option>
          })}
        </select>
      </label>
    </div>
  )
}
