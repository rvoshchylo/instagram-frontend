import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

export function formatDate(timestamp: string): string {
  return format(new Date(timestamp), "d MMMM yyyy 'о' HH:mm", { locale: uk });
}
