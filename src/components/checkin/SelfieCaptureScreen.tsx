import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Camera, RotateCcw } from "lucide-react";
import { GuestData } from "../CheckInFlow";

interface SelfieCaptureScreenProps {
  onNext: () => void;
  onBack: () => void;
  data: GuestData;
  updateData: (data: Partial<GuestData>) => void;
}

export const SelfieCaptureScreen = ({ onNext, onBack, data, updateData }: SelfieCaptureScreenProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(data.selfie || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCapturedImage(result);
        updateData({ selfie: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    updateData({ selfie: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (capturedImage) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Tire sua Selfie</h1>
          <p className="text-muted-foreground">
            Centralize seu rosto na moldura e tire a foto
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            {!capturedImage ? (
              <div className="space-y-4">
                <div className="relative aspect-[3/4] max-w-sm mx-auto bg-muted rounded-2xl overflow-hidden border-4 border-primary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-80 border-4 border-dashed border-primary/40 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                </div>

                <div className="text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="user"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button
                    size="lg"
                    className="w-full max-w-xs"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Capturar Foto
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden border-4 border-success">
                  <img
                    src={capturedImage}
                    alt="Selfie capturada"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleRetake}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Tirar Novamente
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSubmit}
                  >
                    Ficou Ótima!
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

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
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
