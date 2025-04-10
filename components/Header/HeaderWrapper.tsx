// "use client";
// import { useEffect, useState } from "react";
// import Header from "./Header";


// const HeaderWrapper = () => {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => {
//       if (window.scrollY > window.innerHeight * 0.9) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return <Header scrolled={scrolled} />;
// };

// export default HeaderWrapper;
