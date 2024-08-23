import { ITagsData, TTagsListData } from './dataTypes';

const tagListData: TTagsListData = [
  'mmorpg',
  'shooter',
  'strategy',
  'moba',
  'racing',
  'sports',
  'social',
  'sandbox',
  'open-world',
  'survival',
  'pvp',
  'pve',
  'pixel',
  'voxel',
  'zombie',
  'turn-based',
  'first-person',
  'third-Person',
  'top-down',
  'tank',
  'space',
  'sailing',
  'side-scroller',
  'superhero',
  'permadeath',
  'card',
  'battle-royale',
  'mmo',
  'mmofps',
  'mmotps',
  '3d',
  '2d',
  'anime',
  'fantasy',
  'sci-fi',
  'fighting',
  'action-rpg',
  'action',
  'military',
  'martial-arts',
  'flight',
  'low-spec',
  'tower-defense',
  'horror',
  'mmorts',
];

const tagsData: ITagsData[] = [
  { name: 'Free MMORPG', data: 'mmorpg' },
  { name: 'FPS Games', data: 'mmotps' },
  { name: 'Anime Games', data: 'anime' },
  { name: 'Battle Royale Games', data: 'battle-royale' },
  { name: 'MMOFPS', data: 'mmofps' },
  { name: 'Open World', data: 'open-world' },
  { name: 'MMORTS', data: 'mmorts' },
  { name: 'Survival', data: 'survival' },
];

const errorMessage = (
  <div className="mmo__error-message">
    Something went wrong. Refresh the page or try again later
  </div>
);

export { tagListData, tagsData, errorMessage };
