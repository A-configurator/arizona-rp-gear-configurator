import { useState, useCallback } from 'react';
import { Accessory, calculateTotalStats, getEmptyStats } from '@/data/accessories';
import { CharacterDisplay } from '@/components/CharacterDisplay';
import { StatsPanel } from '@/components/StatsPanel';
import { AccessoryGrid } from '@/components/AccessoryGrid';
import { AccessoryModal } from '@/components/AccessoryModal';

const Index = () => {
  // 8 slots: index 0-7 correspond to slots 1-8
  const [equippedAccessories, setEquippedAccessories] = useState<(Accessory | null)[]>(
    Array(8).fill(null)
  );
  const [selectedAccessory, setSelectedAccessory] = useState<Accessory | null>(null);
  const [filterSlot, setFilterSlot] = useState<number | null>(null);

  const totalStats = calculateTotalStats(equippedAccessories);

  const handleEquip = useCallback((accessory: Accessory) => {
    setEquippedAccessories((prev) => {
      const newEquipped = [...prev];
      const slotIndex = accessory.slot - 1;
      newEquipped[slotIndex] = accessory;
      return newEquipped;
    });
    setSelectedAccessory(null);
  }, []);

  const handleUnequip = useCallback((slotIndex: number) => {
    setEquippedAccessories((prev) => {
      const newEquipped = [...prev];
      newEquipped[slotIndex] = null;
      return newEquipped;
    });
    setSelectedAccessory(null);
  }, []);

  const handleSlotClick = useCallback((slotIndex: number) => {
    const equipped = equippedAccessories[slotIndex];
    if (equipped) {
      setSelectedAccessory(equipped);
    } else {
      // Filter grid by this slot
      setFilterSlot(slotIndex + 1);
    }
  }, [equippedAccessories]);

  const handleAccessoryClick = useCallback((accessory: Accessory) => {
    setSelectedAccessory(accessory);
  }, []);

  const isAccessoryEquipped = selectedAccessory
    ? equippedAccessories.some((eq) => eq?.id === selectedAccessory.id)
    : false;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold arz-text-gradient tracking-wider">
              ARIZONA RP
            </h1>
            <span className="text-sm text-muted-foreground">Конфигуратор аксессуаров</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-[280px_1fr_1fr] gap-6 h-[calc(100vh-120px)]">
          <CharacterDisplay
            equippedAccessories={equippedAccessories}
            onSlotClick={handleSlotClick}
            onUnequip={handleUnequip}
          />
          <StatsPanel stats={totalStats} />
          <AccessoryGrid
            equippedAccessories={equippedAccessories}
            onAccessoryClick={handleAccessoryClick}
            filterSlot={filterSlot}
          />
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden space-y-6">
          <CharacterDisplay
            equippedAccessories={equippedAccessories}
            onSlotClick={handleSlotClick}
            onUnequip={handleUnequip}
          />
          <StatsPanel stats={totalStats} />
          <div className="min-h-[400px]">
            <AccessoryGrid
              equippedAccessories={equippedAccessories}
              onAccessoryClick={handleAccessoryClick}
              filterSlot={filterSlot}
            />
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedAccessory && (
        <AccessoryModal
          accessory={selectedAccessory}
          isEquipped={isAccessoryEquipped}
          onClose={() => setSelectedAccessory(null)}
          onEquip={() => handleEquip(selectedAccessory)}
          onUnequip={() => handleUnequip(selectedAccessory.slot - 1)}
        />
      )}
    </div>
  );
};

export default Index;
