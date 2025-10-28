import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Camera, RotateCcw, Check, AlertCircle } from "lucide-react";
import { CompanionData } from "../CheckInFlow";
import { toast } from "sonner";

interface CompanionFormProps {
  onSave: (companion: CompanionData) => void;
  onCancel: () => void;
  mainGuestEmail: string;
}

type FormStep = 'info' | 'document-instructions' | 'document-upload' | 'selfie-instructions' | 'selfie-capture';

export const CompanionForm = ({ onSave, onCancel, mainGuestEmail }: CompanionFormProps) => {
  const [step, setStep] = useState<FormStep>('info');
  const [formData, setFormData] = useState({
    documentType: 'cpf' as 'cpf' | 'passport',
    documentNumber: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    email: '',
  });
  const [documentFront, setDocumentFront] = useState<string>('');
  const [documentBack, setDocumentBack] = useState<string>('');
  const [selfie, setSelfie] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back' | 'selfie') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'front') setDocumentFront(result);
        else if (type === 'back') setDocumentBack(result);
        else setSelfie(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.email === mainGuestEmail) {
      toast.error("O e-mail do acompanhante não pode ser igual ao do hóspede principal");
      return;
    }
    
    setStep('document-instructions');
  };

  const handleSave = () => {
    const companion: CompanionData = {
      id: Date.now().toString(),
      ...formData,
      documentFront,
      documentBack,
      selfie,
    };
    onSave(companion);
  };

  if (step === 'info') {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Dados do Acompanhante</h1>
            <p className="text-muted-foreground">Preencha as informações do acompanhante</p>
          </div>

          <Card className="p-6">
            <form onSubmit={handleInfoSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Tipo de Documento</Label>
                <Select
                  value={formData.documentType}
                  onValueChange={(value: 'cpf' | 'passport') => 
                    setFormData({ ...formData, documentType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cpf">CPF</SelectItem>
                    <SelectItem value="passport">Passaporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Número do Documento</Label>
                <Input
                  value={formData.documentNumber}
                  onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sobrenome</Label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Data de Nascimento</Label>
                <Input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>E-mail</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Próximo: Verificação
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'document-instructions') {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Verificação de Documento</h1>
            <p className="text-muted-foreground">Precisamos verificar o documento do acompanhante</p>
          </div>

          <Card className="p-6 space-y-6">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
                <div className="text-sm text-accent-foreground space-y-1">
                  <p className="font-semibold">Instruções:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Fotografe ambos os lados do documento</li>
                    <li>Use boa iluminação e fundo sólido</li>
                    <li>A imagem deve estar nítida</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button onClick={() => setStep('document-upload')} className="w-full">
              Entendi, vamos lá
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'document-upload') {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Foto do Documento</h1>
          </div>

          <Card className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Frente do Documento *</Label>
                {documentFront ? (
                  <div className="relative">
                    <img src={documentFront} alt="Frente" className="w-full h-48 object-cover rounded-lg" />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setDocumentFront('')}
                    >
                      Alterar
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                    <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Clique para enviar</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'front')} />
                  </label>
                )}
              </div>

              <div className="space-y-3">
                <Label>Verso do Documento *</Label>
                {documentBack ? (
                  <div className="relative">
                    <img src={documentBack} alt="Verso" className="w-full h-48 object-cover rounded-lg" />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setDocumentBack('')}
                    >
                      Alterar
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                    <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Clique para enviar</span>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'back')} />
                  </label>
                )}
              </div>
            </div>

            <Button 
              onClick={() => setStep('selfie-instructions')}
              disabled={!documentFront || !documentBack}
              className="w-full"
            >
              Próximo: Selfie
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'selfie-instructions') {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Selfie do Acompanhante</h1>
            <p className="text-muted-foreground">Tire uma foto do rosto do acompanhante</p>
          </div>

          <Card className="p-6 space-y-6">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-accent-foreground text-center">
                <Check className="w-4 h-4 inline mr-2" />
                Expressão natural, rosto visível, boa iluminação
              </p>
            </div>

            <Button onClick={() => setStep('selfie-capture')} className="w-full">
              Tirar Selfie
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // selfie-capture
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Capturar Selfie</h1>
        </div>

        <Card className="p-6 space-y-6">
          {!selfie ? (
            <div className="space-y-4">
              <div className="relative aspect-[3/4] max-w-sm mx-auto bg-muted rounded-2xl border-4 border-primary/20 flex items-center justify-center">
                <Camera className="w-16 h-16 text-muted-foreground/30" />
              </div>
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  capture="user"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'selfie')}
                />
                <Button className="w-full" onClick={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  input?.click();
                }}>
                  <Camera className="mr-2 h-5 w-5" />
                  Capturar Foto
                </Button>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden border-4 border-success">
                <img src={selfie} alt="Selfie" className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setSelfie('')}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Tirar Novamente
                </Button>
                <Button className="flex-1" onClick={handleSave}>
                  Salvar Acompanhante
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
