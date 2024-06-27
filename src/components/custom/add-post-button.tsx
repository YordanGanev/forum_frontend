import React from "react";
import { Button } from "../ui/button";

interface AddPostButtonProps {
  onClick: () => void;
}

const AddPostButton: React.FC<AddPostButtonProps> = ({ onClick }) => {
  return (
    <Button
      className="fixed round-full size-14 bottom-10 right-8 bg-blue-500 text-xl hover:bg-blue-700 text-white font-bold py-6 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      +
    </Button>
  );
};

export default AddPostButton;
