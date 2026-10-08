'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

type SelectFieldProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
  // Classes shared with the form's other fields.
  className: string;
};

// A dropdown drawn by the page itself rather than by the browser. The browser's own list
// ignores the page's width, so it could spill outside a phone-size layout; this one always
// matches the field it belongs to.
export default function SelectField({ id, value, onChange, placeholder, options, className }: SelectFieldProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // Arrow keys step through the choices without opening the list, like a native dropdown.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const next = options.indexOf(value) + (e.key === 'ArrowDown' ? 1 : -1);
    if (next >= 0 && next < options.length) onChange(options[next]);
  };

  const choose = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onKeyDown}
        className={`${className} flex items-center justify-between gap-3 text-start`}
      >
        <span className={value ? '' : 'text-slate-400'}>{value || placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 flex-none text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          id={`${id}-list`}
          role="listbox"
          className="absolute inset-x-0 top-full z-20 mt-2 max-h-64 overflow-y-auto rounded-xl border border-sand-200 bg-white p-1.5 shadow-[0_18px_40px_rgba(11,18,32,0.18)]"
        >
          {options.map((option) => (
            <li key={option} role="option" aria-selected={option === value}>
              <button
                type="button"
                onClick={() => choose(option)}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-start text-[15px] transition-colors ${
                  option === value ? 'bg-ink-900 font-bold text-gold-400' : 'text-ink-900 hover:bg-sand-100'
                }`}
              >
                {option}
                {option === value && <Check className="h-4 w-4 flex-none" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
