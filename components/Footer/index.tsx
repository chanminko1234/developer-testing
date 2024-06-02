import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-xl font-bold mb-4">About Us</h4>
                        <p className="text-sm">
                            We are a leading real estate company dedicated to helping you find your dream home. Our mission is to make your home buying and selling experience smooth and hassle-free.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#" className="hover:underline">Search Properties</a></li>
                            <li><a href="#" className="hover:underline">Buy</a></li>
                            <li><a href="#" className="hover:underline">Rent</a></li>
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-4">Contact Us</h4>
                        <p className="text-sm">
                            123 Real Estate St.<br />
                            Dream City, DC 12345<br />
                            Phone: (123) 456-7890<br />
                            Email: info@realestate.com
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-gray-400" aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="hover:text-gray-400" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="#" className="hover:text-gray-400" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="#" className="hover:text-gray-400" aria-label="LinkedIn">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-sm mt-8">
                    &copy; {currentYear} Real Estate. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
