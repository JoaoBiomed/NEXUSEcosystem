import ModulePlaceholder from '@/components/ui/ModulePlaceholder';
import { Syringe } from 'lucide-react';

export default function EndoInjectPage() {
  return (
    <ModulePlaceholder
      title="NEXUS EndoInject"
      description="Terapias hormonais e injetáveis personalizadas com monitoramento completo"
      icon={Syringe}
      color="bg-gradient-to-br from-purple-600 to-pink-600"
    />
  );
}
