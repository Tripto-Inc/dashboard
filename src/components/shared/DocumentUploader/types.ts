import { RefCallBack } from 'react-hook-form';

export type DocumentUploaderValue = File | File[] | null;

export interface DocumentUploaderProps {
  value?: DocumentUploaderValue;
  ref: RefCallBack;
  multiple?: boolean;
  onChange: (file: DocumentUploaderValue) => void;
}

export type PreviewItem = {
  file: File;
  url: string;
};
