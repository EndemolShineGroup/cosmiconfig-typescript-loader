import { Loader } from 'cosmiconfig';
import get from 'lodash.get';

import TypeScriptCompileError from './Errors/TypeScriptCompileError';

const loader: Loader = async (filePath: string) => {
  try {
    const tsNode = require("ts-node");
    tsNode.register({
      compilerOptions: { module: "commonjs" },
    });

    const result = require(filePath);

    return get(result, 'default', result);
  } catch (error) {
    // Replace with logger class OR throw a more specific error
    throw TypeScriptCompileError.fromError(error);
  }
};

export default loader;
