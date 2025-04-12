import {
    Instagram,
    Linkedin,
    Github,
    Facebook,
    PawPrint,
    HeartHandshake,
    Smile,
    UsersRound,
  } from "lucide-react";
  
  const About = () => {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="mb-10">
          <PawPrint className="mx-auto w-12 h-12 text-pink-500" />
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">About PetCare+</h1>
          <p className="text-gray-600 text-lg">
            Your trusted companion for everything pets — from creating pet profiles to finding cures and guidance,
            we’re here to help you care better.
          </p>
        </div>
  
        <div className="grid md:grid-cols-2 gap-10 mb-14 text-left">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <HeartHandshake className="text-green-600 w-8 h-8 mb-3" />
            <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
            <p className="text-gray-700">
              To empower pet parents with easy tools, helpful resources, and knowledge that makes pet care simple,
              accessible, and heartfelt.
            </p>
          </div>
  
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <Smile className="text-yellow-500 w-8 h-8 mb-3" />
            <h2 className="text-2xl font-bold mb-2">Why PetCare+?</h2>
            <p className="text-gray-700">
              From health profiles to FAQs and homemade remedies — we blend technology and care to offer a
              wholesome pet experience.
            </p>
          </div>
  
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <UsersRound className="text-blue-600 w-8 h-8 mb-3" />
            <h2 className="text-2xl font-bold mb-2">Our Team</h2>
            <p className="text-gray-700">
              A small, passionate team of developers, vets, and animal lovers led by Aryan Arora — building PetCare+
              with ❤️ and code.
            </p>
          </div>
  
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <PawPrint className="text-pink-500 w-8 h-8 mb-3" />
            <h2 className="text-2xl font-bold mb-2">What We Offer</h2>
            <p className="text-gray-700">
              Profile management, FAQs, breed information, symptoms checker, and more — all tailored for your
              four-legged friends.
            </p>
          </div>
        </div>
  
        <h2 className="text-3xl font-bold mb-4">Connect with Us</h2>
        <div className="flex justify-center gap-6 text-3xl text-gray-700 mb-10">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <Instagram />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <Linkedin />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
          >
            <Github />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <Facebook />
          </a>
        </div>
  
        <p className="text-gray-500 text-sm">
          Made with 🐾 and ☕ by <span className="font-semibold">
            <ul>
                <li>Aryan Arora</li>
                <li>Aryan Pawar</li>
                <li>Ashish Mehta</li>
                <li>Arinjay Bhola</li>
            </ul>
          </span>
        </p>
      </div>
    );
  };
  
  export default About;
  