import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Upload, FileText, AlertCircle } from "lucide-react";
import { GuestData } from "../CheckInFlow";

interface DocumentUploadScreenProps {
  onNext: () => void;
  onBack: () => void;
  data: GuestData;
  updateData: (data: Partial<GuestData>) => void;
}

export const DocumentUploadScreen = ({ onNext, onBack, data, updateData }: DocumentUploadScreenProps) => {
  const [frontImage, setFrontImage] = useState<string | null>(data.documentFront || null);
  const [backImage, setBackImage] = useState<string | null>(data.documentBack || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (side === 'front') {
          setFrontImage(result);
          updateData({ documentFront: result });
        } else {
          setBackImage(result);
          updateData({ documentBack: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (frontImage && backImage) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Foto do Documento</h1>
          <p className="text-muted-foreground">
            Envie fotos nítidas de ambos os lados do seu documento
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-accent-foreground space-y-1">
                  <p className="font-semibold">Instruções importantes:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Use o documento original (sem capa plástica)</li>
                    <li>Tire a foto em local bem iluminado</li>
                    <li>Use fundo sólido e evite reflexos</li>
                    <li>Todo o documento deve estar visível</li>
                    <li>A imagem deve estar nítida e legível</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">
                  Frente do Documento *
                </label>
                {frontImage ? (
                  <div className="relative">
                    <img
                      src={frontImage}
                      alt="Frente do documento"
                      className="w-full h-48 object-cover rounded-lg border-2 border-border"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setFrontImage(null);
                        updateData({ documentFront: undefined });
                      }}
                    >
                      Alterar
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Clique para enviar</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'front')}
                    />
                  </label>
                )}
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-foreground">
                  Verso do Documento *
                </label>
                {backImage ? (
                  <div className="relative">
                    <img
                      src={backImage}
                      alt="Verso do documento"
                      className="w-full h-48 object-cover rounded-lg border-2 border-border"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setBackImage(null);
                        updateData({ documentBack: undefined });
                      }}
                    >
                      Alterar
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Clique para enviar</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'back')}
                    />
                  </label>
                )}
              </div>
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
                onClick={handleSubmit} 
                className="flex-1"
                disabled={!frontImage || !backImage}
              >
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
