import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, FileText } from "lucide-react";
import { GuestData } from "../CheckInFlow";
import { toast } from "sonner";

interface FinalizationScreenProps {
  data: GuestData;
  updateData: (data: Partial<GuestData>) => void;
}

export const FinalizationScreen = ({ data, updateData }: FinalizationScreenProps) => {
  const [acceptedTerms, setAcceptedTerms] = useState(data.acceptedTerms || false);

  const handleFinalize = () => {
    if (acceptedTerms) {
      updateData({ acceptedTerms: true });
      toast.success("Check-in realizado com sucesso!", {
        description: "Você receberá as instruções de acesso por e-mail em breve.",
      });
      // Here you would typically send the data to your backend
      console.log('Check-in data:', data);
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
              <h3 className="font-semibold text-foreground mb-3">Resumo do Check-in</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Código da Reserva:</span>
                  <span className="font-medium text-foreground">{data.bookingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hóspede:</span>
                  <span className="font-medium text-foreground">{data.firstName} {data.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">E-mail:</span>
                  <span className="font-medium text-foreground">{data.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Acompanhantes:</span>
                  <span className="font-medium text-foreground">{data.companions?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chegada prevista:</span>
                  <span className="font-medium text-foreground">{data.arrivalTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saída prevista:</span>
                  <span className="font-medium text-foreground">{data.departureTime}</span>
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
