import { GraphColor } from "@/components/GraphColor";
import { GraphLine } from "@/components/GraphLine";

export default function Home() {
  return (
    <div className="  flex items-center justify-center min-h-screen">
      <div></div>
      <GraphColor />
      <GraphLine />
    </div>
  );
}
