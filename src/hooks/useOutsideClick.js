import { useEffect, useRef } from "react";

export function useOutsideClick({ handler, listenCapturing = true }) {
  // Using useRef to directly manipulate DOM
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }

      // listenCapturing is passed to handle event in a capturing phase
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
