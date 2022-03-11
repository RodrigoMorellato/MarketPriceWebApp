namespace MarketPriceWebApp.Helpers
{
    public static class FileHelper
    {
        private static string? _filePath;
        private static string? _fileName;
        private static string? _sampleSheetTempFolder;

        /// <summary>
        /// Read CSC from path 
        /// </summary>
        /// <returns></returns>
        public static async Task<IEnumerable<string>> ReadCsv(string? path, string? filename)
        {
            _sampleSheetTempFolder = path;
            _fileName = filename;
            await ValidateFileDirectory();

            _filePath = Path.Combine(_sampleSheetTempFolder!, _fileName!);
            File.WriteAllText(_filePath, Properties.Resources.sampleSheet);
            await ValidateFile();

            return (await File.ReadAllLinesAsync(_filePath ?? throw new InvalidOperationException($"Not possible read file from {_filePath}"))).Skip(1);
        }

        #region PrivateMethods

        private static Task ValidateFileDirectory()
        {
            if (string.IsNullOrWhiteSpace(_sampleSheetTempFolder))
                throw new ArgumentNullException("Path not informed.");

            if (!Directory.Exists(_sampleSheetTempFolder))
                Directory.CreateDirectory(_sampleSheetTempFolder);

            if (string.IsNullOrWhiteSpace(_fileName))
                throw new ArgumentNullException("File name not informed.");

            return Task.CompletedTask;
        }
        private static Task ValidateFile()
        {
            if (!File.Exists(_filePath))
                throw new FileNotFoundException($"File not found. File path: {_filePath}");

            return Task.CompletedTask;
        }

        #endregion
    }
}
