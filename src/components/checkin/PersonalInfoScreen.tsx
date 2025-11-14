import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { GuestData } from "../CheckInFlow";
import { formatCPF, validateCPF, calculateAge } from "@/lib/cpf-validator";
import { countries } from "@/lib/countries";
import { toast } from "sonner";

interface PersonalInfoScreenProps {
  onNext: () => void;
  onBack: () => void;
  data: GuestData;
  updateData: (data: Partial<GuestData>) => void;
}

export const PersonalInfoScreen = ({ onNext, onBack, data, updateData }: PersonalInfoScreenProps) => {
  const [formData, setFormData] = useState({
    documentType: data.documentType || 'cpf' as 'cpf' | 'passport',
    documentNumber: data.documentNumber || '',
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    birthDate: data.birthDate || '',
    phone: data.phone || '',
    email: data.email || '',
    country: data.country || 'BR',
    countryCode: data.countryCode || 'BR',
  });
  const [cpfError, setCpfError] = useState('');

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    setFormData({ ...formData, documentNumber: formatted });
    
    if (formatted.replace(/\D/g, '').length === 11) {
      if (!validateCPF(formatted)) {
        setCpfError('CPF inválido');
      } else {
        setCpfError('');
      }
    } else {
      setCpfError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação de CPF
    if (formData.documentType === 'cpf' && !validateCPF(formData.documentNumber)) {
      toast.error('Por favor, insira um CPF válido');
      return;
    }
    
    // Validação de idade mínima de 18 anos
    if (formData.birthDate) {
      const age = calculateAge(formData.birthDate);
      if (age < 18) {
        toast.error('O hóspede principal deve ter 18 anos ou mais');
        return;
      }
    }
    
    updateData(formData);
    onNext();
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Informações Pessoais</h1>
          <p className="text-muted-foreground">
            Por favor, preencha seus dados pessoais
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="documentType">Tipo de Documento</Label>
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
              <Label htmlFor="documentNumber">Número do Documento</Label>
              <Input
                id="documentNumber"
                value={formData.documentNumber}
                onChange={(e) => {
                  if (formData.documentType === 'cpf') {
                    handleCPFChange(e.target.value);
                  } else {
                    setFormData({ ...formData, documentNumber: e.target.value });
                  }
                }}
                placeholder={formData.documentType === 'cpf' ? '000.000.000-00' : 'AB123456'}
                maxLength={formData.documentType === 'cpf' ? 14 : undefined}
                required
                className={cpfError ? 'border-destructive' : ''}
              />
              {cpfError && (
                <p className="text-sm text-destructive">{cpfError}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.countryCode}
                  onValueChange={(value) => {
                    const country = countries.find(c => c.code === value);
                    setFormData({ 
                      ...formData, 
                      countryCode: value,
                      phone: country?.dialCode || ''
                    });
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue>
                      {countries.find(c => c.code === formData.countryCode)?.flag} {countries.find(c => c.code === formData.countryCode)?.dialCode}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.dialCode} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone.replace(countries.find(c => c.code === formData.countryCode)?.dialCode || '', '')}
                  onChange={(e) => {
                    const dialCode = countries.find(c => c.code === formData.countryCode)?.dialCode || '';
                    setFormData({ ...formData, phone: dialCode + e.target.value.replace(/\D/g, '') });
                  }}
                  placeholder="11 98765-4321"
                  className="flex-1"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">País onde reside</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value })}
              >
                <SelectTrigger>
                  <SelectValue>
                    {countries.find(c => c.code === formData.country)?.flag} {countries.find(c => c.code === formData.country)?.name}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
