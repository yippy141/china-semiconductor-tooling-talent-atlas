import Image from "next/image";
import type { FirmProfile } from "@/data/editorial/firm-profiles";

type FirmLogoProps = {
  profile: Pick<FirmProfile, "logo" | "name">;
  className?: string;
};

export function FirmLogo({ profile, className = "" }: FirmLogoProps) {
  if (!profile.logo) return null;

  return (
    <div
      className={`flex items-center justify-center border border-stone-200 bg-white p-2 ${className}`}
    >
      <Image
        src={profile.logo.src}
        alt={profile.logo.alt}
        width={profile.logo.width}
        height={profile.logo.height}
        className="max-h-full w-auto max-w-full object-contain"
        sizes="160px"
        unoptimized
      />
    </div>
  );
}
