import { FILE_CONFIGS } from "@/core/constants";

export function downloadFile(file: Blob, filename: string) {
  const url = window.URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export function readFileAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

export function formatFileSize(sizeInBytes: number): string {
  const { oneKbEqualsBytes } = FILE_CONFIGS;
  if (sizeInBytes < oneKbEqualsBytes) {
    return `${sizeInBytes} B`;
  } else if (sizeInBytes < oneKbEqualsBytes * oneKbEqualsBytes) {
    return `${(sizeInBytes / oneKbEqualsBytes).toFixed(2)} KB`;
  } else if (
    sizeInBytes <
    oneKbEqualsBytes * oneKbEqualsBytes * oneKbEqualsBytes
  ) {
    return `${(sizeInBytes / (oneKbEqualsBytes * oneKbEqualsBytes)).toFixed(2)} MB`;
  } else if (
    sizeInBytes <
    oneKbEqualsBytes * oneKbEqualsBytes * oneKbEqualsBytes * oneKbEqualsBytes
  ) {
    return `${(sizeInBytes / (oneKbEqualsBytes * oneKbEqualsBytes * oneKbEqualsBytes)).toFixed(2)} GB`;
  } else {
    return `${(sizeInBytes / (oneKbEqualsBytes * oneKbEqualsBytes * oneKbEqualsBytes * oneKbEqualsBytes)).toFixed(2)} TB`;
  }
}
