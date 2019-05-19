import { useRef, useEffect } from 'react';

function useAutoScroll(Messages) {
  const autoScroll = useRef(true);
  const handleScroll = ({ target }) => {
    const height = target.scrollHeight || 0;
    const offset = target.offsetHeight + target.scrollTop || 0;
    autoScroll.current = (offset + 2 >= height && height >= offset - 2) ? true : false;
  }

  const ref = useRef(null);
  useEffect(() => {
    if (autoScroll.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [Messages]);

  return [ref, handleScroll]
};

export default useAutoScroll;
