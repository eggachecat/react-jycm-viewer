import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import {
    terser
} from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import alias from "@rollup/plugin-alias";
import path from "path";

const packageJson = require('./package.json');

export default [{
        input: 'src/index.tsx',
        output: [{
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
                name: 'react-jycm-viewer'
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        external: [
            'react',
            'react-dom',
            'monaco-editor',
            'react-monaco-editor',
        ],
        plugins: [
            alias({
                /**
                 * For custom files extension you might want to add "customerResolver"
                 * https://github.com/rollup/plugins/tree/master/packages/alias#custom-resolvers
                 *
                 * By doing that this plugin can read different kind of files.
                 */
                entries: [{
                        find: "@@",
                        replacement: path.resolve(__dirname, "src"),
                    },
                ],
            }),
            external(),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
            }),
            postcss(),
            terser()
        ],
    },
    // {
    //     input: 'src/typings/index.d.ts',
    //     output: [{
    //         file: 'dist/esm/types/typings/index.d.ts',
    //         format: "esm"
    //     }],
    //     external: [/\.css$/, /\.less$/],
    //     plugins: [dts()],
    // },
    // {
    //     input: 'dist/esm/types/index.d.ts',
    //     output: [{
    //         file: 'dist/index.d.ts',
    //         format: "esm"
    //     }],
    //     external: [/\.css$/, /\.less$/],
    //     plugins: [dts()],
    // },
]