import ModulePlaceholder from '@/components/ui/ModulePlaceholder';
import { Pill } from 'lucide-react';

export default function PharmaPage() {
  return (
    <ModulePlaceholder
      title="NEXUS Pharma"
      description="Gestão de estoque farmacológico e formulações personalizadas"
      icon={Pill}
      color="bg-gradient-to-br from-green-500 to-emerald-700"
    />
  );
}
