import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Camera, AlertCircle, Check } from "lucide-react";

interface SelfieInstructionsScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export const SelfieInstructionsScreen = ({ onNext, onBack }: SelfieInstructionsScreenProps) => {
  const dos = [
    "Mantenha uma expressão natural",
    "Certifique-se de que seu rosto está totalmente visível",
    "Tire a foto em local bem iluminado",
    "Olhe diretamente para a câmera"
  ];

  const donts = [
    "Não use bonés, chapéus ou gorros",
    "Evite usar óculos escuros",
    "Não tire foto com outras pessoas",
    "Evite excesso de maquiagem ou filtros"
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Hora da Selfie!</h1>
          <p className="text-muted-foreground">
            Vamos tirar uma foto do seu rosto para verificar sua identidade
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Check className="w-5 h-5 text-success" />
                  O que fazer
                </h3>
                <ul className="space-y-2">
                  {dos.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  O que evitar
                </h3>
                <ul className="space-y-2">
                  {donts.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-center text-accent-foreground">
                <Camera className="w-4 h-4 inline mr-2" />
                Na próxima tela, você precisará permitir o acesso à sua câmera
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <Button onClick={onNext} className="flex-1">
                Estou pronto
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
