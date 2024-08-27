import LogoutButton from '@/components/ui/button/logoutButton';
import useAuth from '@/hooks/useAuth';
import readUserMe_ from '@/serverActions/user/getUser';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['currentUser'],
    queryFn: readUserMe_,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-col gap-5 items-center justify-between w-full h-full p-12">
        {/* <InfoUser /> */}
        <LogoutButton />
      </main>
    </HydrationBoundary>
  );
}
