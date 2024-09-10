import React, { useState } from 'react';
import { BlogEntry } from '@/types/sharedTypes';

import { Profile } from '@/components/Profile';
import { Tags } from '@/components/Tags';
import { Icons } from '@/components/Icons';

import blogStyles from './Blogs.module.css';
import { NextRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { querys } from '@/gql/querys';

interface BlogTableProps {
    blogs: BlogEntry[];
    loading: boolean;
    router: NextRouter;
    refetch: Function;
}

export const BlogTable = ({ blogs, loading, router, refetch }: BlogTableProps) => {
    const [deleteBlogEntry] = useMutation(querys.DELETE_BLOG);
    const [recoverDeletedItem] = useMutation(querys.RECOVER_BLOG);
    const [deleting, setDeleting] = useState<string>('');

    const getDeleteHandler = (deleted?: boolean) => deleted ? recoverDeletedItem : deleteBlogEntry;

    if (loading) return <div className='h-[84vh] w-[91.4vw]' />;
    const headers: string[] = ['Nombre', 'Autor', 'Tags', 'Sneakpeak', 'Acciones'];

    return (
        <div className={blogStyles.tableContainer}>
            <table className={blogStyles.blogTable}>
                <thead className={blogStyles.blogTableHeader}>
                    <tr>
                        {headers.map((header) => (
                            <th key={`header-${header}`} className={blogStyles.tableHeader}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={blogStyles.tableBody}>
                    {
                        blogs.map((blog: BlogEntry) => (
                            <tr key={blog._id} className={`
                                transition-all duration-200
                                ${deleting === blog._id ? 'animate-pulse' : ''}
                                ${blog?.deleted ? 'line-through text-red-800 bg-red-300' : ''}`}
                            >
                                <td className={`${blogStyles.tableRow} text-sm font-bold`}>{blog.title}</td>
                                <td className={blogStyles.tableRow}>
                                    <Profile user={blog.author} createdAt={blog.createdAt} />
                                </td>
                                <td className={blogStyles.tableRow}>
                                    <Tags tags={blog.tags} preview={false} column />
                                </td>
                                <td className={`${blogStyles.tableRowWrap} text-sm`}>{blog.sneakpeak}...</td>
                                <td className={blogStyles.tableRow}>
                                    {!blog?.deleted &&
                                        <button
                                            onClick={() => router.push({
                                                pathname: '/admin/new',
                                                query: {
                                                    blogId: blog._id,
                                                }
                                            })}
                                            className="text-purple-600 hover:text-purple-900 mr-2">
                                            {Icons.EDIT}
                                        </button>
                                    }
                                    <button
                                        onClick={async () => {
                                            setDeleting(blog._id);
                                            setTimeout(async () => {
                                                await getDeleteHandler(blog?.deleted)({
                                                    variables: {
                                                        blogId: blog._id,
                                                    }
                                                });
                                                refetch();
                                                setDeleting('');
                                            }, 1500);
                                        }
                                        }
                                        className={`${blog?.deleted ? 'text-green-500 ml-[1.3rem]' : 'text-red-600'} hover:text-red-900}`}>
                                        {Icons.DELETE}
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};
