import ModulePlaceholder from '@/components/ui/ModulePlaceholder';
import { FlaskConical } from 'lucide-react';

export default function LabProPage() {
  return (
    <ModulePlaceholder
      title="NEXUS LabPro"
      description="Interpretação laboratorial inteligente com análise de biomarcadores"
      icon={FlaskConical}
      color="bg-gradient-to-br from-cyan-500 to-blue-600"
    />
  );
}
