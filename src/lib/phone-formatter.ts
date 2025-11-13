export const formatPhoneBrazil = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  if (numbers.length <= 10) {
    // Fixo: (##) ####-####
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }
  // Celular: (##) 9####-####
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

export const formatPhoneInternational = (value: string, maxLength: number = 15): string => {
  const numbers = value.replace(/\D/g, '');
  return numbers.slice(0, maxLength);
};

export const getDialCodeFromPhone = (phone: string): string | null => {
  const numbers = phone.replace(/\D/g, '');
  
  // Common dial codes (ordered by length for proper matching)
  const dialCodes = [
    { code: '+1', length: 1 },
    { code: '+7', length: 1 },
    { code: '+20', length: 2 },
    { code: '+27', length: 2 },
    { code: '+30', length: 2 },
    { code: '+31', length: 2 },
    { code: '+32', length: 2 },
    { code: '+33', length: 2 },
    { code: '+34', length: 2 },
    { code: '+39', length: 2 },
    { code: '+41', length: 2 },
    { code: '+43', length: 2 },
    { code: '+44', length: 2 },
    { code: '+45', length: 2 },
    { code: '+46', length: 2 },
    { code: '+47', length: 2 },
    { code: '+48', length: 2 },
    { code: '+49', length: 2 },
    { code: '+51', length: 2 },
    { code: '+52', length: 2 },
    { code: '+53', length: 2 },
    { code: '+54', length: 2 },
    { code: '+55', length: 2 },
    { code: '+56', length: 2 },
    { code: '+57', length: 2 },
    { code: '+58', length: 2 },
    { code: '+61', length: 2 },
    { code: '+81', length: 2 },
    { code: '+82', length: 2 },
    { code: '+86', length: 2 },
    { code: '+90', length: 2 },
    { code: '+91', length: 2 },
    { code: '+351', length: 3 },
    { code: '+353', length: 3 },
    { code: '+506', length: 3 },
    { code: '+507', length: 3 },
    { code: '+591', length: 3 },
    { code: '+593', length: 3 },
    { code: '+595', length: 3 },
    { code: '+598', length: 3 },
    { code: '+972', length: 3 },
  ];
  
  for (const { code, length } of dialCodes) {
    if (numbers.startsWith(code.replace('+', ''))) {
      return code;
    }
  }
  
  return null;
};
