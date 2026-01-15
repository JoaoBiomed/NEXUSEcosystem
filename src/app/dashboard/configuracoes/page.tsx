import ModulePlaceholder from '@/components/ui/ModulePlaceholder';
import { Settings } from 'lucide-react';

export default function ConfiguracoesPage() {
  return (
    <ModulePlaceholder
      title="Configurações"
      description="Configurações do sistema, tema, perfil de usuário e preferências"
      icon={Settings}
      color="bg-gradient-to-br from-gray-600 to-gray-800"
    />
  );
}
