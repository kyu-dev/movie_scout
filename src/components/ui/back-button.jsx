import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

const BackButton = ({
  className,
  variant = 'ghost',
  size = 'icon',
  onBack,
  ...props
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
    navigate(-1);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBack}
      className={cn(
        'group flex items-center justify-center',
        'bg-white/10 backdrop-blur-sm', // Effet glass morphism
        'border border-white/20 hover:border-white/30', // Bordure subtile
        'rounded-full shadow-lg hover:shadow-xl', // Ombre dynamique
        'transition-all duration-300 ease-in-out', // Animation fluide
        'hover:bg-white/20 active:scale-95', // Interactions
        className
      )}
      aria-label='Retour à la page précédente'
      {...props}
    >
      <ArrowLeft
        size={20}
        className={cn(
          'text-white/80 group-hover:text-white', // Texte avec effet de survol
          'transition-all duration-300 ease-in-out'
        )}
      />
    </Button>
  );
};

export { BackButton };
