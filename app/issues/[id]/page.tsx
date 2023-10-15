import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

export default async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  if (typeof params.id !== 'string') notFound();

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid
      columns={{ initial: '1', sm: '5' }}
      gap={'5'}
    >
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex
            direction={'column'}
            gap={'3'}
          >
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: `sira. - ${issue?.title}`,
    description: issue?.description,
  };
}
