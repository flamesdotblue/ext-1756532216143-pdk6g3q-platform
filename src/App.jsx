import React from 'react';
import HeroSpline from './components/HeroSpline';
import RetrogradeStatus from './components/RetrogradeStatus';
import ConstellationField from './components/ConstellationField';
import FooterIncantation from './components/FooterIncantation';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-fuchsia-500/40 selection:text-white">
      <HeroSpline />
      <main className="relative z-10">
        <RetrogradeStatus />
        <ConstellationField />
      </main>
      <FooterIncantation />
    </div>
  );
}
