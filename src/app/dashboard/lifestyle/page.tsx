import ModulePlaceholder from '@/components/ui/ModulePlaceholder';
import { Heart } from 'lucide-react';

export default function LifestylePage() {
  return (
    <ModulePlaceholder
      title="NEXUS Lifestyle"
      description="Monitoramento de hábitos, sono e qualidade de vida"
      icon={Heart}
      color="bg-gradient-to-br from-pink-500 to-rose-600"
    />
  );
}
