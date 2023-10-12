'use client';

import { Skeleton } from '@/app/components/index';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height={'1.75rem'} />;

  if (error) return null;

  async function assignIssue(userId: string) {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId || null,
      });
    } catch (error) {
      toast.error('Failed to update issue');
    }
  }

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        onValueChange={assignIssue}
      >
        <Select.Trigger placeholder='Assign..' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Users</Select.Label>
            <Select.Item value={''}>Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item
                key={user.id}
                value={user.id}
              >
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster toastOptions={{ duration: 2000 }} />
    </>
  );
}

function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get('/api/users');
      return data;
    },
    staleTime: 60 * 1000,
    retry: 3,
  });
}
