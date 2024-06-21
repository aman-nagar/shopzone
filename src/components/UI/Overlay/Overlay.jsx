// // src/components/Overlay/Overlay.jsx
// import React from "react";
// import "./Overlay.scss";

// const Overlay = ({ isVisible, onClose, children }) => {
//   React.useEffect(() => {
//     if (isVisible) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isVisible]);

//   return (
//     isVisible && (
//       <div className="overlay" onClick={onClose}>
//         <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
//           {children}
//         </div>
//       </div>
//     )
//   );
// };

// export default Overlay;
