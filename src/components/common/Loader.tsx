import React from "react";
import { LuLoaderCircle } from "react-icons/lu";

interface LoaderProps {
  className: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return <LuLoaderCircle className={` ${className} animate-spin `} />;
};

export default Loader;
