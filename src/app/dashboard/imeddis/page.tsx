import ModulePlaceholder from '@/components/ui/ModulePlaceholder';
import { Shield } from 'lucide-react';

export default function iMeddisPage() {
  return (
    <ModulePlaceholder
      title="NEXUS iMeddis"
      description="Governança médica e compliance com auditoria determinística"
      icon={Shield}
      color="bg-gradient-to-br from-orange-500 to-red-600"
    />
  );
}
