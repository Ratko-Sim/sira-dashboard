'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  const router = useRouter();

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>Delete issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm deletion.</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>
        <Flex
          mt={'4'}
          gap={'3'}
        >
          <AlertDialog.Action>
            <Button
              onClick={async () => {
                await axios.delete(`/api/issues/${issueId}`);
                router.push('/issues');
                router.refresh();
              }}
              color='red'
            >
              Delete issue
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button
              variant='soft'
              color='gray'
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
