import Service from "@/components/cards/Service";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex justify-center items-center w-full min-h-[calc(100svh-4rem)] px-4">
        <Image
          src="/images/hero.png"
          alt="hero"
          className="absolute object-cover w-full h-full -z-10"
          width={1000}
          height={100}
        />
        <span className="bg-[#000000] w-full h-full absolute top-0 left-0 opacity-50 -z-10"></span>

        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          أهلا بك في مرقب
        </h1>
      </div>

      <div className="flex items-center flex-1 w-full pr-4 sm:pr-6 lg:pr-8 max-w-7xl px-4 sm:px-0">
        <div className="flex-1 max-lg:py-20">
          <h2 className="text-center md:text-right text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary max-w-3xl">
            ما هو مرقب
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mt-5">
            مُرَقِّب هو منصة ذكية لإدارة وتحليل الأراضي في مكة المكرمة والمشاعر
            المقدسة، يربط الصكوك العقارية بالخرائط التفاعلية الرقمية ويستفيد من
            تقنيات الذكاء الاصطناعي وصور الأقمار الصناعية للكشف المبكر عن
            الإهمال، التعديات، والمخالفات.
          </p>
        </div>
        <Image
          src="/images/structure.png"
          alt="structure"
          className="hidden lg:block lg:size-[720px]"
          width={1000}
          height={100}
        />
      </div>

      <div className="relative grid place-items-center min-h-[580px] w-full py-10 px-4 sm:px-0">
        <Image
          src="/images/about-image.png"
          alt="about"
          width={1080}
          height={580}
          className="absolute w-full h-[580px] -z-10"
        />
        <span className="bg-[#0C492F] w-full h-full absolute top-0 left-0 opacity-90 -z-20"></span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center mb-5">
          خـــــــدمـــــــاتـــــــنـــــــــــــا
        </h2>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
          <Service
            title="رقمنة الصكوك الرقمية"
            description=" تحويل الصكوك الورقية إلى ملفات رقمية"
          />
          <Service
            title="تتبع حالة ارضك"
            description=" يمكنك مشاهدة صور عن حالة ارضك مع تنبيهات وتوصيات "
          />
        </div>
      </div>

      <div className="relative flex flex-col justify-center gap-5 md:gap-11 text-center py-24 lg:min-h-[710px] w-full px-4 sm:px-0">
        <Image
          src="/images/contact-image.png"
          alt="about"
          width={1080}
          height={580}
          className="absolute w-full h-full -z-10"
        />
        <h2 className="text-primary-dark font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          هل لديـــك اســــتفــسار أو تـــحتــاج دعـــم؟
        </h2>
        <h2 className="text-[hsl(0,0%,45%)] text-lg sm:text-xl md:text-2xl lg:text-3xl">
          نحن هنا من أجلك! لأي سؤال أو ملاحظة، لا تتردد في التواصل معنا.
        </h2>

        <Link
          href="/contact"
          className="block w-full lg:w-fit mx-auto md:mt-11"
        >
          <Button className="bg-accent text-white text-lg sm:text-xl md:text-2xl lg:text-3xl w-full lg:min-w-[500px] py-6 sm:py-8 lg:py-10 rounded-full cursor-pointer">
            تواصل معنا
          </Button>
        </Link>
      </div>

      <div className="relative min-h-[492px] w-full bg-linear-[58deg] from-[#194B36] to-[#3BB17F] px-4 sm:px-0 py-5">
        <div className="relative flex flex-col lg:flex-row flex-1 max-w-7xl mx-auto">
          <div className="flex-1 min-h-[200px] lg:min-h-[492px]">
            <Image
              src="/images/phone.png"
              alt="hero"
              className="absolute right-1/2 max-lg:translate-x-1/2 top-[-140px] lg:right-0 max-w-[300px] md:max-w-[500px] z-10"
              width={1000}
              height={1000}
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center">
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mb-5">
              حمل التطبيق الآن
            </h2>
            <div className="flex flex-col lg:flex-row gap-5 w-full">
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
