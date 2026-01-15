import ModulePlaceholder from '@/components/ui/ModulePlaceholder';
import { Calendar } from 'lucide-react';

export default function AgendaPage() {
  return (
    <ModulePlaceholder
      title="Agenda"
      description="Sistema de agendamento médico com visualização de calendário e gestão de consultas"
      icon={Calendar}
      color="bg-gradient-to-br from-purple-500 to-purple-700"
    />
  );
}
