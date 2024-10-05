"use client"
import useSessionStore from '@/store_zustand/sessionStore';
import { useQuery } from '@tanstack/react-query';

const fetchSession = async (): Promise<any> => {
  const response = await fetch(`/api/verify-session`);

  if (!response.ok) {
    throw new Error('Couldn\'t fetch Session');
  }

  const data = await response.json();
  return data;
};

export const useSession = () => {

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['session'],
    queryFn: () => fetchSession(),
    staleTime: Infinity,
  });

  
  return { isPending, isError, data, error };
};
