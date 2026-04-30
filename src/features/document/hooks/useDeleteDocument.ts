import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteDocument } from '../api/mutations';
import { DeleteDocumentParams } from '../types';

export const useDeleteDocument = () => {
  return useMutation({
    mutationFn: (params: DeleteDocumentParams) => deleteDocument(params),
    onSuccess: () => {
      toast.success(' Image removed successfully');
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
    },
  });
};
