import React from 'react';
import { PALETTE_ITEMS } from '../../constants/paletteItems';
import { PaletteItem } from '../../types';

interface PaletteProps {
  onDragStart: (event: React.DragEvent, item: PaletteItem) => void;
}

/**
 * Node Palette Component
 * Displays draggable cloud architecture components on the left side
 */
const Palette: React.FC<PaletteProps> = ({ onDragStart }) => {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-300 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Node Palette</h2>
        <div className="space-y-2">
          {PALETTE_ITEMS.map((item) => (
            <div
              key={item.type}
              draggable
              onDragStart={(e) => onDragStart(e, item)}
              className="bg-white border-2 border-gray-300 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div className="font-medium text-sm text-gray-800">
                {item.label}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Drag to canvas
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Palette;

