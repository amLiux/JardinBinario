import React from 'react'
import { Icons } from '../Icons'
import { Tooltip } from '../Tooltip'

type Props = {}

export const EditorNavbarOptions = (props: Props) => {
    return (
        <div className="flex justify-around items-center ml-auto w-80 p-5 h-5">
            <Tooltip tooltipText="Add some tags to your blog for us to categorize and filter it better!">
                <button className="bg-slate-600 relative text-purple-400 hover:outline-purple-500 hover:animate-pulse outline outline-5 outline-transparent p-2 rounded">{Icons.TAG}</button>
            </Tooltip>
            <Tooltip tooltipText="Save your work? This will override any saved in-progress blog entry!">
                <button className="bg-slate-600 text-purple-400 hover:outline-purple-500 hover:animate-pulse outline outline-5 outline-transparent p-2 rounded">{Icons.SAVE}</button>
            </Tooltip>
            <Tooltip tooltipText="Preview what you got so far, Note: it will look exacly like this for users!">
                <button className="bg-slate-600 text-purple-400 hover:outline-purple-500 hover:animate-pulse outline outline-5 outline-transparent p-2 rounded">{Icons.PREVIEW}</button>
            </Tooltip>
            <Tooltip tooltipText="You ready? Let's publish it!">
                <button className="bg-slate-600 text-purple-400 hover:outline-purple-500 hover:animate-pulse outline outline-5 outline-transparent p-2 rounded">{Icons.PUBLISH}</button>
            </Tooltip>
        </div>
    )
}