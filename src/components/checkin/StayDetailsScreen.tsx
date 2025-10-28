import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Clock, AlertCircle } from "lucide-react";
import { GuestData } from "../CheckInFlow";

interface StayDetailsScreenProps {
  onNext: () => void;
  onBack: () => void;
  data: GuestData;
  updateData: (data: Partial<GuestData>) => void;
}

export const StayDetailsScreen = ({ onNext, onBack, data, updateData }: StayDetailsScreenProps) => {
  const [arrivalTime, setArrivalTime] = useState(data.arrivalTime || '');
  const [departureTime, setDepartureTime] = useState(data.departureTime || '');
  const [acknowledgedTimes, setAcknowledgedTimes] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (acknowledgedTimes) {
      updateData({ arrivalTime, departureTime });
      onNext();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Detalhes da Estadia</h1>
          <p className="text-muted-foreground">
            Informe seus horários previstos de chegada e saída
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="arrivalTime">Horário Previsto de Chegada</Label>
              <Input
                id="arrivalTime"
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departureTime">Horário Previsto de Saída</Label>
              <Input
                id="departureTime"
                type="time"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                required
              />
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-accent-foreground space-y-2">
                  <p className="font-semibold">Horários Padrão:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• <strong>Check-in:</strong> A partir das 15:00h</li>
                    <li>• <strong>Check-out:</strong> Até às 11:00h</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <Checkbox
                id="acknowledgeTimes"
                checked={acknowledgedTimes}
                onCheckedChange={(checked) => setAcknowledgedTimes(checked as boolean)}
              />
              <label
                htmlFor="acknowledgeTimes"
                className="text-sm text-foreground cursor-pointer leading-relaxed"
              >
                Declaro estar ciente de que a liberação do imóvel ocorre às 15:00h e a saída deve ser realizada até às 11:00h do último dia da reserva. *
              </label>
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
              <Button 
                type="submit" 
                className="flex-1"
                disabled={!acknowledgedTimes}
              >
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
