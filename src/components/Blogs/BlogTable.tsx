import React from 'react';
import { BlogEntry } from '@/types/sharedTypes';
import { Profile } from '@/components/Profile';
import { Tags } from '@/components/Tags';
import { Icons } from '@/components/Icons';
import { NextRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { querys } from '@/gql/querys';
import { Table } from '@/components/lib/Table';

interface BlogTableProps {
  blogs: BlogEntry[];
  loading: boolean;
  router: NextRouter;
  refetch: Function;
}

export const BlogTable = ({
  blogs,
  loading,
  router,
  refetch,
}: BlogTableProps) => {
  const [deleteBlogEntry] = useMutation(querys.DELETE_BLOG);
  const [recoverDeletedItem] = useMutation(querys.RECOVER_BLOG);

  const headers: string[] = [
    'Nombre',
    'Autor',
    'Tags',
    'Sneakpeak',
  ];

  const renderRow = (blog: BlogEntry) => [
    {node: <span className="text-sm font-bold">{blog.title}</span>},
    {node: <Profile user={blog.author} createdAt={blog.createdAt} />},
    {node: <Tags tags={blog.tags} preview={false} column />},
    {node: <span className="text-sm">{blog.sneakpeak}...</span>, needsWrap: true},
  ];

  const actions = [
    {
      icon: Icons.EDIT,
      label: 'Edit',
      onClick: (blog: BlogEntry) => router.push({
        pathname: '/admin/new',
        query: { blogId: blog._id },
      }),
      showCondition: (blog: BlogEntry) => !blog.deleted,
    },
    {
      icon: Icons.DELETE,
      label: (blog:any) => blog.deleted ? 'Recover' : 'Delete',
      onClick: async (blog: BlogEntry) => {
        const mutation = blog.deleted ? recoverDeletedItem : deleteBlogEntry;
        await mutation({
          variables: { blogId: blog._id },
        });
        refetch();
      },
    },
  ];

  return (
    <Table
      data={blogs}
      headers={headers}
      loading={loading}
      router={router}
      renderRow={renderRow}
      getItemId={(blog:any) => blog._id}
      isDeleted={(blog:any) => !!blog.deleted}
      actions={actions as any}
    />
  );
};