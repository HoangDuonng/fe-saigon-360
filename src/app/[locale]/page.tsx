import { useTranslations } from 'next-intl';
import HomeBanner from '@/components/banner/home-banner';
import DestinationIntroduce from '@/components/destination/destination-introduce';
import DestinationBox from '@/components/destination/destination-box';
import AdsBanner from '@/components/banner/ads-banner';
import BackToTop from '@/components/back-to-top';
import Footer from '@/components/footer/footer';

export default function Home() {
  const t = useTranslations('IndexPage');

  return (
    <div>
      <HomeBanner />
      <AdsBanner />
      <div className='px-5 md:px-20 bg-transparent'>
        <DestinationIntroduce />
        <DestinationBox />
      </div>
      <Footer />
    </div>
  );
}
