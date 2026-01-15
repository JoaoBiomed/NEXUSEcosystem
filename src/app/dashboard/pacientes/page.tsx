import ModulePlaceholder from '@/components/ui/ModulePlaceholder';
import { Users } from 'lucide-react';

export default function PacientesPage() {
  return (
    <ModulePlaceholder
      title="Pacientes"
      description="Gestão completa de pacientes com histórico médico, exames e protocolos"
      icon={Users}
      color="bg-gradient-to-br from-blue-500 to-blue-700"
    />
  );
}
