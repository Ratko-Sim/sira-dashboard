import { Box } from '@radix-ui/themes';
import React from 'react';
import { Skeleton } from '@/app/components/index';

export default function IssueFormSkeleton() {
  return (
    <Box className='max-w-xl'>
      <Skeleton height={'2rem'} />
      <Skeleton height={'23rem'} />
    </Box>
  );
}
