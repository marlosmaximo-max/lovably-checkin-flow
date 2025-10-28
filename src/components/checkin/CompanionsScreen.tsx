import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Users, Plus, Trash2 } from "lucide-react";
import { GuestData, CompanionData } from "../CheckInFlow";
import { CompanionForm } from "./CompanionForm";

interface CompanionsScreenProps {
  onNext: () => void;
  onBack: () => void;
  data: GuestData;
  updateData: (data: Partial<GuestData>) => void;
}

export const CompanionsScreen = ({ onNext, onBack, data, updateData }: CompanionsScreenProps) => {
  const [companions, setCompanions] = useState<CompanionData[]>(data.companions || []);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCompanion = (companion: CompanionData) => {
    const newCompanions = [...companions, companion];
    setCompanions(newCompanions);
    updateData({ companions: newCompanions });
    setIsAdding(false);
  };

  const handleRemoveCompanion = (id: string) => {
    const newCompanions = companions.filter(c => c.id !== id);
    setCompanions(newCompanions);
    updateData({ companions: newCompanions });
  };

  if (isAdding) {
    return (
      <CompanionForm
        onSave={handleAddCompanion}
        onCancel={() => setIsAdding(false)}
        mainGuestEmail={data.email || ''}
      />
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Acompanhantes</h1>
          <p className="text-muted-foreground">
            Adicione os dados dos seus acompanhantes (maiores de 10 anos)
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            {companions.length > 0 ? (
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Acompanhantes cadastrados:</h3>
                {companions.map((companion) => (
                  <div
                    key={companion.id}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {companion.firstName} {companion.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{companion.email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveCompanion(companion.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum acompanhante cadastrado ainda</p>
              </div>
            )}

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsAdding(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Acompanhante
            </Button>

            <div className="flex gap-3 pt-4 border-t">
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
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
