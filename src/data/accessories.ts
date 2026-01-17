// Данные аксессуаров Arizona RP на основе arz-wiki.com
// Слоты: 1-Голова, 2-Лицо, 3-Шея, 4-Тело, 5-Руки, 6-Спина, 7-Ноги, 8-Ступни

export interface AccessoryStats {
  defense: number;        // Защита (%)
  regen: number;          // Регенерация (HP/мин)
  damage: number;         // Урон (%)
  luck: number;           // Удача (шанс крит. урона) (%)
  maxHp: number;          // Макс. HP
  maxArmor: number;       // Макс. Броня
  stunChance: number;     // Шанс оглушения (%)
  drunkChance: number;    // Шанс опьянения (%)
  antiStun: number;       // Шанс избежать оглушения (%)
  reflect: number;        // Отражение урона (%)
  block: number;          // Блокировка урона (раз)
  fireRate: number;       // Скорострельность (%)
  recoil: number;         // Отдача (%)
}

export interface Accessory {
  id: number;
  name: string;
  slot: number;
  slotName: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  stats: AccessoryStats;
  imageUrl?: string;
}

export const SLOT_NAMES: Record<number, string> = {
  1: 'Голова',
  2: 'Лицо',
  3: 'Шея',
  4: 'Тело',
  5: 'Руки',
  6: 'Спина',
  7: 'Ноги',
  8: 'Ступни',
};

export const STAT_LABELS: Record<keyof AccessoryStats, string> = {
  defense: 'Защита',
  regen: 'Регенерация (HP/мин)',
  damage: 'Урон',
  luck: 'Удача (шанс крит. урона)',
  maxHp: 'Макс. HP',
  maxArmor: 'Макс. Броня',
  stunChance: 'Шанс оглушения',
  drunkChance: 'Шанс опьянения',
  antiStun: 'Шанс избежать оглушения',
  reflect: 'Отражение урона',
  block: 'Блокировка урона (раз)',
  fireRate: 'Скорострельность',
  recoil: 'Отдача',
};

export const STAT_SUFFIXES: Record<keyof AccessoryStats, string> = {
  defense: '%',
  regen: '',
  damage: '%',
  luck: '%',
  maxHp: '',
  maxArmor: '',
  stunChance: '%',
  drunkChance: '%',
  antiStun: '%',
  reflect: '%',
  block: '',
  fireRate: '%',
  recoil: '%',
};

// Пустые статы - заполни для каждого аксессуара отдельно
const emptyStats = { defense: 0, regen: 0, damage: 0, luck: 0, maxHp: 0, maxArmor: 0, stunChance: 0, drunkChance: 0, antiStun: 0, reflect: 0, block: 0, fireRate: 0, recoil: 0 };

// Аксессуары Arizona RP (данные на основе arz-wiki.com)
// TODO: Добавь характеристики для каждого аксессуара
export const accessories: Accessory[] = [
  // === ГОЛОВА (Слот 1) ===
  { id: 1001, name: 'Шлем Воина', slot: 1, slotName: 'Голова', description: '', rarity: 'common', stats: { ...emptyStats } },
  { id: 1002, name: 'Каска Штурмовика', slot: 1, slotName: 'Голова', description: '', rarity: 'rare', stats: { ...emptyStats } },
  { id: 1003, name: 'Шляпа Ковбоя', slot: 1, slotName: 'Голова', description: '', rarity: 'epic', stats: { ...emptyStats } },
  { id: 1004, name: 'Легендарная Корона', slot: 1, slotName: 'Голова', description: '', rarity: 'legendary', stats: { ...emptyStats } },

  // === ЛИЦО (Слот 2) ===
  { id: 2001, name: 'Бандана', slot: 2, slotName: 'Лицо', description: '', rarity: 'common', stats: { ...emptyStats } },
  { id: 2002, name: 'Тактические очки', slot: 2, slotName: 'Лицо', description: '', rarity: 'rare', stats: { ...emptyStats } },
  { id: 2003, name: 'Маска Демона', slot: 2, slotName: 'Лицо', description: '', rarity: 'epic', stats: { ...emptyStats } },
  { id: 2004, name: 'Легендарная Маска Черепа', slot: 2, slotName: 'Лицо', description: '', rarity: 'legendary', stats: { ...emptyStats } },

  // === ШЕЯ (Слот 3) ===
  { id: 3001, name: 'Цепочка', slot: 3, slotName: 'Шея', description: '', rarity: 'common', stats: { ...emptyStats } },
  { id: 3002, name: 'Амулет Защиты', slot: 3, slotName: 'Шея', description: '', rarity: 'rare', stats: { ...emptyStats } },
  { id: 3003, name: 'Ожерелье Берсерка', slot: 3, slotName: 'Шея', description: '', rarity: 'epic', stats: { ...emptyStats } },
  { id: 3004, name: 'Легендарный Амулет Дракона', slot: 3, slotName: 'Шея', description: '', rarity: 'legendary', stats: { ...emptyStats } },

  // === ТЕЛО (Слот 4) ===
  { id: 4001, name: 'Бронежилет', slot: 4, slotName: 'Тело', description: '', rarity: 'common', stats: { ...emptyStats } },
  { id: 4002, name: 'Тактический Жилет', slot: 4, slotName: 'Тело', description: '', rarity: 'rare', stats: { ...emptyStats } },
  { id: 4003, name: 'Костюм Ниндзя', slot: 4, slotName: 'Тело', description: '', rarity: 'epic', stats: { ...emptyStats } },
  { id: 4004, name: 'Легендарная Броня Титана', slot: 4, slotName: 'Тело', description: '', rarity: 'legendary', stats: { ...emptyStats } },

  // === РУКИ (Слот 5) ===
  { id: 5001, name: 'Перчатки Бойца', slot: 5, slotName: 'Руки', description: '', rarity: 'common', stats: { ...emptyStats } },
  { id: 5002, name: 'Тактические Перчатки', slot: 5, slotName: 'Руки', description: '', rarity: 'rare', stats: { ...emptyStats } },
  { id: 5003, name: 'Кастеты Разрушителя', slot: 5, slotName: 'Руки', description: '', rarity: 'epic', stats: { ...emptyStats } },
  { id: 5004, name: 'Легендарные Перчатки Молнии', slot: 5, slotName: 'Руки', description: '', rarity: 'legendary', stats: { ...emptyStats } },

  // === СПИНА (Слот 6) ===
  { id: 5501, name: 'Рюкзак Путника', slot: 6, slotName: 'Спина', description: '', rarity: 'common', stats: { ...emptyStats } },
  { id: 5502, name: 'Тактический Рюкзак', slot: 6, slotName: 'Спина', description: '', rarity: 'rare', stats: { ...emptyStats } },
  { id: 5503, name: 'Крылья Ангела', slot: 6, slotName: 'Спина', description: '', rarity: 'epic', stats: { ...emptyStats } },
  { id: 5504, name: 'Лавка Чубрика', slot: 6, slotName: 'Спина', description: '', rarity: 'legendary', stats: { ...emptyStats } },

  // === НОГИ (Слот 7) ===
  { id: 6001, name: 'Наколенники', slot: 7, slotName: 'Ноги', description: '', rarity: 'common', stats: { ...emptyStats } },
  { id: 6002, name: 'Тактические Штаны', slot: 7, slotName: 'Ноги', description: '', rarity: 'rare', stats: { ...emptyStats } },
  { id: 6003, name: 'Штаны Спринтера', slot: 7, slotName: 'Ноги', description: '', rarity: 'epic', stats: { ...emptyStats } },
  { id: 6004, name: 'Легендарные Поножи Воина', slot: 7, slotName: 'Ноги', description: '', rarity: 'legendary', stats: { ...emptyStats } },

  // === СТУПНИ (Слот 8) ===
  { id: 7001, name: 'Ботинки Пехотинца', slot: 8, slotName: 'Ступни', description: '', rarity: 'common', stats: { ...emptyStats } },
  { id: 7002, name: 'Тактические Берцы', slot: 8, slotName: 'Ступни', description: '', rarity: 'rare', stats: { ...emptyStats } },
  { id: 7003, name: 'Кроссовки Скорости', slot: 8, slotName: 'Ступни', description: '', rarity: 'epic', stats: { ...emptyStats } },
  { id: 7004, name: 'Легендарные Сапоги Титана', slot: 8, slotName: 'Ступни', description: '', rarity: 'legendary', stats: { ...emptyStats } },
];

export const getEmptyStats = (): AccessoryStats => ({
  defense: 0,
  regen: 0,
  damage: 0,
  luck: 0,
  maxHp: 0,
  maxArmor: 0,
  stunChance: 0,
  drunkChance: 0,
  antiStun: 0,
  reflect: 0,
  block: 0,
  fireRate: 0,
  recoil: 0,
});

export const calculateTotalStats = (equippedAccessories: (Accessory | null)[]): AccessoryStats => {
  const total = getEmptyStats();
  
  equippedAccessories.forEach((acc) => {
    if (acc) {
      (Object.keys(total) as (keyof AccessoryStats)[]).forEach((key) => {
        total[key] += acc.stats[key];
      });
    }
  });
  
  return total;
};
