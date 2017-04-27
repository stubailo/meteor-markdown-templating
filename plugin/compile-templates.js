Plugin.registerCompiler(
  {
    extensions: ["md"],
    isTemplate: true
  },
  () => new MdCompiler
);

export class MdCompiler extends CachingCompiler {
  constructor() {
    super({
      compilerName: 'md',
      defaultCacheSize: 1024*1024*10,
    });
  }
  getCacheKey(inputFile) {
    return inputFile.getSourceHash();
  }
  compileResultSize(compileResult) {
    return compileResult.length;
  }
  compileOneFile(inputFile) {
    const content = inputFile.getContentsAsString().toString('utf8');

    let results;
    try {
      results = markdown_scanner.scan(content);
    } catch (e) {
      if (! (e instanceof markdown_scanner.ParseError)) {
        throw e;
      }

      inputFile.error({
        message: e.message,
        sourcePath: files.inputPath,
        line: e.line
      });
    }

    return results;
  }
  addCompileResult(inputFile, compileResult) {
    if (! (compileResult && compileResult.js)) return;
    inputFile.addJavaScript({
      path: inputFile.getPathInPackage() + '.js',
      data: compileResult.js,
    });
  }
}
