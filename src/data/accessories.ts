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

// Type of accessory (for slot 6 universal)
export type AccessoryType = 'attack' | 'defense';

export interface Accessory {
  id: number;
  name: string;
  slot: number;
  slotName: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  stats: AccessoryStats;           // Базовые характеристики (могут переноситься)
  yellowStats?: AccessoryStats;     // Жёлтые характеристики (переносятся отдельно)
  accessoryType?: AccessoryType;    // Тип аксессуара (для слота 6)
  imageUrl?: string;
}

export const SLOT_NAMES: Record<number, string> = {
  1: 'Голова',
  2: 'Лицо',
  3: 'Рука',
  4: 'Шея',
  5: 'Плечо',
  6: 'Спина',
  7: 'Бронежилет',
  8: 'Чемодан',
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

// Пустые статы - используй для новых аксессуаров
export const emptyStats: AccessoryStats = { defense: 0, regen: 0, damage: 0, luck: 0, maxHp: 0, maxArmor: 0, stunChance: 0, drunkChance: 0, antiStun: 0, reflect: 0, block: 0, fireRate: 0, recoil: 0 };

// Импорты изображений аксессуаров
import markerDeadInsideImg from '@/assets/accessories/marker-dead-inside.png';
import enderCubeImg from '@/assets/accessories/ender-cube.png';
import starNimbusImg from '@/assets/accessories/star-nimbus.png';
import markerBadImg from '@/assets/accessories/marker-bad.png';
import fightClubImg from '@/assets/accessories/fight-club.png';
import ironManHelmetImg from '@/assets/accessories/iron-man-helmet.png';
import happyPepeImg from '@/assets/accessories/happy-pepe.png';
import pumpkinHeadImg from '@/assets/accessories/pumpkin-head.png';
import jetpackImg from '@/assets/accessories/jetpack.png';
import spaceJetpackImg from '@/assets/accessories/space-jetpack.png';

// Аксессуары Arizona RP
export const accessories: Accessory[] = [
  // ===== СЛОТ 1 - ГОЛОВА =====
  {
    id: 101,
    name: 'Маркер dead inside',
    slot: 1,
    slotName: 'Голова',
    description: 'Маркер с надписью Dead Inside',
    rarity: 'rare',
    stats: { ...emptyStats, damage: 1, luck: 10, stunChance: 1 },
    imageUrl: markerDeadInsideImg,
  },
  {
    id: 102,
    name: 'Эндер куб',
    slot: 1,
    slotName: 'Голова',
    description: 'Загадочный эндер куб',
    rarity: 'epic',
    stats: { ...emptyStats, damage: 1, luck: 10, stunChance: 1 },
    imageUrl: enderCubeImg,
  },
  {
    id: 103,
    name: 'Звёздный нимб',
    slot: 1,
    slotName: 'Голова',
    description: 'Сияющий звёздный нимб',
    rarity: 'legendary',
    stats: { ...emptyStats, damage: 1, luck: 10, stunChance: 1 },
    imageUrl: starNimbusImg,
  },
  {
    id: 104,
    name: 'Маркер «BAD»',
    slot: 1,
    slotName: 'Голова',
    description: 'Маркер с надписью BAD',
    rarity: 'rare',
    stats: { ...emptyStats, luck: 10 },
    imageUrl: markerBadImg,
  },
  {
    id: 105,
    name: 'Бойцовский клуб',
    slot: 1,
    slotName: 'Голова',
    description: 'Первое правило бойцовского клуба...',
    rarity: 'epic',
    stats: { ...emptyStats, luck: 10 },
    imageUrl: fightClubImg,
  },
  {
    id: 106,
    name: 'Шлем железного человека',
    slot: 1,
    slotName: 'Голова',
    description: 'Шлем Тони Старка',
    rarity: 'legendary',
    stats: { ...emptyStats, luck: 2 },
    imageUrl: ironManHelmetImg,
  },
  {
    id: 107,
    name: 'Весёлый Пепе',
    slot: 1,
    slotName: 'Голова',
    description: 'Знаменитая лягушка Пепе',
    rarity: 'common',
    stats: { ...emptyStats, luck: 1 },
    imageUrl: happyPepeImg,
  },
  {
    id: 108,
    name: 'Голова Тыква',
    slot: 1,
    slotName: 'Голова',
    description: 'Хэллоуинская тыква',
    rarity: 'rare',
    stats: { ...emptyStats, defense: 2, damage: 2, luck: 2 },
    imageUrl: pumpkinHeadImg,
  },
  {
    id: 109,
    name: 'Джетпак',
    slot: 1,
    slotName: 'Голова',
    description: 'Реактивный ранец',
    rarity: 'rare',
    stats: { ...emptyStats, defense: 2, damage: 2, luck: 2 },
    imageUrl: jetpackImg,
  },
  {
    id: 110,
    name: 'Космический джетпак',
    slot: 1,
    slotName: 'Голова',
    description: 'Улучшенный космический джетпак',
    rarity: 'epic',
    stats: { ...emptyStats, defense: 2, damage: 2, luck: 2 },
    imageUrl: spaceJetpackImg,
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
