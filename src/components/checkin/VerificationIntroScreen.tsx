import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Shield, FileText, Camera } from "lucide-react";

interface VerificationIntroScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export const VerificationIntroScreen = ({ onNext, onBack }: VerificationIntroScreenProps) => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Verificação de Segurança</h1>
          <p className="text-muted-foreground">
            Para sua segurança e a de todos, precisamos verificar sua identidade
          </p>
        </div>

        <Card className="p-8">
          <div className="space-y-8">
            <p className="text-center text-foreground">
              Os próximos passos consistem em:
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start p-4 rounded-lg bg-muted/50">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-foreground">1. Foto do Documento</h3>
                  <p className="text-sm text-muted-foreground">
                    Você precisará enviar fotos da frente e do verso do seu documento de identificação
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-4 rounded-lg bg-muted/50">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-foreground">2. Selfie para Verificação</h3>
                  <p className="text-sm text-muted-foreground">
                    Tire uma foto do seu rosto para confirmar sua identidade
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-center text-accent-foreground">
                <Shield className="w-4 h-4 inline mr-2" />
                Seus dados estão protegidos e serão utilizados apenas para fins de identificação
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
                Entendi, vamos lá
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
