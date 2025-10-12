// app/page.tsx

import HeroSlider from "./src/components/HeroSlider/HeroSlider";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Slider Sekcija */}
      <HeroSlider />
      
      {/* Ostali delovi stranice (isti kao pre) */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Moje Usluge</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Venčanja</h3>
            <p className="text-gray-600">Nevjerovatni trenuci vašeg posebnog dana zauvijek sačuvani.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Portreti</h3>
            <p className="text-gray-600">Individualni ili porodični portreti koji ističu vašu ljepotu.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Priroda</h3>
            <p className="text-gray-600">Zamrznute prizore prirode koje ćete pamtiti zauvijek.</p>
          </div>
        </div>
      </section>
    </div>
  )
}