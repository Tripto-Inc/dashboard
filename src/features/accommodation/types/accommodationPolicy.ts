export type AccommodationPolicy = {
  id?: string;
  icon: string;
  title: string;
  description: string;
};

export type AccommodationPolicyProps = {
  error?: string;
  fields: Array<AccommodationPolicy>;
  onAppend: (val: AccommodationPolicy) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, val: AccommodationPolicy) => void;
};

export type AccommodationPolicyItemProps = {
  item: AccommodationPolicy;
  onEdit: () => void;
  onRemove: () => void;
};

export type AccommodationPolicyFormProps = {
  currentItem: SelectedAccommodationPolicy;
  closeHandler: () => void;
  createHandler: (policy: AccommodationPolicy) => void;
  updateHandler: (index: number, policy: AccommodationPolicy) => void;
};

export type SelectedAccommodationPolicy = {
  index?: number;
  policy: AccommodationPolicy | null;
};
