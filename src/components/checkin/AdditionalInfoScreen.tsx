import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight, ClipboardList } from "lucide-react";
import { GuestData } from "../CheckInFlow";

interface AdditionalInfoScreenProps {
  onNext: () => void;
  onBack: () => void;
  data: GuestData;
  updateData: (data: Partial<GuestData>) => void;
}

export const AdditionalInfoScreen = ({ onNext, onBack, data, updateData }: AdditionalInfoScreenProps) => {
  const [tripReason, setTripReason] = useState(data.tripReason || '');
  const [originCity, setOriginCity] = useState(data.originCity || '');
  const [howKnew, setHowKnew] = useState(data.howKnew || '');
  const [knowsCity, setKnowsCity] = useState<boolean | undefined>(data.knowsCity);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ tripReason, originCity, howKnew, knowsCity });
    onNext();
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <ClipboardList className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Informações Adicionais</h1>
          <p className="text-muted-foreground">
            Por favor, responda algumas perguntas sobre sua viagem
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="tripReason">Motivo da Viagem</Label>
              <Select value={tripReason} onValueChange={setTripReason} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lazer">Lazer</SelectItem>
                  <SelectItem value="trabalho">Trabalho</SelectItem>
                  <SelectItem value="eventos">Eventos</SelectItem>
                  <SelectItem value="estudos">Estudos</SelectItem>
                  <SelectItem value="saude">Saúde</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="originCity">Cidade de Origem</Label>
              <Input
                id="originCity"
                value={originCity}
                onChange={(e) => setOriginCity(e.target.value)}
                placeholder="De onde você está vindo?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="howKnew">Como conheceu a Gonzaga Imóveis?</Label>
              <Select value={howKnew} onValueChange={setHowKnew} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="indicacao">Indicação de amigos/família</SelectItem>
                  <SelectItem value="airbnb">Airbnb</SelectItem>
                  <SelectItem value="booking">Booking.com</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Já conhece a cidade?</Label>
              <RadioGroup 
                value={knowsCity === undefined ? undefined : knowsCity.toString()} 
                onValueChange={(value) => setKnowsCity(value === 'true')}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="knows-yes" />
                  <Label htmlFor="knows-yes" className="font-normal cursor-pointer">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="knows-no" />
                  <Label htmlFor="knows-no" className="font-normal cursor-pointer">Não</Label>
                </div>
              </RadioGroup>
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
              <Button type="submit" className="flex-1">
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
