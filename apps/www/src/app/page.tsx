import { AuthShowcase } from "./_components/auth-showcase";

//export const runtime = "edge";

export default function HomePage() {
  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-primary sm:text-[5rem]">
          Wdyk?
        </h1>
        <AuthShowcase />
      </div>
    </main>
  );
}
