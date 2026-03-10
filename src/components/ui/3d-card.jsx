import { createContext, useState, useContext, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

const MouseEnterContext = createContext([false, () => {}]);

export const CardContainer = ({ children, className, containerClassName }) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25; // Ajuste a sensibilidade aqui
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y * -1}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
    if (containerRef.current) containerRef.current.style.transition = "none";
  };

  const handleMouseLeave = () => {
    setIsMouseEntered(false);
    if (!containerRef.current) return;
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    containerRef.current.style.transition = "all 0.5s ease";
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div className={cn("flex items-center justify-center", containerClassName)} style={{ perspective: "1000px" }}>
        <div ref={containerRef} onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
          className={cn("flex items-center justify-center relative transition-all duration-500 ease-out transform-style-3d", className)}>
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({ children, className }) => {
  return (
    <div className={cn("transform-style-3d  [transform:translateZ(0)]", className)}>
      {children}
    </div>
  );
};

export const CardItem = ({ as: Tag = "div", children, className, translateX = 0, translateY = 0, translateZ = 0, rotateX = 0, rotateY = 0, rotateZ = 0, ...rest }) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnterContext();

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag ref={ref} className={cn("w-fit transition-transform duration-700 ease-out", className)} {...rest}>
      {children}
    </Tag>
  );
};

export const useMouseEnterContext = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnterContext must be used within a MouseEnterProvider");
  }
  return context;
};