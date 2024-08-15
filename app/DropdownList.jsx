'use client'
import React, { useState, useMemo } from 'react'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
} from '@nextui-org/react'

export default function DropdownList({ data, setResolution }) {
    const resolutionMap = {
        '3840x2160': '4K',
        '2560x1440': '2K',
        '1920x1080': '1080p',
        '1280x720': '720p',
        '854x480': '480p',
        '640x360': '360p',
        '426x240': '240p',
    }

    // data is now array of lines
    const lines = data.split('\n')

    // unique value trackeing
    const foundResolutions = new Set()
    const addedResolutions = new Set()

    // find match and get ID
    lines.forEach((line) => {
        Object.keys(resolutionMap).forEach((pattern) => {
            if (line.includes(`mp4   ${pattern}`)) {
                if (!addedResolutions.has(pattern)) {
                    // check duplications
                    const numberMatch = line.match(/^\d+/) // ID extracted
                    if (numberMatch) {
                        foundResolutions.add({
                            key: numberMatch[0],
                            label: resolutionMap[pattern],
                        }) // Add the number to the Set
                        addedResolutions.add(pattern) // Mark this resolution pattern as added
                    }
                }
            }
        })
    })

    // Convert the Set back to an array
    const uniqueResolutions = Array.from(foundResolutions)

    // Log found resolutions to the console or handle them as needed
    console.log('Found Resolutions:', uniqueResolutions)

    const items = useMemo(
        () =>
            uniqueResolutions.map((item) => ({
                key: item.key,
                label: item.label,
            })),
        [uniqueResolutions]
    )

    const [selectedKeys, setSelectedKeys] = useState(new Set(['text']))

    const selected = useMemo(
        () =>
            items.find((item) => selectedKeys.has(item.key))?.label ||
            'Select Format',
        [selectedKeys, items]
    )

    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
        [selectedKeys]
    )
    setResolution(selectedValue)

    return (
        <Dropdown className="bg-triondary text-fouriondary" backdrop="blur">
            <DropdownTrigger className="bg-fouriondary">
                <Button variant="bordered">
                    {selected ? selected : 'Format'}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Dynamic Actions"
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
            >
                {uniqueResolutions.map((item) => (
                    <DropdownItem key={item.key}>{item.label}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}
