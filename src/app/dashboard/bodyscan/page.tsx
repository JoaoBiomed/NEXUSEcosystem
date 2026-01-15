import ModulePlaceholder from '@/components/ui/ModulePlaceholder';
import { Scan } from 'lucide-react';

export default function BodyScanPage() {
  return (
    <ModulePlaceholder
      title="NEXUS BodyScan 3D"
      description="Avaliação biométrica e antropométrica com análise tridimensional"
      icon={Scan}
      color="bg-gradient-to-br from-indigo-500 to-purple-600"
    />
  );
}
