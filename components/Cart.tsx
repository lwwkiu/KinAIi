
import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Minus, ShoppingBag, GripHorizontal } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onConfirm: () => void;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onConfirm, onClose }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Dragging State
  const [position, setPosition] = useState<{x: number, y: number} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{x: number, y: number} | null>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (cartRef.current) {
      setIsDragging(true);
      const rect = cartRef.current.getBoundingClientRect();
      dragStart.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragStart.current) {
        const newX = e.clientX - dragStart.current.x;
        const newY = e.clientY - dragStart.current.y;
        
        // Boundary checks (optional, but good for UX)
        const maxX = window.innerWidth - (cartRef.current?.offsetWidth || 320);
        const maxY = window.innerHeight - (cartRef.current?.offsetHeight || 400);

        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (items.length === 0) return null;

  const style = position ? {
    left: `${position.x}px`,
    top: `${position.y}px`,
    bottom: 'auto',
    right: 'auto'
  } : {}; // Default class styles apply if no position set

  return (
    <div 
      ref={cartRef}
      style={style}
      className={`fixed z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[80vh] ${!position ? 'bottom-4 left-4' : ''}`}
    >
      <div 
        className="bg-brand-green p-3 flex items-center justify-between text-white cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
            <GripHorizontal size={18} className="opacity-70" />
            <ShoppingBag size={20} />
            <h3 className="font-bold">My Cart</h3>
        </div>
        <div className="flex items-center gap-3">
            <span className="font-mono font-bold">{total} c</span>
            <button onClick={onClose} className="hover:bg-brand-darkGreen rounded p-0.5">
                <X size={18} />
            </button>
        </div>
      </div>

      <div className="overflow-y-auto p-2 space-y-2 flex-1 bg-white">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
            <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
              <X size={16} />
            </button>
            <div className="flex-1">
                <p className="text-sm font-medium leading-tight line-clamp-1">{item.name}</p>
                <p className="text-xs text-gray-500">{item.price} c</p>
            </div>
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                    <Minus size={12} />
                </button>
                <span className="text-sm w-4 text-center">{item.quantity}</span>
                <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-6 h-6 rounded-full bg-brand-green text-white flex items-center justify-center hover:bg-brand-darkGreen"
                >
                    <Plus size={12} />
                </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <button 
            onClick={onConfirm}
            className="w-full bg-brand-orange text-white py-2 rounded-lg font-bold hover:bg-blue-400 transition-colors shadow-md"
        >
            Confirm Order
        </button>
      </div>
    </div>
  );
};
