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

// Аксессуары Arizona RP (данные на основе arz-wiki.com)
export const accessories: Accessory[] = [
  // === ГОЛОВА (Слот 1) ===
  {
    id: 1001,
    name: 'Шлем Воина',
    slot: 1,
    slotName: 'Голова',
    description: 'Прочный боевой шлем, обеспечивающий надёжную защиту головы.',
    rarity: 'common',
    stats: { defense: 3, regen: 0, damage: 0, luck: 0, maxHp: 10, maxArmor: 5, stunChance: 0, drunkChance: 0, antiStun: 2, reflect: 0, block: 0, fireRate: 0, recoil: 0 }
  },
  {
    id: 1002,
    name: 'Каска Штурмовика',
    slot: 1,
    slotName: 'Голова',
    description: 'Тактическая каска для штурмовых операций.',
    rarity: 'rare',
    stats: { defense: 5, regen: 1, damage: 0, luck: 0, maxHp: 15, maxArmor: 10, stunChance: 0, drunkChance: 0, antiStun: 5, reflect: 0, block: 0, fireRate: 0, recoil: 0 }
  },
  {
    id: 1003,
    name: 'Шляпа Ковбоя',
    slot: 1,
    slotName: 'Голова',
    description: 'Классическая ковбойская шляпа с особыми свойствами.',
    rarity: 'epic',
    stats: { defense: 2, regen: 0, damage: 3, luck: 5, maxHp: 0, maxArmor: 0, stunChance: 0, drunkChance: 0, antiStun: 0, reflect: 0, block: 0, fireRate: 2, recoil: -3 }
  },
  {
    id: 1004,
    name: 'Легендарная Корона',
    slot: 1,
    slotName: 'Голова',
    description: 'Легендарная корона правителя Аризоны.',
    rarity: 'legendary',
    stats: { defense: 8, regen: 3, damage: 5, luck: 10, maxHp: 50, maxArmor: 25, stunChance: 0, drunkChance: 0, antiStun: 10, reflect: 3, block: 1, fireRate: 0, recoil: 0 }
  },

  // === ЛИЦО (Слот 2) ===
  {
    id: 2001,
    name: 'Бандана',
    slot: 2,
    slotName: 'Лицо',
    description: 'Стильная бандана, скрывающая лицо.',
    rarity: 'common',
    stats: { defense: 1, regen: 0, damage: 0, luck: 2, maxHp: 0, maxArmor: 0, stunChance: 0, drunkChance: 5, antiStun: 0, reflect: 0, block: 0, fireRate: 0, recoil: 0 }
  },
  {
    id: 2002,
    name: 'Тактические очки',
    slot: 2,
    slotName: 'Лицо',
    description: 'Очки с улучшенным прицеливанием.',
    rarity: 'rare',
    stats: { defense: 0, regen: 0, damage: 5, luck: 3, maxHp: 0, maxArmor: 0, stunChance: 0, drunkChance: 0, antiStun: 0, reflect: 0, block: 0, fireRate: 3, recoil: -5 }
  },
  {
    id: 2003,
    name: 'Маска Демона',
    slot: 2,
    slotName: 'Лицо',
    description: 'Устрашающая маска с мистическими свойствами.',
    rarity: 'epic',
    stats: { defense: 3, regen: 0, damage: 7, luck: 5, maxHp: 0, maxArmor: 0, stunChance: 5, drunkChance: 0, antiStun: 3, reflect: 2, block: 0, fireRate: 0, recoil: 0 }
  },
  {
    id: 2004,
    name: 'Легендарная Маска Черепа',
    slot: 2,
    slotName: 'Лицо',
    description: 'Легендарная маска, наводящая ужас на врагов.',
    rarity: 'legendary',
    stats: { defense: 5, regen: 2, damage: 10, luck: 8, maxHp: 20, maxArmor: 0, stunChance: 8, drunkChance: 0, antiStun: 8, reflect: 5, block: 0, fireRate: 5, recoil: -8 }
  },

  // === ШЕЯ (Слот 3) ===
  {
    id: 3001,
    name: 'Цепочка',
    slot: 3,
    slotName: 'Шея',
    description: 'Простая золотая цепочка.',
    rarity: 'common',
    stats: { defense: 0, regen: 1, damage: 0, luck: 3, maxHp: 5, maxArmor: 0, stunChance: 0, drunkChance: 0, antiStun: 0, reflect: 0, block: 0, fireRate: 0, recoil: 0 }
  },
  {
    id: 3002,
    name: 'Амулет Защиты',
    slot: 3,
    slotName: 'Шея',
    description: 'Магический амулет, дающий защиту.',
    rarity: 'rare',
    stats: { defense: 5, regen: 2, damage: 0, luck: 0, maxHp: 15, maxArmor: 5, stunChance: 0, drunkChance: 0, antiStun: 5, reflect: 2, block: 0, fireRate: 0, recoil: 0 }
  },
  {
    id: 3003,
    name: 'Ожерелье Берсерка',
    slot: 3,
    slotName: 'Шея',
    description: 'Ожерелье, усиливающее боевую ярость.',
    rarity: 'epic',
    stats: { defense: 0, regen: 0, damage: 10, luck: 5, maxHp: 0, maxArmor: 0, stunChance: 5, drunkChance: 0, antiStun: 0, reflect: 0, block: 0, fireRate: 5, recoil: 3 }
  },
  {
    id: 3004,
    name: 'Легендарный Амулет Дракона',
    slot: 3,
    slotName: 'Шея',
    description: 'Древний амулет с силой дракона.',
    rarity: 'legendary',
    stats: { defense: 8, regen: 5, damage: 8, luck: 10, maxHp: 40, maxArmor: 20, stunChance: 3, drunkChance: 0, antiStun: 10, reflect: 8, block: 1, fireRate: 3, recoil: -5 }
  },

  // === ТЕЛО (Слот 4) ===
  {
    id: 4001,
    name: 'Бронежилет',
    slot: 4,
    slotName: 'Тело',
    description: 'Стандартный бронежилет для защиты торса.',
    rarity: 'common',
    stats: { defense: 8, regen: 0, damage: 0, luck: 0, maxHp: 20, maxArmor: 15, stunChance: 0, drunkChance: 0, antiStun: 0, reflect: 0, block: 1, fireRate: 0, recoil: 0 }
  },
  {
    id: 4002,
    name: 'Тактический Жилет',
    slot: 4,
    slotName: 'Тело',
    description: 'Улучшенный жилет с дополнительными карманами.',
    rarity: 'rare',
    stats: { defense: 10, regen: 1, damage: 2, luck: 0, maxHp: 30, maxArmor: 20, stunChance: 0, drunkChance: 0, antiStun: 3, reflect: 0, block: 1, fireRate: 2, recoil: 0 }
  },
  {
    id: 4003,
    name: 'Костюм Ниндзя',
    slot: 4,
    slotName: 'Тело',
    description: 'Лёгкий костюм для скрытных операций.',
    rarity: 'epic',
    stats: { defense: 5, regen: 3, damage: 8, luck: 8, maxHp: 0, maxArmor: 0, stunChance: 5, drunkChance: 0, antiStun: 8, reflect: 0, block: 0, fireRate: 8, recoil: -10 }
  },
  {
    id: 4004,
    name: 'Легендарная Броня Титана',
    slot: 4,
    slotName: 'Тело',
    description: 'Непробиваемая броня древнего титана.',
    rarity: 'legendary',
    stats: { defense: 15, regen: 5, damage: 5, luck: 5, maxHp: 100, maxArmor: 50, stunChance: 0, drunkChance: 0, antiStun: 15, reflect: 10, block: 3, fireRate: 0, recoil: 0 }
  },

  // === РУКИ (Слот 5) ===
  {
    id: 5001,
    name: 'Перчатки Бойца',
    slot: 5,
    slotName: 'Руки',
    description: 'Прочные боевые перчатки.',
    rarity: 'common',
    stats: { defense: 2, regen: 0, damage: 3, luck: 0, maxHp: 0, maxArmor: 0, stunChance: 3, drunkChance: 0, antiStun: 0, reflect: 0, block: 0, fireRate: 2, recoil: -2 }
  },
  {
    id: 5002,
    name: 'Тактические Перчатки',
    slot: 5,
    slotName: 'Руки',
    description: 'Перчатки с улучшенным сцеплением.',
    rarity: 'rare',
    stats: { defense: 3, regen: 0, damage: 5, luck: 2, maxHp: 0, maxArmor: 0, stunChance: 0, drunkChance: 0, antiStun: 0, reflect: 0, block: 0, fireRate: 5, recoil: -8 }
  },
  {
    id: 5003,
    name: 'Кастеты Разрушителя',
    slot: 5,
    slotName: 'Руки',
    description: 'Мощные кастеты с шипами.',
    rarity: 'epic',
    stats: { defense: 0, regen: 0, damage: 12, luck: 5, maxHp: 0, maxArmor: 0, stunChance: 10, drunkChance: 0, antiStun: 0, reflect: 0, block: 0, fireRate: 3, recoil: 0 }
  },
  {
    id: 5004,
    name: 'Легендарные Перчатки Молнии',
    slot: 5,
    slotName: 'Руки',
    description: 'Перчатки, заряженные молнией.',
    rarity: 'legendary',
    stats: { defense: 5, regen: 2, damage: 15, luck: 10, maxHp: 25, maxArmor: 0, stunChance: 12, drunkChance: 0, antiStun: 5, reflect: 5, block: 0, fireRate: 10, recoil: -12 }
  },

  // === СПИНА (Слот 6) ===
  {
    id: 5501,
    name: 'Рюкзак Путника',
    slot: 6,
    slotName: 'Спина',
    description: 'Удобный рюкзак для путешествий.',
    rarity: 'common',
    stats: { defense: 2, regen: 2, damage: 0, luck: 0, maxHp: 15, maxArmor: 0, stunChance: 0, drunkChance: 0, antiStun: 0, reflect: 0, block: 0, fireRate: 0, recoil: 0 }
  },
  {
    id: 5502,
    name: 'Тактический Рюкзак',
    slot: 6,
    slotName: 'Спина',
    description: 'Военный рюкзак с бронепластинами.',
    rarity: 'rare',
    stats: { defense: 5, regen: 1, damage: 0, luck: 0, maxHp: 25, maxArmor: 10, stunChance: 0, drunkChance: 0, antiStun: 3, reflect: 2, block: 0, fireRate: 0, recoil: 0 }
  },
  {
    id: 5503,
    name: 'Крылья Ангела',
    slot: 6,
    slotName: 'Спина',
    description: 'Светящиеся крылья с особой аурой.',
    rarity: 'epic',
    stats: { defense: 3, regen: 5, damage: 5, luck: 8, maxHp: 30, maxArmor: 0, stunChance: 0, drunkChance: 0, antiStun: 8, reflect: 5, block: 0, fireRate: 5, recoil: 0 }
  },
  {
    id: 5504,
    name: 'Лавка Чубрика',
    slot: 6,
    slotName: 'Спина',
    description: 'Легендарная переносная лавка. Эту лавку строили две бригады умелых чубриков. Уникальные свойства: уменьшенная стоимость крафта, повышенный депозит.',
    rarity: 'legendary',
    stats: { defense: 5, regen: 3, damage: 3, luck: 12, maxHp: 50, maxArmor: 25, stunChance: 0, drunkChance: 0, antiStun: 10, reflect: 8, block: 2, fireRate: 0, recoil: 0 }
  },

  // === НОГИ (Слот 7) ===
  {
    id: 6001,
    name: 'Наколенники',
    slot: 7,
    slotName: 'Ноги',
    description: 'Защитные наколенники.',
    rarity: 'common',
    stats: { defense: 3, regen: 0, damage: 0, luck: 0, maxHp: 10, maxArmor: 5, stunChance: 0, drunkChance: 0, antiStun: 2, reflect: 0, block: 0, fireRate: 0, recoil: 0 }
  },
  {
    id: 6002,
    name: 'Тактические Штаны',
    slot: 7,
    slotName: 'Ноги',
    description: 'Штаны с усиленной защитой.',
    rarity: 'rare',
    stats: { defense: 5, regen: 1, damage: 0, luck: 0, maxHp: 20, maxArmor: 10, stunChance: 0, drunkChance: 0, antiStun: 5, reflect: 0, block: 0, fireRate: 0, recoil: 0 }
  },
  {
    id: 6003,
    name: 'Штаны Спринтера',
    slot: 7,
    slotName: 'Ноги',
    description: 'Лёгкие штаны для быстрого передвижения.',
    rarity: 'epic',
    stats: { defense: 2, regen: 3, damage: 3, luck: 5, maxHp: 0, maxArmor: 0, stunChance: 0, drunkChance: 0, antiStun: 10, reflect: 0, block: 0, fireRate: 8, recoil: 0 }
  },
  {
    id: 6004,
    name: 'Легендарные Поножи Воина',
    slot: 7,
    slotName: 'Ноги',
    description: 'Древние поножи легендарного воина.',
    rarity: 'legendary',
    stats: { defense: 10, regen: 4, damage: 5, luck: 8, maxHp: 60, maxArmor: 30, stunChance: 0, drunkChance: 0, antiStun: 12, reflect: 5, block: 1, fireRate: 5, recoil: 0 }
  },

  // === СТУПНИ (Слот 8) ===
  {
    id: 7001,
    name: 'Ботинки Пехотинца',
    slot: 8,
    slotName: 'Ступни',
    description: 'Стандартные армейские ботинки.',
    rarity: 'common',
    stats: { defense: 2, regen: 0, damage: 0, luck: 0, maxHp: 5, maxArmor: 0, stunChance: 0, drunkChance: 0, antiStun: 2, reflect: 0, block: 0, fireRate: 0, recoil: 0 }
  },
  {
    id: 7002,
    name: 'Тактические Берцы',
    slot: 8,
    slotName: 'Ступни',
    description: 'Прочные берцы для сложных условий.',
    rarity: 'rare',
    stats: { defense: 4, regen: 1, damage: 2, luck: 0, maxHp: 15, maxArmor: 5, stunChance: 2, drunkChance: 0, antiStun: 5, reflect: 0, block: 0, fireRate: 0, recoil: 0 }
  },
  {
    id: 7003,
    name: 'Кроссовки Скорости',
    slot: 8,
    slotName: 'Ступни',
    description: 'Лёгкие кроссовки для максимальной скорости.',
    rarity: 'epic',
    stats: { defense: 1, regen: 2, damage: 5, luck: 5, maxHp: 0, maxArmor: 0, stunChance: 0, drunkChance: 0, antiStun: 8, reflect: 0, block: 0, fireRate: 10, recoil: -5 }
  },
  {
    id: 7004,
    name: 'Легендарные Сапоги Титана',
    slot: 8,
    slotName: 'Ступни',
    description: 'Несокрушимые сапоги древнего титана.',
    rarity: 'legendary',
    stats: { defense: 8, regen: 3, damage: 5, luck: 8, maxHp: 40, maxArmor: 20, stunChance: 5, drunkChance: 0, antiStun: 15, reflect: 5, block: 1, fireRate: 5, recoil: -8 }
  },
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
