import React from "react";
import { Link, NavLink } from "react-router";
import {
  FaFacebook,
  FaInstagramSquare,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import {
  MdOutlineEmail,
  MdOutlineErrorOutline,
  MdOutlinePhone,
} from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-gray-900">
      <footer className="container mx-auto">
        <div className="footer sm:footer-horizontal text-neutral-content p-10 ">
          <div className="space-y-3">
            <div>
              <Link
                to="/"
                className="btn btn-ghost text-xl flex items-center gap-2"
              >
                <span>WinterPaws</span>
              </Link>
            </div>
            <p className="md:w-80 text-left">
              Keeping your furry friends warm, safe, and healthy during the cold
              winter season. Your trusted companion for all winter pet care
              needs.
            </p>
            <div className="flex text-gray-500 text-xl gap-4">
              <FaFacebook className="cursor-pointer hover:text-blue-400" />
              <FaTwitter className="cursor-pointer hover:text-blue-400" />
              <FaYoutube className="cursor-pointer hover:text-blue-400" />
              <FaInstagramSquare className="cursor-pointer hover:text-blue-400" />
            </div>
          </div>
          <nav>
            <h6 className="footer-title text-lg font-bold text-blue-400">
              Quick Links
            </h6>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/profile">My Profile</NavLink>
            <NavLink to="/register">Register</NavLink>
          </nav>
          <nav>
            <h6 className="footer-title text-lg font-bold text-blue-400">
              Our Services
            </h6>
            <a className="link link-hover">Winter Coat Fitting</a>
            <a className="link link-hover">Winter Grooming</a>
            <a className="link link-hover">Paw Treatment</a>
            <a className="link link-hover">Vet Consultations</a>
          </nav>
          <nav>
            <h6 className="footer-title text-lg font-bold text-blue-400">
              Contact Us
            </h6>
            <div className="flex gap-2">
              <IoLocationOutline className="text-lg text-blue-400" />
              <p>
                123 Pet Care Street <br /> Badda , Dhaka
              </p>
            </div>
            <div className="flex gap-2">
              <MdOutlinePhone className="text-lg text-blue-400" />

              <p>+880 1774571133</p>
            </div>
            <div className="flex gap-2">
              <MdOutlineEmail className="text-lg text-blue-400" />
              <p>hello@warmpaws.com</p>
            </div>
          </nav>
        </div>

        <div className=" bg-blue-900 text-neutral-content p-4 rounded-lg shadow flex items-center gap-4 m-6">
          <div>
            <MdOutlineErrorOutline className="text-yellow-400 text-2xl" />
          </div>
          <div>
            <h3 className="font-bold text-xl">Winter Emergency Care</h3>
            <p className=" text-sm">
              Available 24/7 for winter-related pet emergencies. Call: +880
              1774091130
            </p>
          </div>
        </div>
      </footer>
      <div className="text-gray-400 py-5 ">
        <hr className="border-sm w-full" />
        <div className="container mx-auto pt-3">
          <div className="flex md:flex-row flex-col  md:justify-between text-center">
            <p>© 2025 WarmPaws. All rights reserved.</p>
            <div className="flex gap-3 justify-center ">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
