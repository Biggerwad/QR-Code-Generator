import Image from "next/image";
import QrCodeGenerator from "./qrcodecontainer";

export default function Home() {
  return (
    <div className="relative min-h-[100vh] h-full flex justify-center items-center">
      <QrCodeGenerator />
      <Image src='/bgimage.avif'
        width={1600}
        height={1200}
        alt="glass image"
        className="fixed top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
      />
    </div>
  );
}
