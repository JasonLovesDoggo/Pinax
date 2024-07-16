// // ThemeContext.tsx
//
// import {createContext, createSignal} from "solid-js";
// // import chroma from "chroma-js"; // Or your preferred library
//
// export const ThemeContext = createContext({
//     primaryColor: createSignal("#007bff"), // Default primary color
//     secondaryColor: createSignal("#6c757d"), // Default secondary color
//     updatePrimaryColor: (color: string) => {
//     },
//     updateSecondaryColor: (color: string) => {
//     },
//     getContrastColor: (color: string) => chroma(color).luminance() > 0.5 ? "black" : "white",
// });
//
// export function ThemeProvider(props: { children: any }) {
//     const [primaryColor, setPrimaryColor] = createSignal("#007bff");
//     const [secondaryColor, setSecondaryColor] = createSignal("#6c757d");
//
//     const updatePrimaryColor = (color: string) => {
//         setPrimaryColor(color); // Update the primary color signal
//     };
//
//     const updateSecondaryColor = (color: string) => {
//         setSecondaryColor(color);
//     };
//
//     const getContrastColor = (color: string) => chroma(color).luminance() > 0.5 ? "black" : "white";
//
//     return (
//         <ThemeContext.Provider
//             value={{primaryColor, secondaryColor, updatePrimaryColor, updateSecondaryColor, getContrastColor}}>
//             {props.children}
//         </ThemeContext.Provider>
//     );
// }
