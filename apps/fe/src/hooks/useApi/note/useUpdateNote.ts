'use client';

import { useMutation } from '@tanstack/react-query';

import { queryKey } from '@/configs';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { Api } from '@/services/api';
import type { Note, UpdateNoteInput } from '@/types/api/productivity';
import type { TResponse } from '@/types/api/response';

import { type NoteCacheContext, readNoteDetailSnapshot, readNoteListSnapshot } from './note.cache';

type UpdateNoteVariables = {
  id: string;
  payload: UpdateNoteInput;
};

export function useUpdateNote() {
  const ns = useAppNameSpace();

  return useMutation<TResponse<Note>, Error, UpdateNoteVariables, NoteCacheContext>({
    mutationFn: ({ id, payload }) => Api.Note.update(id, payload),
    onMutate: async ({ id }) => {
      await ns.queryClient.cancelQueries({ queryKey: queryKey.notesRoot() });
      return {
        previousList: readNoteListSnapshot(ns),
        previousDetail: readNoteDetailSnapshot(ns, id),
      };
    },
    onSuccess: (res) => {
      ns.alert.toast({
        title: res.message,
        message: res.message,
        icon: 'success',
      });
    },
    onSettled: async () => {
      await ns.queryClient.invalidateQueries({ queryKey: queryKey.notesRoot() });
    },
    onError: (err, variables, context) => {
      if (context?.previousList !== undefined) {
        ns.queryClient.setQueryData(queryKey.notes.list(), context.previousList);
      }
      if (context?.previousDetail !== undefined) {
        ns.queryClient.setQueryData(queryKey.notes.detail(variables.id), context.previousDetail);
      }
      ns.alert.toast({
        title: err.message,
        message: err.message,
        icon: 'error',
      });
    },
  });
}
