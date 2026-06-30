import { useAuth } from './auth/useAuth';
import { useCalender } from './calendar/useCalender';
import { useMusic } from './music/useMusic';
import { useNotess } from './note/useNotes';
import { useNotification } from './notification/useNotification';
import { useSubscription } from './subscription/state/query';
import { useTodo } from './todo/useTodos';

export function useApi() {
  return {
    auth: useAuth(),
    music: useMusic(),
    calender: useCalender(),
    note: useNotess(),
    notification: useNotification(),
    todo: useTodo(),
    subcription: useSubscription(),
  };
}
