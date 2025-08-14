import Service from "@/components/cards/Service";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex justify-center items-center w-full min-h-[calc(100svh-4rem)]">
        <Image
          src="/images/hero.png"
          alt="hero"
          className="absolute object-cover w-full h-full -z-10"
          width={1000}
          height={100}
        />
        <span className="bg-[#000000] w-full h-full absolute top-0 left-0 opacity-50 -z-10"></span>

        <h1 className="text-white text-6xl">أهلا بك في مرقب</h1>
      </div>

      <div className="flex items-center flex-1 w-full pr-4 sm:pr-6 lg:pr-8 max-w-7xl">
        <div className="flex-1">
          <h2 className="text-6xl text-primary max-w-3xl">ما هو مرقب</h2>
          <p className="text-2xl mt-5">
            مُرَقِّب هو منصة ذكية لإدارة وتحليل الأراضي في مكة المكرمة والمشاعر
            المقدسة، يربط الصكوك العقارية بالخرائط التفاعلية الرقمية ويستفيد من
            تقنيات الذكاء الاصطناعي وصور الأقمار الصناعية للكشف المبكر عن
            الإهمال، التعديات، والمخالفات.
          </p>
        </div>
        <Image
          src="/images/structure.png"
          alt="structure"
          className="size-[720px]"
          width={1000}
          height={100}
        />
      </div>

      <div className="relative grid place-items-center min-h-[580px] w-full py-10">
        <Image
          src="/images/about-image.png"
          alt="about"
          width={1080}
          height={580}
          className="absolute w-full h-[580px] -z-10"
        />
        <span className="bg-[#0C492F] w-full h-full absolute top-0 left-0 opacity-90 -z-20"></span>
        <h2 className="text-5xl  text-white text-center">
          خـــــــدمـــــــاتـــــــنـــــــــــــا
        </h2>
        <div className="flex justify-center items-center gap-12">
          <Service />
          <Service />
          <Service />
        </div>
      </div>

      <div className="relative flex flex-col justify-center gap-11 text-center min-h-[710px] w-full">
        <Image
          src="/images/contact-image.png"
          alt="about"
          width={1080}
          height={580}
          className="absolute w-full h-full -z-10"
        />
        <h2 className="text-primary-dark font-bold text-6xl">
          هل لديـــك اســــتفــسار أو تـــحتــاج دعـــم؟
        </h2>
        <h2 className="text-[hsl(0,0%,45%)]  text-3xl">
          نحن هنا من أجلك! لأي سؤال أو ملاحظة، لا تتردد في التواصل معنا. 
        </h2>

        <Link href="#" className="block w-fit mx-auto mt-11">
          <Button className="bg-accent text-white text-3xl min-w-[500px] py-10 rounded-full cursor-pointer">
            تواصل معنا
          </Button>
        </Link>
      </div>

      <div className="relative  min-h-[492px] w-full bg-linear-[58deg] from-[#194B36] to-[#3BB17F]">
        <div className="relative flex flex-1 max-w-7xl mx-auto">
          <div className="flex-1 min-h-[492px]">
            <Image
              src="/images/phone.png"
              alt="hero"
              className="absolute  top-[-140px] right-0 max-w-[500px] z-10"
              width={1000}
              height={1000}
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <h2 className="text-white text-4xl text-center mb-5">
              حمل التطبيق الآن
            </h2>
            <div className="flex gap-5 w-full">
              <div className="relative flex-1 flex justify-center items-center bg-linear-90 from-[#000] to-primary border border-[hsl(0,0%,50%)] rounded-2xl py-4">
                <Image
                  className="z-20"
                  src="/assets/google-play.svg"
                  alt="app-store"
                  width={90}
                  height={100}
                />
              </div>
              <div className="flex-1 flex justify-center items-center bg-linear-90 from-[#000] to-primary border border-[hsl(0,0%,50%)] rounded-2xl">
                <Image
                  className=""
                  src="/assets/apple.svg"
                  alt="app-store"
                  width={90}
                  height={88}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
