import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  const getYear = () => new Date().getFullYear();

  return (
    <footer className="mt-auto w-full h-[30vh]  flex items-center border-t-[1px] bg-[#fbfbfb] dark:bg-[#212125] dark:border-gray-700 transition-colors ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* 저작 */}
          <div className="text-gray-600 text-sm mb-4 md:mb-0">
            {getYear()} nagging. All rights reserved.
          </div>
          {/* 기타 */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Contact Us
            </a>
          </div>
          {/* 링크 */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
