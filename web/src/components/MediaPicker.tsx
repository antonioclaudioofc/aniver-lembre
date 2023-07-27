'use client'

import { Camera, Image } from "lucide-react";
import { ChangeEvent, useState } from "react";

export function MediaPicker() {
    const [preview, setPreview] = useState<string | null>(null)

    function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.target

        if (!files) {
            return
        }
        const previewUrl = URL.createObjectURL(files[0])

        setPreview(previewUrl)
    }

    return (
        <label
            className="relative mx-auto mb-6 flex items-center w-16 h-16 rounded-[50%] border border-second p-16 bg-none text-gray_400 cursor-pointer hover:opacity-75"
        >
            <div
                className="text-gray_400"
            >
                {preview ?
                    <img
                        src={preview}
                        alt=""
                        className="absolute right-0 top-0 w-full h-full rounded-[50%] object-cover "
                    /> :
                    <Image
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        size={40}

                    />
                }
            </div>
            <input
                onChange={onFileSelected}
                id="avatarUser"
                name="avatarUser"
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
            />
            <div
                className="absolute bottom-1 -right-2 bg-primary_600 text-text rounded-full p-3"
            >
                <Camera size={24} />
            </div>
        </label>
    )
}