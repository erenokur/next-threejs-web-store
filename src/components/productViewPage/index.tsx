import { Canvas, useFrame } from "@react-three/fiber";
import ProductThreeD from "@/components/productThreeD";

const ProductViewPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <ProductThreeD />
      </Canvas>
    </div>
  );
};

export default ProductViewPage;
