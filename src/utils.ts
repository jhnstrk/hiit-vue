
export class Utils {
  public static // Function to download data to a file
  download(data:BlobPart, filename:string, type: string) {
    const file = new Blob([data], { type });
    if (window.navigator.msSaveOrOpenBlob) { // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    } else { // Others
      const a = document.createElement('a');
      const url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  public static toTest(value: string): string {
    return `${value} World`;
  }
}

export { Utils as default };
