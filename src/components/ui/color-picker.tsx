'use client';

import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Input } from './input';

interface ColorPickerProps {
  color: string;
  className?: string;
  placeholder?: string;
  onChange: (color: string) => void;
  'aria-invalid'?: boolean;
}

export function ColorPicker({ color, onChange, className = '', placeholder }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(color);

  // Update input value when color changes externally
  useEffect(() => {
    setInputValue(color);
  }, [color]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Validate and update if it's a valid hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      onChange(value);
    }
  };

  const handleInputBlur = () => {
    // Reset to current color if invalid
    if (!/^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
      setInputValue(color);
    }
  };

  const presetColors = [
    '#000000',
    '#FFFFFF',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
    '#FF8A5C',
    '#A29BFE',
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div className="flex h-11.5 w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 p-2">
              <div
                className="aspect-square h-full rounded-sm border p-1 transition-colors"
                style={{
                  backgroundColor: color,
                  borderColor: color === '#FFFFFF' ? '#E5E7EB' : color,
                }}
              />
              {color ? (
                <p className="text-sm uppercase">{color}</p>
              ) : (
                <p className="text-sm text-slate-400">{placeholder}</p>
              )}
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-min p-3" align="start">
            <div className="space-y-3">
              <HexColorPicker color={color} onChange={onChange} />

              <div className="flex items-center gap-2">
                <Input
                  maxLength={7}
                  value={inputValue}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
                  className="uppercase"
                  placeholder="#000000"
                />
                <div
                  className="size-11.5 shrink-0 rounded-lg border"
                  style={{ backgroundColor: color }}
                />
              </div>

              <div className="flex flex-wrap gap-1">
                {presetColors.map((preset) => (
                  <button
                    key={preset}
                    className={`h-6 w-6 rounded border transition-transform hover:scale-110 ${
                      color === preset ? 'ring-primary ring-2 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: preset }}
                    onClick={() => {
                      onChange(preset);
                      setInputValue(preset);
                    }}
                    title={preset}
                  >
                    <span className="sr-only">{preset}</span>
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
