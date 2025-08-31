// components/SessionWrapper.js
"use client";
import { SessionProvider } from "next-auth/react";

const Sessionwarpper = ({ children }) => {
  return (
    <SessionProvider>
    
        {children}
   
    </SessionProvider>
  );
};

export default Sessionwarpper;

