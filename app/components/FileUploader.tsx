import { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '~/lib/utils';

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        setSelectedFile(file);
        onFileSelect?.(file);
    }, [onFileSelect])

    const maxFileSize = 20 * 1024 * 1024;

    const { getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections, open } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/msword': ['.doc']
        },
        maxSize: maxFileSize,
        noClick: !!selectedFile,
    })

    // Update local state when acceptedFiles changes
    useEffect(() => {
        if (acceptedFiles[0]) {
            setSelectedFile(acceptedFiles[0]);
        }
    }, [acceptedFiles]);

    const handleRemoveFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Clear the file both locally and in parent
        setSelectedFile(null);
        onFileSelect?.(null);

        // Reset the dropzone state
        setTimeout(() => {
            open(); // Re-enable the dropzone
        }, 0);
    };

    return (
        <div className="text-white w-full border-gradient">
            {selectedFile ? (
                <div className="uploader-selected-file">
                    <img src="/images/pdf.png" alt="pdf" className="size-10" />
                    <div className="flex items-center space-x-3">
                        <div>
                            <p className="text-sm text-white font-medium truncate max-w-xs">
                                {selectedFile.name}
                            </p>
                            <p className="text-sm text-white">
                                {formatSize(selectedFile.size)}
                            </p>
                        </div>
                    </div>
                    <button
                        className="p-2 cursor-pointer"
                        onClick={handleRemoveFile}
                        type="button"
                    >
                        <img src="/icons/cross.svg" alt="remove" className="w-8 h-8" />
                    </button>
                </div>
            ) : (
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="space-y-4 cursor-pointer">
                        <div>
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <img src="/icons/info.svg" alt="upload" className="size-20" />
                            </div>
                            <p className="text-lg text-white">
                                <span className="font-semibold">
                                    Click to upload
                                </span> or drag and drop
                            </p>
                            <p className="text-lg text-white">
                                <span className="font-semibold">PDF, DOC, DOCX</span> (max {formatSize(maxFileSize)})
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FileUploader
