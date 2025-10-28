import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import logoGonzaga from "@/assets/logo-gonzaga-orange.png";

export const ThankYouScreen = () => {
  return (
    <div className="min-h-screen py-8 px-4 flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="container max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-4">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Check-in Realizado com Sucesso!
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Obrigado por completar seu check-in. Em breve você receberá um e-mail com todas as instruções de acesso e informações importantes sobre sua estadia.
          </p>
        </div>

        <Card className="p-8 space-y-6 text-center animate-slide-in">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <img 
                src={logoGonzaga} 
                alt="Gonzaga Stays" 
                className="h-16 md:h-20 object-contain"
              />
            </div>
            
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                📧 Verifique seu e-mail
              </p>
              <p>
                Enviamos um e-mail de confirmação com todas as informações necessárias para sua chegada.
              </p>
              
              <div className="pt-4 border-t border-border mt-6">
                <p className="font-medium text-foreground mb-2">
                  Dúvidas ou precisa de ajuda?
                </p>
                <p>
                  Entre em contato conosco através dos canais de atendimento disponíveis no seu e-mail de confirmação.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-primary font-semibold text-lg">
              Aguardamos você! 🎉
            </p>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Gonzaga Stays - Sua experiência de hospitalidade inteligente
          </p>
        </div>
      </div>
    </div>
  );
};
