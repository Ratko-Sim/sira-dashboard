'use client';

import { Skeleton } from '@/app/components/index';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function AssigneeSelect({ issue }: { issue: Issue }) {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get('/api/users');
      return data;
    },
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton height={'1.75rem'} />;

  if (error) return null;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || ''}
      onValueChange={(userId) => {
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId || null,
        });
      }}
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
  );
}
