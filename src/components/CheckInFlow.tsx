import { useState } from "react";
import { WelcomeScreen } from "./checkin/WelcomeScreen";
import { PersonalInfoScreen } from "./checkin/PersonalInfoScreen";
import { AddressScreen } from "./checkin/AddressScreen";
import { VerificationIntroScreen } from "./checkin/VerificationIntroScreen";
import { DocumentUploadScreen } from "./checkin/DocumentUploadScreen";
import { ProcessingScreen } from "./checkin/ProcessingScreen";
import { SelfieInstructionsScreen } from "./checkin/SelfieInstructionsScreen";
import { SelfieCaptureScreen } from "./checkin/SelfieCaptureScreen";
import { CompanionsScreen } from "./checkin/CompanionsScreen";
import { StayDetailsScreen } from "./checkin/StayDetailsScreen";
import { AdditionalInfoScreen } from "./checkin/AdditionalInfoScreen";
import { FinalizationScreen } from "./checkin/FinalizationScreen";
import { ThankYouScreen } from "./checkin/ThankYouScreen";
import { CheckInProgress } from "./checkin/CheckInProgress";

export type CheckInStep = 
  | 'welcome'
  | 'personal-info'
  | 'address'
  | 'verification-intro'
  | 'document-upload'
  | 'processing'
  | 'selfie-instructions'
  | 'selfie-capture'
  | 'companions'
  | 'stay-details'
  | 'additional-info'
  | 'finalization'
  | 'thank-you';

export interface GuestData {
  bookingCode?: string;
  documentType?: 'cpf' | 'passport';
  documentNumber?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  phone?: string;
  email?: string;
  country?: string;
  countryCode?: string;
  zipCode?: string;
  address?: string;
  addressNumber?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  documentFront?: string;
  documentBack?: string;
  selfie?: string;
  companions?: CompanionData[];
  arrivalTime?: string;
  departureTime?: string;
  tripReason?: string;
  originCity?: string;
  howKnew?: string;
  knowsCity?: boolean;
  acceptedTerms?: boolean;
}

export interface CompanionData {
  id: string;
  documentType: 'cpf' | 'passport';
  documentNumber: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phone: string;
  email: string;
  countryCode?: string;
  documentFront?: string;
  documentBack?: string;
  selfie?: string;
}

export const CheckInFlow = () => {
  const [currentStep, setCurrentStep] = useState<CheckInStep>('welcome');
  const [guestData, setGuestData] = useState<GuestData>({});

  const updateGuestData = (data: Partial<GuestData>) => {
    setGuestData(prev => ({ ...prev, ...data }));
  };

  const goToStep = (step: CheckInStep) => {
    setCurrentStep(step);
  };

  const goToNextStep = () => {
    const steps: CheckInStep[] = [
      'welcome',
      'personal-info',
      'address',
      'verification-intro',
      'document-upload',
      'processing',
      'selfie-instructions',
      'selfie-capture',
      'companions',
      'stay-details',
      'additional-info',
      'finalization',
      'thank-you'
    ];
    
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    const steps: CheckInStep[] = [
      'welcome',
      'personal-info',
      'address',
      'verification-intro',
      'document-upload',
      'processing',
      'selfie-instructions',
      'selfie-capture',
      'companions',
      'stay-details',
      'additional-info',
      'finalization',
      'thank-you'
    ];
    
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen onNext={goToNextStep} updateData={updateGuestData} />;
      case 'personal-info':
        return <PersonalInfoScreen onNext={goToNextStep} onBack={goToPreviousStep} data={guestData} updateData={updateGuestData} />;
      case 'address':
        return <AddressScreen onNext={goToNextStep} onBack={goToPreviousStep} data={guestData} updateData={updateGuestData} />;
      case 'verification-intro':
        return <VerificationIntroScreen onNext={goToNextStep} onBack={goToPreviousStep} />;
      case 'document-upload':
        return <DocumentUploadScreen onNext={goToNextStep} onBack={goToPreviousStep} data={guestData} updateData={updateGuestData} />;
      case 'processing':
        return <ProcessingScreen onComplete={goToNextStep} />;
      case 'selfie-instructions':
        return <SelfieInstructionsScreen onNext={goToNextStep} onBack={goToPreviousStep} />;
      case 'selfie-capture':
        return <SelfieCaptureScreen onNext={goToNextStep} onBack={goToPreviousStep} data={guestData} updateData={updateGuestData} />;
      case 'companions':
        return <CompanionsScreen onNext={goToNextStep} onBack={goToPreviousStep} data={guestData} updateData={updateGuestData} />;
      case 'stay-details':
        return <StayDetailsScreen onNext={goToNextStep} onBack={goToPreviousStep} data={guestData} updateData={updateGuestData} />;
      case 'additional-info':
        return <AdditionalInfoScreen onNext={goToNextStep} onBack={goToPreviousStep} data={guestData} updateData={updateGuestData} />;
      case 'finalization':
        return <FinalizationScreen data={guestData} updateData={updateGuestData} onNext={goToNextStep} onEdit={goToStep} />;
      case 'thank-you':
        return <ThankYouScreen />;
      default:
        return <WelcomeScreen onNext={goToNextStep} updateData={updateGuestData} />;
    }
  };

  return (
    <div className="min-h-screen bg-muted">
      {currentStep !== 'welcome' && currentStep !== 'thank-you' && <CheckInProgress currentStep={currentStep} />}
      {renderStep()}
    </div>
  );
};
