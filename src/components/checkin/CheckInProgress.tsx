import { CheckInStep } from "../CheckInFlow";

interface CheckInProgressProps {
  currentStep: CheckInStep;
}

export const CheckInProgress = ({ currentStep }: CheckInProgressProps) => {
  const steps: { id: CheckInStep; label: string }[] = [
    { id: 'personal-info', label: 'Dados Pessoais' },
    { id: 'address', label: 'Endereço' },
    { id: 'verification-intro', label: 'Verificação' },
    { id: 'document-upload', label: 'Documento' },
    { id: 'processing', label: 'Processando' },
    { id: 'selfie-instructions', label: 'Selfie' },
    { id: 'selfie-capture', label: 'Foto' },
    { id: 'companions', label: 'Acompanhantes' },
    { id: 'stay-details', label: 'Detalhes' },
    { id: 'additional-info', label: 'Informações' },
    { id: 'finalization', label: 'Finalização' },
  ];

  const currentIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container max-w-4xl mx-auto px-4 py-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-foreground">Progresso do Check-in</span>
            <span className="text-muted-foreground">
              {currentIndex + 1} de {steps.length}
            </span>
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
