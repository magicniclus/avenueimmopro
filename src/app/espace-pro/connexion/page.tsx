/* eslint-disable @next/next/no-img-element */

"use client";

import Footer from "@/components/tailwindUi/footer/Footer";
import ConnexionForm from "@/components/tailwindUi/form/Connexion";
import Header from "@/components/tailwindUi/header/Header";
import { isUserLoggedIn } from "@/firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ConnexionPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const loggedIn = await isUserLoggedIn();
      if (loggedIn) {
        router.push("/espace-pro/tableau-de-bord");
      }
    };

    checkUserLoggedIn();
  }, [router]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <ConnexionForm title="Connectez-vous à votre espace partenaire" />
      </main>
      <Footer />
    </>
  );
};

export default ConnexionPage;
