import React from "react";

// Définir le type de vos données
type Lead = {
  type: string;
  status: string;
  email: string;
  date: string;
  adresse: string;
  annee: string;
  ascenseur: boolean;
  atypical: number;
  balcon: boolean;
  box: boolean;
  chambres: number;
  confidenceIndex: number;
  confidenceMax: number;
  confidenceMin: number;
  contrat: string;
  coordinates: [number, number];
  createdAt: string;
  dpe: string;
  etages: string;
  fai: number;
  faiRate: number;
  firstName: string;
  garage: boolean;
  ges: string;
  id: string;
  jardin: boolean;
  lastName: string;
  nego: number;
  negoRate: number;
  niveaux: string;
  oriantation: string[];
  parking: boolean;
  phone: string;
  pieces: number;
  piscine: boolean;
  predictedPrice: number;
  priceM2: number;
  priceMax: number;
  priceMin: number;
  standing: string;
  surface: number;
  terrasse: boolean;
  travaux: boolean;
  vente: string;
  virtualPrice: number;
  virtualPriceAdjustment: number;
  virtualPriceMax: number;
  virtualPriceMin: number;
  vue: string;
};

interface DrawerEstimationContentProps {
  estimation: Lead | null;
}

const DrawerEstimationContent: React.FC<DrawerEstimationContentProps> = ({
  estimation,
}) => {
  if (!estimation) {
    return <div>Aucune estimation sélectionnée</div>;
  }

  return (
    <div>
      <h2>Estimation</h2>
      <p>
        <strong>Nom:</strong> {estimation.firstName} {estimation.lastName}
      </p>
      <p>
        <strong>Email:</strong> {estimation.email}
      </p>
      <p>
        <strong>Type de bien:</strong> {estimation.type}
      </p>
      <p>
        <strong>Prix prédit:</strong> {Math.round(estimation.predictedPrice)}€
      </p>
      <p>
        <strong>Surface:</strong> {Math.round(estimation.surface)}m²
      </p>
      {/* Ajoutez d'autres champs nécessaires */}
    </div>
  );
};

export default DrawerEstimationContent;
