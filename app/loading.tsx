import { FaRotate } from "react-icons/fa6";

export default async function Loading() {
  return (
    <div className="grid h-full place-items-center">
      <FaRotate className="h-24 w-24 animate-spin" />
    </div>
  );
}
