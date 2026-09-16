import AboutHero from '../components/About/AboutHero';
import AboutStory from '../components/About/AboutStory';
import AboutCoreValues from '../components/About/AboutCoreValues';

export default function About(){
  return (
    <main className="bg-gray-50 text-gray-900">
      <AboutHero />
      <AboutStory />
      <AboutCoreValues />
    </main>
  );
}