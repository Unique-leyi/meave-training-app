import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Option {
  value: string
  label: string
  group?: string
}

interface SearchableSelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const SearchableSelect = ({ options, value, onChange, placeholder = 'Select an option', className = '' }: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(opt => opt.value === value)

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(search.toLowerCase()) ||
    (opt.group && opt.group.toLowerCase().includes(search.toLowerCase()))
  )

  // Grouped options logic
  const groups = Array.from(new Set(options.map(opt => opt.group).filter(Boolean)))

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="meave-input flex items-center justify-between text-left"
      >
        <span className={!selectedOption ? 'text-slate-300' : 'text-slate-900'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`size-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-[100] top-full mt-3 w-full bg-white border border-slate-100 rounded-[2rem] shadow-2xl shadow-slate-200/60 overflow-hidden p-2"
          >
            <div className="relative mb-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-300" />
              <input
                autoFocus
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 pl-11 pr-4 bg-slate-50 border-none rounded-xl font-bold text-sm text-slate-900 outline-none focus:bg-slate-100 transition-all"
              />
            </div>

            <div className="max-h-[280px] overflow-y-auto no-scrollbar">
              {filteredOptions.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-xs font-medium text-slate-400 italic">No results found</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {/* If there are groups, render them separately */}
                  {groups.length > 0 ? (
                    groups.map(group => {
                      const groupOptions = filteredOptions.filter(opt => opt.group === group)
                      if (groupOptions.length === 0) return null
                      return (
                        <div key={group}>
                          <div className="px-4 py-2">
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{group}</span>
                          </div>
                          {groupOptions.map(opt => (
                            <OptionItem 
                              key={opt.value} 
                              opt={opt} 
                              isSelected={value === opt.value} 
                              onSelect={() => {
                                onChange(opt.value)
                                setIsOpen(false)
                                setSearch('')
                              }} 
                            />
                          ))}
                        </div>
                      )
                    })
                  ) : (
                    filteredOptions.map(opt => (
                      <OptionItem 
                        key={opt.value} 
                        opt={opt} 
                        isSelected={value === opt.value} 
                        onSelect={() => {
                          onChange(opt.value)
                          setIsOpen(false)
                          setSearch('')
                        }} 
                      />
                    ))
                  )}
                  
                  {/* Render options without groups */}
                  {filteredOptions.filter(opt => !opt.group).map(opt => (
                    <OptionItem 
                      key={opt.value} 
                      opt={opt} 
                      isSelected={value === opt.value} 
                      onSelect={() => {
                        onChange(opt.value)
                        setIsOpen(false)
                        setSearch('')
                      }} 
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const OptionItem = ({ opt, isSelected, onSelect }: any) => (
  <button
    onClick={onSelect}
    className={`
      w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium text-sm group
      ${isSelected ? 'bg-primary-950 text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
    `}
  >
    {opt.label}
    {isSelected && (
      <div className="size-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
        <Check className="size-3 text-white" strokeWidth={4} />
      </div>
    )}
  </button>
)

export default SearchableSelect
