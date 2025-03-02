import { Github, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/netflix.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 border-t border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-12 grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo et Description */}
          <div className='col-span-1 md:col-span-2'>
            <img src={logo} alt='MovieScout Logo' className='h-10 w-auto' />
            <p className='mt-4 text-gray-400 max-w-md'>
              Découvrez les meilleurs films, gérez vos favoris et restez à jour
              avec les dernières sorties cinématographiques.
            </p>
          </div>

          {/* Navigation Rapide */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Navigation</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/'
                  className='text-gray-400 hover:text-blue-300 transition-colors'
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to='/favorites'
                  className='text-gray-400 hover:text-blue-300 transition-colors'
                >
                  Favoris
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact et Réseaux */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Contact</h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='https://github.com/kyu-dev'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-blue-300 transition-colors flex items-center gap-2'
                >
                  <Github size={18} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href='mailto:contact@example.com'
                  className='text-gray-400 hover:text-blue-300 transition-colors flex items-center gap-2'
                >
                  <Mail size={18} />
                  Email
                </a>
              </li>
              <li>
                <a
                  href='https://x.com/V0_Arthur'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-blue-300 transition-colors flex items-center gap-2'
                >
                  <Twitter size={18} />
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre de copyright simplifiée */}
        <div className='border-t border-gray-800 py-6'>
          <div className='flex justify-center items-center'>
            <p className='text-gray-400 text-sm'>
              © {currentYear} Netflix. Tous droits pas réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
