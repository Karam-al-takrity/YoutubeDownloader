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
    // Define the resolution patterns to look for
    const resolutionPatterns = [
        '3840x2160',
        '2560x1440',
        '1920x1080',
        '1280x720',
    ]

    // Convert data into an array of lines
    const lines = data.split('\n')

    // Use a Set to keep track of unique resolutions found
    const foundResolutions = new Set()
    const addedResolutions = new Set()

    // Find the lines that match the resolution pattern and extract the number at the beginning of the line
    lines.forEach((line) => {
        resolutionPatterns.forEach((pattern) => {
            if (line.includes(`mp4   ${pattern}`)) {
                if (!addedResolutions.has(pattern)) {
                    // Check if the resolution pattern has already been added
                    const numberMatch = line.match(/^\d+/) // Extracts the number at the beginning of the line
                    if (numberMatch) {
                        foundResolutions.add({
                            key: numberMatch[0],
                            label: `${pattern}`,
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
