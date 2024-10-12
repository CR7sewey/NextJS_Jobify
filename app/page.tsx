import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.svg";
import main from "../assets/main.svg";

export default function Home() {
  return (
    <main>
      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 ">
        <Image src={logo} alt="my-logo" />
      </header>
      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> app
          </h1>
          <p className="leading-loose max-w-md mt-4 ">
            Welcome to Jobify app. This is the best place for you to find your
            dream job. Software Engineer? Data Scientist? Economist? Accountant?
            Doesn't Matter. Here, we have every single opportunity for you to
            view it, love it and then, apply to it!
          </p>
          <Button className="mt-4" asChild>
            <Link href="/add-job">Get Started</Link>
          </Button>
        </div>

        <Image src={main} alt="main-logo" className="hidden lg:block " />
      </section>
    </main>
  );
}
