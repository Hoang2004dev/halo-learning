import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 border-t dark:border-gray-700 mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center md:text-left">
          <p>
            © {year} <span className="font-semibold text-sky-600 dark:text-sky-300">Halo Learning</span>. Empowering personalized learning.
          </p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:underline hover:text-emerald-600">About</Link>
            <Link to="/terms" className="hover:underline hover:text-emerald-600">Terms</Link>
            <Link to="/contact" className="hover:underline hover:text-emerald-600">Contact</Link>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-400 dark:text-gray-600 text-center">
          Made with <span className="text-emerald-500">💚</span> by the Halo Team — Learn smarter, grow faster.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
