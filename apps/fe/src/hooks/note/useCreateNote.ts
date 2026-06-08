'use client';

import { useMutation } from '@tanstack/react-query';

import { queryKey } from '@/configs';
import { useAppNameSpace } from '@/hooks/useAppNameSpace';
import { Api } from '@/services/api';
import type { CreateNoteInput, Note } from '@/types/api/productivity';
import type { TResponse } from '@/types/api/response';

import { type NoteCacheContext, readNoteListSnapshot } from './note.cache';

export function useCreateNote() {
  const ns = useAppNameSpace();

  return useMutation<TResponse<Note>, Error, CreateNoteInput, NoteCacheContext>({
    mutationFn: (payload) => Api.Note.create(payload),
    onMutate: async () => {
      await ns.queryClient.cancelQueries({ queryKey: queryKey.notesRoot() });
      return { previousList: readNoteListSnapshot(ns) };
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
    onError: (err, _variables, context) => {
      if (context?.previousList !== undefined) {
        ns.queryClient.setQueryData(queryKey.notes.list(), context.previousList);
      }
      ns.alert.toast({
        title: err.message,
        message: err.message,
        icon: 'error',
      });
    },
  });
}
