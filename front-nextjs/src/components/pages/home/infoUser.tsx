// 'use client';
// import { UserPublic } from '@/client';
// import useAuth, { getUserMe } from '@/hooks/useAuth';
// import { useQuery, useQueryClient, dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
// import { Suspense } from 'react';

// export default function InfoUser({ user }: { user: UserPublic | null }) {
//   // const { user: currentUser } = useAuth();
//   const queryClient = useQueryClient();
//   // const currentUser = queryClient.getQueryData<UserPublic>(['currentUser']);
//   // const queryClient = new QueryClient()
//   const { data: currentUser, isLoading } = useQuery<UserPublic | null, Error>({
//     queryKey: ['currentUser'],
//     queryFn: getUserMe,
//     initialData: user,
//     // queryFn: readUserMe_,
//     // enabled: isLoggedIn,
//     // enabled: isLoggedIn(accessToken),
//   });
//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <div className="flex flex-col items-center justify-center w-full h-full">
//         <Suspense fallback={<div>loading...</div>}>
//           <h1>Hello {currentUser?.email}</h1>
//         </Suspense>
//         {/* {isLoading ? 'loading...' : <h1>Hello {currentUser?.email}</h1>} */}
//         <h1>super ? {currentUser?.is_superuser ? 'yes' : 'no'}</h1>
//       </div>
//     </HydrationBoundary>
//   );
// }

'use client';
import { UserPublic } from '@/client';
import { useQueryClient } from '@tanstack/react-query';

export default function InfoUser() {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<UserPublic>(['currentUser']);
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1>Hello {currentUser?.email}</h1>
      {/* {isLoading ? 'loading...' : <h1>Hello {currentUser?.email}</h1>} */}
      <h1>super ? {currentUser?.is_superuser ? 'yes' : 'no'}</h1>
    </div>
  );
}
