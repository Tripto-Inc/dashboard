export interface SeasonalPrice {
  date: string;
  price: number;
}

export interface SeasonalPriceProps {
  currencyId: string;
  fields: Array<SeasonalPrice>;
  onRemove: (index: number) => void;
  onAppend: (value: SeasonalPrice) => void;
  onUpdate: (index: number, val: SeasonalPrice) => void;
}

export interface SeasonalPriceItemProps {
  item: SeasonalPrice;
  onEdit: () => void;
  onRemove: () => void;
  currencySymbol?: string;
}

export interface SeasonalPriceFormProps {
  currencySymbol?: string;
  fields: Array<SeasonalPrice>;
  currentItem: SelectedSeasonalPrice;
  closeHandler: () => void;
  createHnadler: (seasonalPrice: SeasonalPrice) => void;
  updateHnadler: (index: number, seasonalPrice: SeasonalPrice) => void;
}

export type SelectedSeasonalPrice = {
  seasonalPrice: SeasonalPrice | null;
  index?: number;
};
