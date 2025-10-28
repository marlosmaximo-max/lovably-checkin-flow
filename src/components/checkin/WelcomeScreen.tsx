import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Building2, ArrowRight } from "lucide-react";
import { GuestData } from "../CheckInFlow";

interface WelcomeScreenProps {
  onNext: () => void;
  updateData: (data: Partial<GuestData>) => void;
}

export const WelcomeScreen = ({ onNext, updateData }: WelcomeScreenProps) => {
  const [bookingCode, setBookingCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingCode.trim()) {
      updateData({ bookingCode });
      onNext();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-muted via-background to-accent/10">
      <Card className="w-full max-w-md p-8 space-y-8 shadow-lg">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Bem-vindo!</h1>
          <p className="text-muted-foreground">
            Estamos felizes em recebê-lo. Para iniciar seu check-in online, informe o código de confirmação da sua reserva.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bookingCode" className="text-sm font-medium">
              Código de Confirmação da Reserva
            </Label>
            <Input
              id="bookingCode"
              type="text"
              placeholder="Ex: ABC123456"
              value={bookingCode}
              onChange={(e) => setBookingCode(e.target.value)}
              className="text-center text-lg tracking-wider uppercase"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold"
            size="lg"
          >
            Iniciar meu check-in
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Ao continuar, você concorda com nossos termos de uso
        </p>
      </Card>
    </div>
  );
};
