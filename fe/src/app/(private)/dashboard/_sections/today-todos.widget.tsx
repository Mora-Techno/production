'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import { useTodos } from '@/hooks/todo';
import { GhibliCard } from '@/components/molecules/ghibli-card';
import { GhibliEmptyState } from '@/components/molecules/ghibli-empty-state';
import { TodoCheckbox } from '@/components/molecules/todo-checkbox';
import { Button } from '@/components/atoms';
import { useUpdateTodo } from '@/hooks/todo';
import { ArrowRight } from 'lucide-react';

export function TodayTodosWidget() {
  const { data: todos = [], isLoading } = useTodos({ date: 'today' });
  const updateTodo = useUpdateTodo({ date: 'today' });
  const limited = todos.slice(0, 5);

  return (
    <GhibliCard>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg font-semibold">Tugas Hari Ini</h2>
        <Button variant="ghost" size="sm" asChild className="ghibli-btn">
          <Link href="/todos">
            Lihat semua <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : limited.length === 0 ? (
        <GhibliEmptyState
          emoji="😴"
          title="Tidak ada tugas hari ini"
          description="Semua tugas selesai, waktunya istirahat seperti Totoro!"
        />
      ) : (
        <ul className="space-y-2">
          {limited.map((todo) => (
            <li
              key={todo.id}
              data-stagger-item
              className="flex items-center gap-3 rounded-xl bg-background/50 px-3 py-2"
            >
              <TodoCheckbox
                checked={todo.status === 'completed'}
                disabled={updateTodo.isPending}
                onChange={(checked) =>
                  updateTodo.mutate({
                    id: todo.id,
                    payload: { status: checked ? 'completed' : 'pending' },
                    filters: { date: 'today' },
                  })
                }
              />
              <span
                className={
                  todo.status === 'completed'
                    ? 'flex-1 text-sm text-muted-foreground line-through'
                    : 'flex-1 text-sm'
                }
              >
                {todo.text}
              </span>
              {todo.dueDate && (
                <span className="text-xs text-muted-foreground">
                  {format(new Date(todo.dueDate), 'HH:mm', { locale: idLocale })}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </GhibliCard>
  );
}
