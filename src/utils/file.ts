/*
    download bold function
*/
export function downloadFile(blob: object, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.setAttribute('download', filename);
    document.body.appendChild(a) ;
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
