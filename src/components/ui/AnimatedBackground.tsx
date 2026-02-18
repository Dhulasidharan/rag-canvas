const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-[hsl(220_20%_8%)] to-[hsl(230_25%_5%)] animate-gradient" />
      
      {/* Floating blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[hsl(var(--primary)/0.06)] blur-3xl animate-blob" />
      <div className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full bg-[hsl(200_80%_50%/0.04)] blur-3xl animate-blob-delay" />
      <div className="absolute top-1/2 left-2/3 w-72 h-72 rounded-full bg-[hsl(270_60%_50%/0.03)] blur-3xl animate-blob-delay-2" />
    </div>
  );
};

export default AnimatedBackground;
