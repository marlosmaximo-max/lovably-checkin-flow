import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Loader2, Shield } from "lucide-react";

interface ProcessingScreenProps {
  onComplete: () => void;
}

export const ProcessingScreen = ({ onComplete }: ProcessingScreenProps) => {
  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-12">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <Loader2 className="w-8 h-8 text-primary absolute -bottom-2 -right-2 animate-spin" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Processando...</h2>
            <p className="text-muted-foreground">
              Estamos verificando suas informações. Isso levará apenas alguns segundos.
            </p>
          </div>

          <div className="w-full max-w-xs">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-primary-glow animate-pulse" style={{ width: '70%' }} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
