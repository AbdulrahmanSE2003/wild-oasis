import { useEffect } from "react";

export function useCloseModal({ ref, action }) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        console.log("clicked outside");
        action();
      }
    }

    function handleKeydown(e) {
      if (e.key === "Escape") {
        action();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [action]);
}
