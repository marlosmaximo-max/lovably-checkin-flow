import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, FileText, Edit2 } from "lucide-react";
import { GuestData, CheckInStep } from "../CheckInFlow";
import { toast } from "sonner";

interface FinalizationScreenProps {
  data: GuestData;
  updateData: (data: Partial<GuestData>) => void;
  onNext: () => void;
  onEdit: (step: CheckInStep) => void;
}

export const FinalizationScreen = ({ data, updateData, onNext, onEdit }: FinalizationScreenProps) => {
  const [acceptedTerms, setAcceptedTerms] = useState(data.acceptedTerms || false);

  const handleFinalize = () => {
    if (acceptedTerms) {
      updateData({ acceptedTerms: true });
      // Here you would typically send the data to your backend
      console.log('Check-in data:', data);
      onNext();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-2">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Quase lá!</h1>
          <p className="text-muted-foreground">
            Revise e confirme suas informações para finalizar o check-in
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">Resumo do Check-in</h3>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2 text-sm pb-3 border-b border-border">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Código da Reserva:</span>
                        <span className="font-medium text-foreground">{data.bookingCode}</span>
                      </div>
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Hóspede:</span>
                        <span className="font-medium text-foreground">{data.firstName} {data.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">E-mail:</span>
                        <span className="font-medium text-foreground">{data.email}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit('personal-info')}
                      className="ml-2"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-sm pb-3 border-b border-border">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Acompanhantes:</span>
                        <span className="font-medium text-foreground">{data.companions?.length || 0}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit('companions')}
                      className="ml-2"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-muted-foreground">Chegada prevista:</span>
                        <span className="font-medium text-foreground">{data.arrivalTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Saída prevista:</span>
                        <span className="font-medium text-foreground">{data.departureTime}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit('stay-details')}
                      className="ml-2"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="acceptTerms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                />
                <label
                  htmlFor="acceptTerms"
                  className="text-sm text-foreground cursor-pointer leading-relaxed flex-1"
                >
                  Li e aceito os{" "}
                  <a href="#" className="text-primary hover:underline font-medium">
                    Termos de Uso
                  </a>{" "}
                  e a{" "}
                  <a href="#" className="text-primary hover:underline font-medium">
                    Política de Privacidade
                  </a>{" "}
                  da Gonzaga Imóveis. *
                </label>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleFinalize}
            disabled={!acceptedTerms}
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Finalizar Check-in
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              <FileText className="w-3 h-3 inline mr-1" />
              Após finalizar, você receberá um e-mail de confirmação com todas as instruções
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
