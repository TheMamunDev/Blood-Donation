import Hero from '@/component/ui/Hero';
import ActionBanner from '@/component/homePageComponent/ActionBanner';
import DonorSearchForm from '@/component/homePageComponent/DonersSearch';
import FeaturedReq from '@/component/homePageComponent/FeaturedReq';
import Impacts from '@/component/homePageComponent/Impact';
import Testomonials from '@/component/homePageComponent/Testomonials';

export default function Home() {
  return (
    <div className=" min-h-screen  bg-zinc-50 font-sans dark:bg-black">
      <Hero></Hero>
      <DonorSearchForm></DonorSearchForm>
      <FeaturedReq></FeaturedReq>
      <Impacts></Impacts>
      <Testomonials></Testomonials>
      <ActionBanner></ActionBanner>
    </div>
  );
}
