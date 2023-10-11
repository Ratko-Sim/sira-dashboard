'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
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
            <Button color='red'>Delete issue</Button>
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
