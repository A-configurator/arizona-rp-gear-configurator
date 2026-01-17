import { useState, useCallback, useMemo } from 'react';
import { Accessory, accessories, calculateTotalStats, SLOT_NAMES, AccessoryStats } from '@/data/accessories';
import { X, Minus, Plus, Search } from 'lucide-react';

// Skin images
import spaceFarmerImg from '@/assets/skins/space-farmer.png';
import suidniSweeneyImg from '@/assets/skins/suidni-sweeney.png';
import antManImg from '@/assets/skins/ant-man.png';
import meguImg from '@/assets/skins/megu.png';
import bloodAngelImg from '@/assets/skins/blood-angel.png';
import spaceMarineImg from '@/assets/skins/space-marine.png';
import altGirlImg from '@/assets/skins/alt-girl.png';
import spetsnazImg from '@/assets/skins/spetsnaz.png';
import deadpoolImg from '@/assets/skins/deadpool.png';
import danjiImg from '@/assets/skins/danji.png';

// Skins data
export interface SkinStats {
  defense?: number;
  damage?: number;
  reflect?: number;
  maxArmor?: number;
}

export interface Skin {
  id: number;
  name: string;
  image: string;
  stats: SkinStats;
}

const skins: Skin[] = [
  { id: 1, name: 'Космический Фермер', image: spaceFarmerImg, stats: { defense: 2, damage: 2, reflect: 3, maxArmor: 50 } },
  { id: 2, name: 'Суидни Суини', image: suidniSweeneyImg, stats: { defense: 2, damage: 2, reflect: 3 } },
  { id: 3, name: 'Человек-муравей', image: antManImg, stats: { defense: 2, damage: 2, reflect: 3 } },
  { id: 4, name: 'Мэгу', image: meguImg, stats: { defense: 2, damage: 2, reflect: 3 } },
  { id: 5, name: 'Кровавый Ангел', image: bloodAngelImg, stats: { defense: 2, damage: 2, reflect: 3 } },
  { id: 6, name: 'Космодесантник', image: spaceMarineImg, stats: { defense: 2, damage: 2, reflect: 3 } },
  { id: 7, name: 'Альтушка', image: altGirlImg, stats: { maxArmor: 100 } },
  { id: 8, name: 'Спецназовец', image: spetsnazImg, stats: { defense: 2, damage: 2, reflect: 3 } },
  { id: 9, name: 'Дэдпул', image: deadpoolImg, stats: { damage: 2, reflect: 3 } },
  { id: 10, name: 'Данджи', image: danjiImg, stats: { defense: 2, damage: 2, reflect: 3 } },
];

// Skin selection modal
interface SkinModalProps {
  selectedSkinId: number;
  onSelect: (skin: Skin) => void;
  onClose: () => void;
}

const SkinModal = ({ selectedSkinId, onSelect, onClose }: SkinModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkins = useMemo(() => {
    if (!searchTerm.trim()) return skins;
    return skins.filter((skin) =>
      skin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md max-h-[70vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold arz-text-gradient">Выбор скина</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск скина..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        
        {/* Skins list */}
        <div className="flex-1 overflow-y-auto p-3 arz-scrollbar">
          <div className="grid grid-cols-3 gap-2">
            {filteredSkins.map((skin) => (
              <div
                key={skin.id}
                onClick={() => onSelect(skin)}
                className={`
                  p-2 bg-secondary rounded-lg cursor-pointer flex flex-col items-center gap-1
                  border-2 transition-all duration-200
                  ${selectedSkinId === skin.id ? 'border-primary arz-glow' : 'border-border hover:border-primary/50'}
                `}
              >
                <img src={skin.image} alt={skin.name} className="w-16 h-20 object-cover object-top rounded" />
                <div className="text-[10px] font-medium truncate w-full text-center">{skin.name}</div>
                <div className="text-[9px] text-primary/80 text-center leading-tight">
                  {skin.stats.defense && <span>🛡️{skin.stats.defense} </span>}
                  {skin.stats.damage && <span>⚔️{skin.stats.damage} </span>}
                  {skin.stats.reflect && <span>↩️{skin.stats.reflect} </span>}
                  {skin.stats.maxArmor && <span>🔰{skin.stats.maxArmor}</span>}
                </div>
              </div>
            ))}
          </div>
          
          {filteredSkins.length === 0 && (
            <div className="text-center text-muted-foreground py-8 text-sm">
              Ничего не найдено
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Slot selection modal - compact with search
interface SlotModalProps {
  slotNumber: number;
  accessories: Accessory[];
  equippedId: number | null;
  onSelect: (accessory: Accessory) => void;
  onUnequip: () => void;
  onClose: () => void;
}

const SlotModal = ({ slotNumber, accessories: slotAccessories, equippedId, onSelect, onUnequip, onClose }: SlotModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAccessories = useMemo(() => {
    if (!searchTerm.trim()) return slotAccessories;
    return slotAccessories.filter((acc) =>
      acc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [slotAccessories, searchTerm]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md max-h-[70vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold arz-text-gradient">{SLOT_NAMES[slotNumber]}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Unequip button if something is equipped */}
        {equippedId !== null && (
          <div className="p-3 border-b border-border">
            <button
              onClick={onUnequip}
              className="w-full py-2 px-4 bg-destructive/20 text-destructive border border-destructive/30 rounded-lg text-sm font-medium hover:bg-destructive/30 transition-colors"
            >
              Снять аксессуар
            </button>
          </div>
        )}

        {/* Search */}
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск аксессуара..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
        
        {/* Accessories list */}
        <div className="flex-1 overflow-y-auto p-3 arz-scrollbar">
          <div className="grid grid-cols-2 gap-2">
            {filteredAccessories.map((acc) => (
              <div
                key={acc.id}
                onClick={() => onSelect(acc)}
                className={`
                  p-3 bg-secondary rounded-lg cursor-pointer
                  border-2 transition-all duration-200
                  ${equippedId === acc.id ? 'border-primary arz-glow' : 'border-border hover:border-primary/50'}
                `}
              >
                <div className="text-xs font-medium truncate">{acc.name}</div>
              </div>
            ))}
          </div>
          
          {filteredAccessories.length === 0 && (
            <div className="text-center text-muted-foreground py-8 text-sm">
              {searchTerm ? 'Ничего не найдено' : 'Нет аксессуаров для этого слота'}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border text-center text-xs text-muted-foreground">
          Найдено: {filteredAccessories.length}
        </div>
      </div>
    </div>
  );
};

// Stats display component
const StatsDisplay = ({ stats }: { stats: AccessoryStats }) => {
  const statItems: { key: keyof AccessoryStats; label: string; format: (v: number) => string }[] = [
    { key: 'defense', label: 'Защита:', format: (v) => `[-${v}% урона]` },
    { key: 'regen', label: 'Регенерация:', format: (v) => `[${v} HP в мин.]` },
    { key: 'damage', label: 'Урон:', format: (v) => `[+${v} урона]` },
    { key: 'luck', label: 'Удача:', format: (v) => `[шанс ${v}% крит.урона]` },
    { key: 'maxHp', label: 'Макс. HP:', format: (v) => `[+${v} макс. HP]` },
    { key: 'maxArmor', label: 'Макс. Брони:', format: (v) => `[+${v} макс. Брони]` },
    { key: 'stunChance', label: 'Шанс оглушения:', format: (v) => `[+${v}%]` },
    { key: 'drunkChance', label: 'Шанс опьянения:', format: (v) => `[+${v}%]` },
    { key: 'antiStun', label: 'Шанс избежать оглушения:', format: (v) => `[+${v}%]` },
    { key: 'reflect', label: 'Отражение урона:', format: (v) => `[-${v}%]` },
    { key: 'block', label: 'Блокировка урона:', format: (v) => `[${v} раз]` },
    { key: 'fireRate', label: 'Скорострельность:', format: (v) => `[+${v}% скорострельности]` },
    { key: 'recoil', label: 'Отдача:', format: (v) => `[${v}% отдачи]` },
  ];

  return (
    <div className="space-y-1 text-sm">
      {statItems.map(({ key, label, format }) => (
        <div key={key} className="flex flex-wrap gap-1">
          <span className="font-medium">{label}</span>
          <span className={stats[key] !== 0 ? 'stat-positive' : 'stat-neutral'}>
            {format(stats[key])}
          </span>
        </div>
      ))}
    </div>
  );
};

// Equipment slot component
interface EquipmentSlotProps {
  slotNumber: number;
  equipped: Accessory | null;
  enhancement: number;
  onSlotClick: () => void;
  onEnhance: (delta: number) => void;
}

const EquipmentSlot = ({ slotNumber, equipped, enhancement, onSlotClick, onEnhance }: EquipmentSlotProps) => {
  return (
    <div className="flex flex-col">
      <div
        onClick={onSlotClick}
        className={`
          aspect-square bg-secondary rounded-lg flex items-center justify-center cursor-pointer
          border-2 transition-all duration-200 mb-1
          ${equipped ? 'border-primary/50' : 'border-border hover:border-primary/30'}
        `}
      >
        {equipped ? (
          <div className="text-center p-1">
            <div className="text-[10px] font-medium truncate px-1">{equipped.name}</div>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground">{SLOT_NAMES[slotNumber]}</div>
        )}
      </div>
      
      {/* Enhancement controls */}
      <div className="flex items-center justify-center gap-1">
        <span className="text-xs font-bold text-muted-foreground">N</span>
        <span className="text-xs font-medium text-primary">+{enhancement}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onEnhance(-1); }}
          className="w-5 h-5 bg-secondary rounded flex items-center justify-center hover:bg-secondary/80"
        >
          <Minus className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onEnhance(1); }}
          className="w-5 h-5 bg-secondary rounded flex items-center justify-center hover:bg-secondary/80"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

const Index = () => {
  const [equippedAccessories, setEquippedAccessories] = useState<(Accessory | null)[]>(Array(8).fill(null));
  const [enhancements, setEnhancements] = useState<number[]>(Array(8).fill(14));
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(skins[0] || null);
  const [showSkinModal, setShowSkinModal] = useState(false);

  const totalStats = calculateTotalStats(equippedAccessories);

  const handleEquip = useCallback((accessory: Accessory) => {
    setEquippedAccessories((prev) => {
      const newEquipped = [...prev];
      newEquipped[accessory.slot - 1] = accessory;
      return newEquipped;
    });
    setSelectedSlot(null);
  }, []);

  const handleUnequip = useCallback((slotIndex: number) => {
    setEquippedAccessories((prev) => {
      const newEquipped = [...prev];
      newEquipped[slotIndex] = null;
      return newEquipped;
    });
    setSelectedSlot(null);
  }, []);

  const handleEnhance = useCallback((slotIndex: number, delta: number) => {
    setEnhancements((prev) => {
      const newEnhancements = [...prev];
      newEnhancements[slotIndex] = Math.max(0, Math.min(14, newEnhancements[slotIndex] + delta));
      return newEnhancements;
    });
  }, []);

  const getAccessoriesForSlot = (slotNumber: number) => {
    return accessories.filter((acc) => acc.slot === slotNumber);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      {/* Header */}
      <div className="text-center text-xs text-muted-foreground mb-4">
        © Arizona RP Configurator, 2025
      </div>

      {/* Title */}
      <div className="text-center mb-4">
        <span className="text-accent font-bold text-xl">
          <span className="text-2xl">А</span>ксики
        </span>
      </div>

      {/* Main content: Character + Stats */}
      <div className="flex gap-4 mb-6">
        {/* Character image - clickable for skin selection */}
        <div
          onClick={() => setShowSkinModal(true)}
          className="w-32 h-48 bg-secondary/30 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-secondary/50 transition-colors border-2 border-transparent hover:border-primary/30 overflow-hidden"
        >
          {selectedSkin ? (
            <img src={selectedSkin.image} alt={selectedSkin.name} className="w-full h-full object-cover object-top" />
          ) : (
            <div className="text-4xl">🧑</div>
          )}
        </div>

        {/* Stats */}
        <div className="flex-1">
          <StatsDisplay stats={totalStats} />
        </div>
      </div>

      {/* Equipment slots grid */}
      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((slotNum) => (
          <EquipmentSlot
            key={slotNum}
            slotNumber={slotNum}
            equipped={equippedAccessories[slotNum - 1]}
            enhancement={enhancements[slotNum - 1]}
            onSlotClick={() => setSelectedSlot(slotNum)}
            onEnhance={(delta) => handleEnhance(slotNum - 1, delta)}
          />
        ))}
      </div>

      {/* Slot selection modal */}
      {selectedSlot !== null && (
        <SlotModal
          slotNumber={selectedSlot}
          accessories={getAccessoriesForSlot(selectedSlot)}
          equippedId={equippedAccessories[selectedSlot - 1]?.id ?? null}
          onSelect={handleEquip}
          onUnequip={() => handleUnequip(selectedSlot - 1)}
          onClose={() => setSelectedSlot(null)}
        />
      )}

      {/* Skin selection modal */}
      {showSkinModal && (
        <SkinModal
          selectedSkinId={selectedSkin?.id ?? 0}
          onSelect={(skin) => {
            setSelectedSkin(skin);
            setShowSkinModal(false);
          }}
          onClose={() => setShowSkinModal(false)}
        />
      )}
    </div>
  );
};

export default Index;
