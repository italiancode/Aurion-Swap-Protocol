const Footer = () => {
  return (
    <footer className="bg-[#1a2c38]/95 backdrop-blur-sm border-t border-[#2a4858]">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-[#81d4fa]/70 text-sm">
            © {new Date().getFullYear()} Aurion Swap. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="#"
              className="text-[#81d4fa]/70 hover:text-[#81d4fa] transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-[#81d4fa]/70 hover:text-[#81d4fa] transition-colors"
            >
              Discord
            </a>
            <a
              href="#"
              className="text-[#81d4fa]/70 hover:text-[#81d4fa] transition-colors"
            >
              Telegram
            </a>
            <a
              href="#"
              className="text-[#81d4fa]/70 hover:text-[#81d4fa] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
