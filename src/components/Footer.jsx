import { Github, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-amber-500">MovieScout</h2>
            <p className="mt-4 text-gray-400 max-w-md">
              Découvrez les meilleurs films, gérez vos favoris et restez à jour avec les dernières sorties cinématographiques.
            </p>
          </div>

          {/* Navigation Rapide */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Favoris
                </Link>
              </li>
              <li>
                <Link to="/popular" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Films Populaires
                </Link>
              </li>
              <li>
                <Link to="/upcoming" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Prochaines Sorties
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact et Réseaux */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/votre-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2"
                >
                  <Github size={18} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@moviescout.com"
                  className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2"
                >
                  <Mail size={18} />
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/votre-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-500 transition-colors flex items-center gap-2"
                >
                  <Twitter size={18} />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre de copyright */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} MovieScout. Tous droits réservés.
            </p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-amber-500 text-sm transition-colors">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
