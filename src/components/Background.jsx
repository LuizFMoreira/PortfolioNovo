import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none transform-gpu">
      
      {/* A mágica acontece aqui: events-target="global"
        Isso faz o robô ler o eixo X e Y do mouse direto da janela do navegador,
        ignorando as camadas que estão na frente dele.
      */}
      <spline-viewer 
        url="https://prod.spline.design/ZndJi4aqN9OwgcvB/scene.splinecode"
        loading-library="lazy"
        events-target="global" 
        style={{ width: '100%', height: '100%' }}
      ></spline-viewer>

      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Background;