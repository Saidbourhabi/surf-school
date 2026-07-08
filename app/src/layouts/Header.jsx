import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Link, NavLink } from "react-router-dom";
import { LuWaves } from "react-icons/lu";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const overlayRef = useRef(null);
    const linksRef = useRef([]);

    const toggleMenu = () => {
    if (!menuOpen) {
      // * Open overlay
    gsap.to(overlayRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.5,
        ease: "power2.inOut",
    });

    gsap.fromTo(
        linksRef.current,
        { y: 20, opacity: 0 },
        {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        delay: 0.3,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
        }
    );
    } else {
      // * Close overlay
    gsap.to(overlayRef.current, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.5,
        ease: "power2.inOut",
    });
    }

    setMenuOpen((prev) => !prev);
};

const navLinks = [
    { label: "Home", path: "/" },
    { label: "Surf", path: "/surf" },
    { label: "Packs", path: "/packs" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Book Now", path: "/book" },
    ];

return (
    <>
    <header className="fixed top-0 left-0 w-full flex items-center justify-between p-5 bg-[#262223] z-100">
        <Link to="/" className="text-2xl tracking-[2px] text-white">
            SURF SCHOOL
        </Link>
        <button 
            onClick={toggleMenu}
            className="text-white text-3xl cursor-pointer z-101 hover:scale-110 transition-transform duration-200"
            aria-label="Toggle menu"
        >
        <LuWaves />
        </button>
    </header>
    {/* // * Menu Overlay */}
    <div
        ref={overlayRef}
        className="fixed top-0 left-0 w-full h-full bg-[#262223] opacity-0 invisible z-99 flex justify-center items-center text-center">
        <nav className="flex flex-col gap-8 ">
        {navLinks.map(({ label, path }, i) => (
            <NavLink
                key={label}
                to={path}
                ref={(el) => (linksRef.current[i] = el)}
                onClick={toggleMenu} 
                className={({ isActive }) =>
                `text-3xl uppercase opacity-0 translate-y-5 transition-colors duration-200 
                ${
                isActive ? "text-[#05C7F2]" : "text-[#F2F2F2] hover:text-[#05C7F2]"
                }`
            }
            >
            {label}
            </NavLink>
        ))}
        </nav>
    </div>
    </>
);
}