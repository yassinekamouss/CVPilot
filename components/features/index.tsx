import React from "react";
import FeatureKeywords from "./feature-keywords";
import FeatureRewriting from "./feature-rewriting";
import FeatureTemplates from "./feature-templates";

export default function Features() {
  return (
    <section id="features" className="py-28 md:py-40 space-y-36 sm:space-y-48 bg-white overflow-hidden">
      <FeatureKeywords />
      <FeatureRewriting />
      <FeatureTemplates />
    </section>
  );
}
