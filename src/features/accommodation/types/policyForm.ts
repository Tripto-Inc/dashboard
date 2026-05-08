export type Policy = {
  id?: string;
  icon: string;
  title: string;
  description: string;
};

export type PolicyProps = {
  error?: string;
  fields: Array<Policy>;
  addButtonTitle: string;
  emptyFieldsMessage: string;
  onAppend: (val: Policy) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, val: Policy) => void;
};

export type PolicyItemProps = {
  item: Policy;
  onEdit: () => void;
  onRemove: () => void;
};

export type PolicyFormProps = {
  currentItem: SelectedPolicy;
  closeHandler: () => void;
  createHnadler: (policy: Policy) => void;
  updateHnadler: (index: number, policy: Policy) => void;
};

export type SelectedPolicy = {
  policy: Policy | null;
  index?: number;
};
