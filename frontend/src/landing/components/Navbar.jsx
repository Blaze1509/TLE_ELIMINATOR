import React from 'react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#' },
];

const Navbar = ({ onLinkHover, onLinkLeave }) => {
  return (
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <a
        href="#"
        className="relative text-white no-underline font-bold text-2xl transition-transform duration-300 ease-out transform group hover:scale-110"
        onMouseEnter={onLinkHover}
        onMouseLeave={onLinkLeave}
      >
        Career Synapse
        <span className="absolute bottom-[-4px] left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out transform -translate-x-1/2 group-hover:w-full"></span>
      </a>
      <div className="flex space-x-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onMouseEnter={onLinkHover}
            onMouseLeave={onLinkLeave}
            className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium group transition-transform duration-300 ease-out transform hover:scale-150"
          >
            {link.name}
            <span className="absolute bottom-[-4px] left-1/2 w-0 h-0.5 bg-white transition-all duration-300 ease-in-out transform -translate-x-1/2 group-hover:w-full"></span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;