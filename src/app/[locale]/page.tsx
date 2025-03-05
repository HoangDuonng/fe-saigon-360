import { useTranslations } from 'next-intl';
import HomeBanner from '@/components/banner/home-banner';
import DestinationBox from '@/components/destination/destination-box';
import AdsBanner from '@/components/banner/ads-banner';
import Header from '@/components/header/header';
import BackToTop from '@/components/back-to-top';
import Footer from '@/components/footer/footer';

export default function Home() {
  const t = useTranslations('IndexPage');
  return (
    <div>
      <div className="mb-10">
      <Header />
      </div>
      <HomeBanner />
      <div className='mx-10 mb-10'>
        <DestinationBox />
      </div>
      <AdsBanner />
      <BackToTop />
      <Footer />
    </div>
  );
}
