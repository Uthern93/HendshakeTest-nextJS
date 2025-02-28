import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Landing Page for Hendshake web test</h1>
      <p className="text-lg mb-8 text-center">
        This is a simple landing page created for my Next.js assessment test. My name is Uthern A/L Su Tin, you could pronounce my name as 'uturn'
      </p>
      <Link
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white h-12 px-6 hover:bg-blue-600"
        href="/form"
      >
        Let's get started
      </Link>
    </div>
  );
}
