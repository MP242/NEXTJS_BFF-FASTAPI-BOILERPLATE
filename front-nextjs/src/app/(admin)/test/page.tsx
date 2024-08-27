import InfoUser from '@/components/pages/home/infoUser';
import Link from 'next/link';

export default async function Page() {
  return (
    <div>
      <Link href="/">back home</Link>
      <p>bonjour admin !</p>
      <InfoUser />
    </div>
  );
}
