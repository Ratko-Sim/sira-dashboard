import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

export default function IssueSummary({ open, inProgress, closed }: Props) {
  const statuses: { label: string; value: number; status: Status }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];
  return (
    <Flex gap={'4'}>
      {statuses.map((status) => (
        <Card key={status.label}>
          <Link
            className='text-sm flex flex-col gap-1'
            href={`/issues?status=${status.status}`}
          >
            {status.label}
            <Text
              size={'5'}
              className='font-bold'
            >
              {status.value}
            </Text>
          </Link>
        </Card>
      ))}
    </Flex>
  );
}
